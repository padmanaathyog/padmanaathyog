"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Edit, Eye, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { GalleryImage, GalleryVideo } from "@/lib/services/gallery-service"

interface GalleryTabProps {
  galleryImages: GalleryImage[]
  galleryVideos: GalleryVideo[]
  isLoading: boolean
  searchTerm: string
  onEditImage: (image: GalleryImage) => void
  onEditVideo: (video: GalleryVideo) => void
  onDeleteImage: (image: GalleryImage) => void
  onDeleteVideo: (video: GalleryVideo) => void
  onAddImage: () => void
  onAddVideo: () => void
}

export default function GalleryTab({
  galleryImages,
  galleryVideos,
  isLoading,
  searchTerm,
  onEditImage,
  onEditVideo,
  onDeleteImage,
  onDeleteVideo,
  onAddImage,
  onAddVideo,
}: GalleryTabProps) {
  // Filter gallery items based on search term
  const filteredImages =
    galleryImages && Array.isArray(galleryImages)
      ? galleryImages.filter(
          (image) =>
            image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : []

  const filteredVideos =
    galleryVideos && Array.isArray(galleryVideos)
      ? galleryVideos.filter(
          (video) =>
            video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Gallery</h3>
        <div className="flex space-x-2">
          <Button className="bg-yoga-burnt hover:bg-yoga-lightorange" onClick={onAddImage}>
            <Upload size={16} className="mr-2" /> Upload Images
          </Button>
          <Button className="bg-yoga-burnt hover:bg-yoga-lightorange" onClick={onAddVideo}>
            <Upload size={16} className="mr-2" /> Add Videos
          </Button>
        </div>
      </div>

      <h4 className="text-md font-medium mb-4">Images ({filteredImages.length})</h4>
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="relative h-24 w-full rounded overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg?height=96&width=128"}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white"
                    onClick={() => onEditImage(image)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white"
                    onClick={() => onDeleteImage(image)}
                  >
                    <Trash2 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
              <div className="mt-1 text-xs truncate">{image.title}</div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg mb-8">
          <p className="text-gray-500">
            No images found. {searchTerm ? "Try a different search term." : "Upload your first image!"}
          </p>
        </div>
      )}

      <h4 className="text-md font-medium mb-4">Videos ({filteredVideos.length})</h4>
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="relative h-36 w-full rounded overflow-hidden">
                <Image
                  src={video.thumbnail || "/placeholder.svg?height=144&width=256"}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white"
                    onClick={() => onEditVideo(video)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white"
                    onClick={() => onDeleteVideo(video)}
                  >
                    <Trash2 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium truncate">{video.title}</h4>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{video.duration}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No videos found. {searchTerm ? "Try a different search term." : "Add your first video!"}
          </p>
        </div>
      )}
    </div>
  )
}
