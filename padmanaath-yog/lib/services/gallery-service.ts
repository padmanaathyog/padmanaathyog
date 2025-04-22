import { supabase } from "../supabase"
import type { Database } from "../database.types"

export type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"]
export type GalleryImageInsert = Database["public"]["Tables"]["gallery_images"]["Insert"]
export type GalleryImageUpdate = Database["public"]["Tables"]["gallery_images"]["Update"]

export type GalleryVideo = Database["public"]["Tables"]["gallery_videos"]["Row"]
export type GalleryVideoInsert = Database["public"]["Tables"]["gallery_videos"]["Insert"]
export type GalleryVideoUpdate = Database["public"]["Tables"]["gallery_videos"]["Update"]

export const GalleryService = {
  // Image operations
  async getAllImages(page = 1, pageSize = 12, category?: string): Promise<{ data: GalleryImage[]; count: number }> {
    try {
      // Build query
      let query = supabase.from("gallery_images").select("*", { count: "exact" })

      // Apply category filter if provided
      if (category && category !== "all") {
        query = query.eq("category", category)
      }

      // Get count first
      const { count, error: countError } = await query.select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error counting gallery images:", countError)
        throw new Error(`Failed to count gallery images: ${countError.message}`)
      }

      // Calculate pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Get paginated data
      const { data, error } = await query.order("created_at", { ascending: false }).range(from, to)

      if (error) {
        console.error("Error fetching gallery images:", error)
        throw new Error(`Failed to fetch gallery images: ${error.message}`)
      }

      return {
        data: data || [],
        count: count || 0,
      }
    } catch (error) {
      console.error("Error in getAllImages:", error)
      throw error
    }
  },

  async getImageById(id: number): Promise<GalleryImage | null> {
    try {
      const { data, error } = await supabase.from("gallery_images").select("*").eq("id", id).single()

      if (error) {
        if (error.code === "PGRST116") {
          // PGRST116 is the error code for "no rows returned"
          return null
        }
        console.error(`Error fetching gallery image with id ${id}:`, error)
        throw new Error(`Failed to fetch gallery image: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in getImageById for image ${id}:`, error)
      throw error
    }
  },

  async createImage(image: GalleryImageInsert): Promise<GalleryImage | null> {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .insert([
          {
            ...image,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error creating gallery image:", error)
        throw new Error(`Failed to create gallery image: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error("Error in createImage:", error)
      throw error
    }
  },

  async updateImage(id: number, image: GalleryImageUpdate): Promise<GalleryImage | null> {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .update({
          ...image,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error(`Error updating gallery image with id ${id}:`, error)
        throw new Error(`Failed to update gallery image: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in updateImage for image ${id}:`, error)
      throw error
    }
  },

  async deleteImage(id: number): Promise<boolean> {
    try {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id)

      if (error) {
        console.error(`Error deleting gallery image with id ${id}:`, error)
        throw new Error(`Failed to delete gallery image: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error in deleteImage for image ${id}:`, error)
      throw error
    }
  },

  // Video operations
  async getAllVideos(page = 1, pageSize = 9, category?: string): Promise<{ data: GalleryVideo[]; count: number }> {
    try {
      // Build query
      let query = supabase.from("gallery_videos").select("*", { count: "exact" })

      // Apply category filter if provided
      if (category && category !== "all") {
        query = query.eq("category", category)
      }

      // Get count first
      const { count, error: countError } = await query.select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error counting gallery videos:", countError)
        throw new Error(`Failed to count gallery videos: ${countError.message}`)
      }

      // Calculate pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Get paginated data
      const { data, error } = await query.order("created_at", { ascending: false }).range(from, to)

      if (error) {
        console.error("Error fetching gallery videos:", error)
        throw new Error(`Failed to fetch gallery videos: ${error.message}`)
      }

      return {
        data: data || [],
        count: count || 0,
      }
    } catch (error) {
      console.error("Error in getAllVideos:", error)
      throw error
    }
  },

  async getVideoById(id: number): Promise<GalleryVideo | null> {
    try {
      const { data, error } = await supabase.from("gallery_videos").select("*").eq("id", id).single()

      if (error) {
        if (error.code === "PGRST116") {
          // PGRST116 is the error code for "no rows returned"
          return null
        }
        console.error(`Error fetching gallery video with id ${id}:`, error)
        throw new Error(`Failed to fetch gallery video: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in getVideoById for video ${id}:`, error)
      throw error
    }
  },

  async createVideo(video: GalleryVideoInsert): Promise<GalleryVideo | null> {
    try {
      const { data, error } = await supabase
        .from("gallery_videos")
        .insert([
          {
            ...video,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error creating gallery video:", error)
        throw new Error(`Failed to create gallery video: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error("Error in createVideo:", error)
      throw error
    }
  },

  async updateVideo(id: number, video: GalleryVideoUpdate): Promise<GalleryVideo | null> {
    try {
      const { data, error } = await supabase
        .from("gallery_videos")
        .update({
          ...video,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error(`Error updating gallery video with id ${id}:`, error)
        throw new Error(`Failed to update gallery video: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in updateVideo for video ${id}:`, error)
      throw error
    }
  },

  async deleteVideo(id: number): Promise<boolean> {
    try {
      const { error } = await supabase.from("gallery_videos").delete().eq("id", id)

      if (error) {
        console.error(`Error deleting gallery video with id ${id}:`, error)
        throw new Error(`Failed to delete gallery video: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error in deleteVideo for video ${id}:`, error)
      throw error
    }
  },

  // Get categories for filtering
  async getImageCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase.from("gallery_images").select("category").order("category")

      if (error) {
        console.error("Error fetching image categories:", error)
        throw new Error(`Failed to fetch image categories: ${error.message}`)
      }

      // Extract unique categories
      const categories = [...new Set(data.map((item) => item.category))]
      return categories
    } catch (error) {
      console.error("Error in getImageCategories:", error)
      throw error
    }
  },

  async getVideoCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase.from("gallery_videos").select("category").order("category")

      if (error) {
        console.error("Error fetching video categories:", error)
        throw new Error(`Failed to fetch video categories: ${error.message}`)
      }

      // Extract unique categories
      const categories = [...new Set(data.map((item) => item.category))]
      return categories
    } catch (error) {
      console.error("Error in getVideoCategories:", error)
      throw error
    }
  },
}
