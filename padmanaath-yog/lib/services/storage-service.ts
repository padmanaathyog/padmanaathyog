// storageService.ts
import { supabase } from "../supabase"
import { v4 as uuidv4 } from "uuid"

const DEFAULT_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "images"

export const StorageService = {
  /**
   * Upload an image to Supabase Storage
   */
  async uploadImage(file: File, bucket = DEFAULT_BUCKET): Promise<string | null> {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${fileName}`

      const { data, error } = await supabase.storage.from(bucket).upload(filePath, file)

      if (error) {
        console.error("Error uploading image:", error)
        return null
      }

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

      return urlData.publicUrl
    } catch (error) {
      console.error("Error in uploadImage:", error)
      return null
    }
  },

  /**
   * Delete an image from Supabase Storage
   */
  async deleteImage(url: string, bucket = DEFAULT_BUCKET): Promise<boolean> {
    try {
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split("/")
      const filePath = decodeURIComponent(pathParts[pathParts.length - 1]) // just in case

      const { error } = await supabase.storage.from(bucket).remove([filePath])

      if (error) {
        console.error("Error deleting image:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error in deleteImage:", error)
      return false
    }
  },

  /**
   * Get a fallback image URL
   */
  getFallbackImageUrl(url: string | null | undefined, width = 400, height = 300): string {
    if (!url || url.trim() === "") {
      return `/placeholder.svg?height=${height}&width=${width}`
    }
    return url
  },
}
