import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Check if environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Please check your .env.local file.")
}

// Create Supabase client with error handling and retry logic
export const supabase = createClient<Database>(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
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

// Helper function to check if Supabase is properly configured
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from("testimonials").select("id", { count: "exact", head: true })

    if (error) {
      console.error("Supabase connection error:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Failed to connect to Supabase:", error)
    return false
  }
}
