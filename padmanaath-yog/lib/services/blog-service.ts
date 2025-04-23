import { supabase } from "../supabase"
import type { Database } from "../database.types"

export type BlogExternalRef = Database["public"]["Tables"]["blog_external_refs"]["Row"]
export type BlogExternalRefInsert = Database["public"]["Tables"]["blog_external_refs"]["Insert"]
export type BlogExternalRefUpdate = Database["public"]["Tables"]["blog_external_refs"]["Update"]

// This is a placeholder for the future external blog provider
// For now, it will use Supabase to store references to external blog posts
export const BlogService = {
  async getAll(page = 1, pageSize = 9): Promise<{ data: BlogExternalRef[]; count: number }> {
    try {
      // Calculate pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Get count for pagination
      const { count, error: countError } = await supabase
        .from("blog_external_refs")
        .select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error counting blog posts:", countError)
        throw new Error(`Failed to count blog posts: ${countError.message}`)
      }

      // Get paginated data
      const { data, error } = await supabase
        .from("blog_external_refs")
        .select("*")
        .order("date", { ascending: false })
        .range(from, to)

      if (error) {
        console.error("Error fetching blog posts:", error)
        throw new Error(`Failed to fetch blog posts: ${error.message}`)
      }

      return {
        data: data || [],
        count: count || 0,
      }
    } catch (error) {
      console.error("Error in getAll blog posts:", error)
      throw error
    }
  },

  async getBySlug(slug: string): Promise<BlogExternalRef | null> {
    try {
      const { data, error } = await supabase.from("blog_external_refs").select("*").eq("slug", slug).single()

      if (error) {
        if (error.code === "PGRST116") {
          // PGRST116 is the error code for "no rows returned"
          return null
        }
        console.error(`Error fetching blog post with slug ${slug}:`, error)
        throw new Error(`Failed to fetch blog post: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in getBySlug for ${slug}:`, error)
      throw error
    }
  },

  async create(blog: BlogExternalRefInsert): Promise<BlogExternalRef | null> {
    try {
      const { data, error } = await supabase
        .from("blog_external_refs")
        .insert([
          {
            ...blog,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error creating blog post:", error)
        throw new Error(`Failed to create blog post: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error("Error in create blog post:", error)
      throw error
    }
  },

  async update(id: number, blog: BlogExternalRefUpdate): Promise<BlogExternalRef | null> {
    try {
      const { data, error } = await supabase
        .from("blog_external_refs")
        .update({
          ...blog,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error(`Error updating blog post with id ${id}:`, error)
        throw new Error(`Failed to update blog post: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in update for blog post ${id}:`, error)
      throw error
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      const { error } = await supabase.from("blog_external_refs").delete().eq("id", id)

      if (error) {
        console.error(`Error deleting blog post with id ${id}:`, error)
        throw new Error(`Failed to delete blog post: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error in delete for blog post ${id}:`, error)
      throw error
    }
  },
}
