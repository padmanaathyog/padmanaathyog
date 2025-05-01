"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GalleryService, type GalleryVideo } from "@/lib/services/gallery-service"
import { StorageService } from "@/lib/services/storage-service"
import { toast } from "@/hooks/use-toast"

interface GalleryVideoModalProps {
  isOpen: boolean
  onClose: () => void
  video: GalleryVideo | null
  onSuccess: () => void
  categories: string[]
}

export default function GalleryVideoModal({ isOpen, onClose, video, onSuccess, categories }: GalleryVideoModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    url: video?.url || "",
    thumbnail: video?.thumbnail || "",
    thumbnailFile: null as File | null,
    thumbnailPreview: video?.thumbnail || "",
  })

  useEffect(() => {
    setFormData({
      title: video?.title || "",
      description: video?.description || "",
      url: video?.url || "",
      thumbnail: video?.thumbnail || "",
      thumbnailFile: null,
      thumbnailPreview: video?.thumbnail || "",
    })
  }, [video])
  
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!video

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          thumbnailFile: file,
          thumbnailPreview: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Generate YouTube thumbnail URL from video ID
  const generateYouTubeThumbnail = (videoId: string): string => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData({ ...formData, url })

    // If it's a YouTube URL and no custom thumbnail is provided, use YouTube thumbnail
    if (url && !formData.thumbnailFile && !formData.thumbnail) {
      const videoId = getYouTubeVideoId(url)
      if (videoId) {
        const thumbnailUrl = generateYouTubeThumbnail(videoId)
        setFormData((prev) => ({
          ...prev,
          url,
          thumbnail: thumbnailUrl,
          thumbnailPreview: thumbnailUrl,
        }))
      }
    }
  }

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for the video",
        variant: "destructive",
      })
      return
    }

    if (!formData.url) {
      toast({
        title: "Missing Video URL",
        description: "Please provide a video URL",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      let thumbnailUrl = formData.thumbnail

      // Upload new thumbnail if provided
      if (formData.thumbnailFile) {
        try {
          const uploadedUrl = await StorageService.uploadImage(formData.thumbnailFile)
          if (uploadedUrl) {
            thumbnailUrl = uploadedUrl
          }
        } catch (error) {
          console.error("Thumbnail upload failed:", error)
          // Continue with the existing thumbnail URL or YouTube thumbnail
        }
      }

      if (isEditing && video) {
        await GalleryService.updateVideo(video.id, {
          title: formData.title,
          description: formData.description,
          url: formData.url,
          thumbnail: thumbnailUrl,
        })
        toast({
          title: "Success",
          description: "Video updated successfully!",
        })
      } else {
        await GalleryService.createVideo({
          title: formData.title,
          description: formData.description,
          url: formData.url,
          thumbnail: thumbnailUrl,
        })
        toast({
          title: "Success",
          description: "Video added successfully!",
        })
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving gallery video:", error)
      toast({
        title: "Error",
        description: "Failed to save gallery video. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Gallery Video" : "Add New Gallery Video"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the video details below." : "Fill in the details for your new gallery video."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="videoTitle" className="text-right">
              Title*
            </Label>
            <Input
              id="videoTitle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="videoDescription" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="videoDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="col-span-3"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="videoUrl" className="text-right">
              Video URL*
            </Label>
            <Input
              id="videoUrl"
              value={formData.url}
              onChange={handleVideoUrlChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Thumbnail</Label>
            <div className="col-span-3">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="videoThumbnailUpload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {formData.thumbnailPreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={formData.thumbnailPreview || "/placeholder.svg"}
                        alt="Thumbnail Preview"
                        fill
                        className="object-contain p-2"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setFormData({ ...formData, thumbnailFile: null, thumbnailPreview: "", thumbnail: "" })
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or WEBP (Optional)</p>
                    </div>
                  )}
                  <input
                    id="videoThumbnailUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailChange}
                    ref={thumbnailInputRef}
                  />
                </label>
              </div>
              <div className="mt-2">
                <Label htmlFor="thumbnailUrl" className="text-sm">
                  Or provide a thumbnail URL:
                </Label>
                <Input
                  id="thumbnailUrl"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
