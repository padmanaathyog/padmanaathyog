"use server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Check if environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase admin environment variables. Please check your environment configuration.")
}

// Create Supabase admin client with service role key
export const supabaseAdmin = createClient<Database>(supabaseUrl || "", supabaseServiceKey || "", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    // Add custom fetch with timeout and retry logic
    fetch: async (...args) => {
      const [url, options] = args

      // Create a function to perform the fetch with exponential backoff
      const fetchWithRetry = async (retries = 3, delay = 1000) => {
        try {
          const response = await fetch(url, {
            ...options,
            signal: options?.signal || AbortSignal.timeout(30000), // 30 second timeout
          })

          // If we get a 429 (Too Many Requests), retry with backoff
          if (response.status === 429 && retries > 0) {
            console.warn(`Rate limited by Supabase, retrying in ${delay}ms...`)

            // Wait for the delay period
            await new Promise((resolve) => setTimeout(resolve, delay))

            // Retry with exponential backoff
            return fetchWithRetry(retries - 1, delay * 2)
          }

          return response
        } catch (error) {
          if (retries > 0 && error instanceof Error && error.name !== "AbortError") {
            console.warn(`Fetch error, retrying in ${delay}ms...`, error)

            // Wait for the delay period
            await new Promise((resolve) => setTimeout(resolve, delay))

            // Retry with exponential backoff
            return fetchWithRetry(retries - 1, delay * 2)
          }

          throw error
        }
      }

      return fetchWithRetry()
    },
  },
})

// Helper function to check if Supabase admin connection is properly configured
export async function checkSupabaseAdminConnection(): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.from("testimonials").select("id", { count: "exact", head: true })

    if (error) {
      console.error("Supabase admin connection error:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Failed to connect to Supabase with admin privileges:", error)
    return false
  }
}
