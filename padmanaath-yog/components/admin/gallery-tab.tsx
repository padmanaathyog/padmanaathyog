"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ImageIcon, Video } from "lucide-react"
import type { GalleryImage, GalleryVideo } from "@/lib/services/gallery-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  editingItemId: number | null
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
  editingItemId,
}: GalleryTabProps) {
  const [galleryTab, setGalleryTab] = useState("images")

  // No filtering by search term anymore
  const displayedImages = galleryImages
  const displayedVideos = galleryVideos

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
      </div>
    )
  }

  return (
    <div>
      <Tabs value={galleryTab} onValueChange={setGalleryTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="images" className="flex-1">
            Images ({galleryImages.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex-1">
            Videos ({galleryVideos.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          {displayedImages.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-500">No images found</h3>
              <p className="text-gray-400 mt-2">Add your first image to get started.</p>
              <Button className="mt-4 bg-yoga-burnt hover:bg-yoga-lightorange" onClick={onAddImage}>
                Add Image
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedImages.map((image) => (
                <Card
                  key={image.id}
                  className={`overflow-hidden transition-all duration-200 ${
                    editingItemId === image.id ? "ring-2 ring-yoga-burnt" : ""
                  }`}
                >
                  <div className="relative h-48 w-full">
                    {image.url ? (
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.title || "Gallery image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <ImageIcon size={48} />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1 truncate">{image.title || "Untitled Image"}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{image.description || "No description"}</p>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 hover:text-yoga-burnt"
                        onClick={() => onEditImage(image)}
                      >
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => onDeleteImage(image)}
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos">
          {displayedVideos.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-500">No videos found</h3>
              <p className="text-gray-400 mt-2">Add your first video to get started.</p>
              <Button className="mt-4 bg-yoga-burnt hover:bg-yoga-lightorange" onClick={onAddVideo}>
                Add Video
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedVideos.map((video) => (
                <Card
                  key={video.id}
                  className={`overflow-hidden transition-all duration-200 ${
                    editingItemId === video.id ? "ring-2 ring-yoga-burnt" : ""
                  }`}
                >
                  <div className="relative h-48 w-full">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title || "Video thumbnail"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <Video size={48} />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1 truncate">{video.title || "Untitled Video"}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{video.description || "No description"}</p>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 hover:text-yoga-burnt"
                        onClick={() => onEditVideo(video)}
                      >
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => onDeleteVideo(video)}
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
