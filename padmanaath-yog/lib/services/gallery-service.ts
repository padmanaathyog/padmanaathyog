import { supabase } from "../supabase"
import type { Database } from "../database.types"
import { StorageService } from "./storage-service"

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
            category: image.category || "all", // Default to "all" if no category is specified
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
      // First, get the current image to check if we need to delete an old image
      const { data: currentImage, error: fetchError } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) {
        console.error(`Error fetching gallery image with id ${id}:`, fetchError)
        throw new Error(`Failed to fetch gallery image: ${fetchError.message}`)
      }

      // Update the image record
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

      // If the image URL has changed and the old one was in Supabase storage, delete it
      if (currentImage && currentImage.url && image.url && currentImage.url !== image.url) {
        try {
          await StorageService.deleteImage(currentImage.url)
        } catch (imageError) {
          console.error(`Error deleting old gallery image:`, imageError)
          // Continue even if image deletion fails
        }
      }

      return data
    } catch (error) {
      console.error(`Error in updateImage for image ${id}:`, error)
      throw error
    }
  },

  async deleteImage(id: number): Promise<boolean> {
    try {
      // First, get the image to check if it has a URL in Supabase storage
      const { data: image, error: fetchError }  = await supabase.from("gallery_images").select("*").eq("id", id).single()

      if (fetchError) {
        console.error(`Error fetching gallery image with id ${id}:`, fetchError)
        throw new Error(`Failed to fetch gallery image: ${fetchError.message}`)
      }

      // Delete the image record
      const { error } = await supabase.from("gallery_images").delete().eq("id", id)

      if (error) {
        console.error(`Error deleting gallery image with id ${id}:`, error)
        throw new Error(`Failed to delete gallery image: ${error.message}`)
      }

      // If the image had a URL in Supabase storage, delete it
      if (image && image.url) {
        try {
          console.log(`Attempting to delete image file for gallery image ${id}: ${image.url}`)
          const deleted = await StorageService.deleteImage(image.url)
          if (!deleted) {
            console.warn(`Could not delete image file for gallery image ${id}`)
          }
        } catch (imageError) {
          console.error(`Error deleting gallery image file:`, imageError)
          // Continue even if image deletion fails
        }
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
            category: video.category || "all", // Default to "all" if no category is specified
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
      // First, get the current video to check if we need to delete an old thumbnail
      const { data: currentVideo, error: fetchError } = await supabase
        .from("gallery_videos")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) {
        console.error(`Error fetching gallery video with id ${id}:`, fetchError)
        throw new Error(`Failed to fetch gallery video: ${fetchError.message}`)
      }

      // Update the video record
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

      // If the thumbnail URL has changed and the old one was in Supabase storage, delete it
      if (currentVideo && currentVideo.thumbnail && video.thumbnail && currentVideo.thumbnail !== video.thumbnail) {
        try {
          await StorageService.deleteImage(currentVideo.thumbnail)
        } catch (imageError) {
          console.error(`Error deleting old gallery video thumbnail:`, imageError)
          // Continue even if thumbnail deletion fails
        }
      }

      return data
    } catch (error) {
      console.error(`Error in updateVideo for video ${id}:`, error)
      throw error
    }
  },

  async deleteVideo(id: number): Promise<boolean> {
    try {
      // First, get the video to check if it has a thumbnail in Supabase storage
      const { data: video, error: fetchError } = await supabase.from("gallery_videos").select("*").eq("id", id).single()

      if (fetchError) {
        console.error(`Error fetching gallery video with id ${id}:`, fetchError)
        throw new Error(`Failed to fetch gallery video: ${fetchError.message}`)
      }

      // Delete the video record
      const { error } = await supabase.from("gallery_videos").delete().eq("id", id)

      if (error) {
        console.error(`Error deleting gallery video with id ${id}:`, error)
        throw new Error(`Failed to delete gallery video: ${error.message}`)
      }

      // If the video had a thumbnail in Supabase storage, delete it
      if (video && video.thumbnail) {
        try {
          console.log(`Attempting to delete thumbnail for gallery video ${id}: ${video.thumbnail}`)
          const deleted = await StorageService.deleteImage(video.thumbnail)
          if (!deleted) {
            console.warn(`Could not delete thumbnail for gallery video ${id}`)
          }
        } catch (imageError) {
          console.error(`Error deleting gallery video thumbnail:`, imageError)
          // Continue even if thumbnail deletion fails
        }
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
