import { supabase } from "../supabase"
import type { Database } from "../database.types"

export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]
export type TestimonialInsert = Database["public"]["Tables"]["testimonials"]["Insert"]
export type TestimonialUpdate = Database["public"]["Tables"]["testimonials"]["Update"]

export const TestimonialService = {
  async getAll(page = 1, pageSize = 9): Promise<{ data: Testimonial[]; count: number }> {
    try {
      // Calculate pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Get count for pagination
      const { count, error: countError } = await supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error counting testimonials:", countError)
        throw new Error(`Failed to count testimonials: ${countError.message}`)
      }

      // Get paginated data
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to)

      if (error) {
        console.error("Error fetching testimonials:", error)
        throw new Error(`Failed to fetch testimonials: ${error.message}`)
      }

      return {
        data: data || [],
        count: count || 0,
      }
    } catch (error) {
      console.error("Error in getAll testimonials:", error)
      throw error
    }
  },

  async getFeatured(limit = 3): Promise<Testimonial[]> {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("rating", { ascending: false })
        .limit(limit)

      if (error) {
        console.error("Error fetching featured testimonials:", error)
        throw new Error(`Failed to fetch featured testimonials: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error("Error in getFeatured testimonials:", error)
      throw error
    }
  },

  async getById(id: number): Promise<Testimonial | null> {
    try {
      const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single()

      if (error) {
        if (error.code === "PGRST116") {
          // PGRST116 is the error code for "no rows returned"
          return null
        }
        console.error(`Error fetching testimonial with id ${id}:`, error)
        throw new Error(`Failed to fetch testimonial: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in getById for testimonial ${id}:`, error)
      throw error
    }
  },

  async create(testimonial: TestimonialInsert): Promise<Testimonial | null> {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([
          {
            ...testimonial,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error creating testimonial:", error)
        throw new Error(`Failed to create testimonial: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error("Error in create testimonial:", error)
      throw error
    }
  },

  async update(id: number, testimonial: TestimonialUpdate): Promise<Testimonial | null> {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .update({
          ...testimonial,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error(`Error updating testimonial with id ${id}:`, error)
        throw new Error(`Failed to update testimonial: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in update for testimonial ${id}:`, error)
      throw error
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)

      if (error) {
        console.error(`Error deleting testimonial with id ${id}:`, error)
        throw new Error(`Failed to delete testimonial: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error in delete for testimonial ${id}:`, error)
      throw error
    }
  },
}
