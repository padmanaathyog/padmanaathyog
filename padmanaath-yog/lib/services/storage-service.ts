import { supabase } from "../supabase"

const DEFAULT_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "yoga-images"

export const StorageService = {
  async uploadImage(file: File, folder = DEFAULT_BUCKET): Promise<string | null> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const timestamp = Date.now()
      const fileExtension = file.name.split(".").pop()
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`
      const filePath = `${fileName}`

      const { data, error } = await supabase.storage.from(DEFAULT_BUCKET).upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error(`Error uploading image to bucket ${DEFAULT_BUCKET}:`, error)
        return null
      }

      const { data: publicUrlData } = supabase.storage.from(DEFAULT_BUCKET).getPublicUrl(data.path)
      return publicUrlData.publicUrl
    } catch (error) {
      console.error("Error in uploadImage:", error)
      return null
    }
  },

  async deleteImage(url: string): Promise<boolean> {  
    try {
      if (!url) {
        console.log("No URL provided, skipping deletion")
        return true
      }
  
      if (!url.includes("storage.googleapis.com") && !url.includes("supabase")) {
        console.log("Not a Supabase storage URL, skipping deletion:", url)
        return true
      }
  
      const pathStartIndex = url.indexOf(`/object/public/${DEFAULT_BUCKET}/`) + `/object/public/${DEFAULT_BUCKET}/`.length
      const filePath = url.slice(pathStartIndex)
  
      if (!filePath) {
        console.error("Could not extract file path from URL:", url)
        return false
      }
  
      const { error } = await supabase.storage.from(DEFAULT_BUCKET).remove([filePath])
  
      if (error) {
        console.error(`Error deleting image from bucket ${DEFAULT_BUCKET}:`, error)
        return false
      }
  
      return true
    } catch (error) {
      console.error("Error in deleteImage:", error)
      return false
    }
  },
  

  generateGradientAvatar(name: string): string {
    const hash = name.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)

    const hue1 = hash % 360
    const hue2 = (hue1 + 40) % 360

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:hsl(${hue1}, 70%, 60%);stop-opacity:1" />
            <stop offset="100%" style="stop-color:hsl(${hue2}, 70%, 60%);stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#gradient)" />
        <text x="50%" y="50%" font-family="Arial" font-size="80" text-anchor="middle" dy=".3em" fill="white">
          ${name.charAt(0).toUpperCase()}
        </text>
      </svg>
    `

    return `data:image/svg+xml;base64,${btoa(svg)}`
  },
}
