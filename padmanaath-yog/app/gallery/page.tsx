"use client"

import { useState } from "react"
import Image from "next/image"
import SectionHeader from "@/components/section-header"
import { galleryItems } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play } from "lucide-react"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<null | { src: string; title: string; description: string }>(null)
  const [selectedVideo, setSelectedVideo] = useState<null | { src: string; title: string; description: string }>(null)
  const [imageCategory, setImageCategory] = useState("all")
  const [videoCategory, setVideoCategory] = useState("all")

  const filteredImages =
    imageCategory === "all"
      ? galleryItems.images
      : galleryItems.images.filter((img) => img.category.toLowerCase() === imageCategory.toLowerCase())

  const filteredVideos =
    videoCategory === "all"
      ? galleryItems.videos
      : galleryItems.videos.filter((vid) => vid.category.toLowerCase() === videoCategory.toLowerCase())

  const imageCategories = ["all", ...new Set(galleryItems.images.map((img) => img.category))]
  const videoCategories = ["all", ...new Set(galleryItems.videos.map((vid) => vid.category))]

  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
          title="Video & Image Gallery"
          subtitle="Explore our collection of yoga practices, events, and experiences at Padmanaath Yog."
        />

        <Tabs defaultValue="images" className="w-full mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="glassmorphic">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="images">
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {imageCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setImageCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      imageCategory === category
                        ? "bg-yoga-burnt text-white"
                        : "bg-yoga-burnt/10 text-yoga-burnt hover:bg-yoga-burnt/20"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="sanatan-card overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-yoga-burnt">{image.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {videoCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setVideoCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      videoCategory === category
                        ? "bg-yoga-burnt text-white"
                        : "bg-yoga-burnt/10 text-yoga-burnt hover:bg-yoga-burnt/20"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="sanatan-card overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-yoga-burnt/80 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-yoga-burnt">{video.title}</h3>
                      <span className="text-xs bg-yoga-burnt/10 px-2 py-1 rounded text-yoga-burnt">
                        {video.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Image Lightbox */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-yoga-burnt">{selectedImage?.title}</DialogTitle>
              <DialogDescription>{selectedImage?.description}</DialogDescription>
            </DialogHeader>
            {selectedImage && (
              <div className="relative h-[60vh] w-full">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Video Lightbox */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-yoga-burnt">{selectedVideo?.title}</DialogTitle>
              <DialogDescription>{selectedVideo?.description}</DialogDescription>
            </DialogHeader>
            {selectedVideo && (
              <div className="relative aspect-video w-full">
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <p className="text-yoga-burnt">Video playback would be available here</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="bg-yoga-cream p-8 rounded-2xl text-center mt-16">
          <h2 className="text-2xl font-bold mb-4 text-yoga-burnt">Disclaimer</h2>
          <p className="text-muted-foreground">
            All images and videos on this site are copyrighted material. They are provided for information purposes
            only. We hold no responsibility for any misuse. Unauthorized reproduction or distribution is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}

