"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import SectionHeader from "@/components/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play } from "lucide-react"
import { GalleryService, type GalleryImage, type GalleryVideo } from "@/lib/services/gallery-service"
import { ErrorMessage } from "@/components/error-message"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function GalleryPage() {
  const searchParams = useSearchParams()
  const imagePageParam = searchParams.get("imagePage")
  const videoPageParam = searchParams.get("videoPage")
  const currentImagePage = imagePageParam ? Number.parseInt(imagePageParam) : 1
  const currentVideoPage = videoPageParam ? Number.parseInt(videoPageParam) : 1
  

  const [selectedImage, setSelectedImage] = useState<null | { url: string; title: string; description: string }>(null)
  const [selectedVideo, setSelectedVideo] = useState<null | { url: string; title: string; description: string }>(null)
  const [imageCategory, setImageCategory] = useState("all")
  const [videoCategory, setVideoCategory] = useState("all")

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([])
  const [totalImages, setTotalImages] = useState(0)
  const [totalVideos, setTotalVideos] = useState(0)
  const [imageCategories, setImageCategories] = useState<string[]>([])
  const [videoCategories, setVideoCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const imagesPerPage = 12
  const videosPerPage = 9
  const totalImagePages = Math.ceil(totalImages / imagesPerPage)
  const totalVideoPages = Math.ceil(totalVideos / videosPerPage)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [imgCategories, vidCategories] = await Promise.all([
          GalleryService.getImageCategories(),
          GalleryService.getVideoCategories(),
        ])

        // Ensure 'all' is only added once and is at the beginning
        setImageCategories(["all", ...imgCategories.filter((cat) => cat !== "all")])
        setVideoCategories(["all", ...vidCategories.filter((cat) => cat !== "all")])
      } catch (error) {
        console.error("Error fetching categories:", error)
        // Don't set error state here, as we'll handle it in the main data fetch
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const [imagesResult, videosResult] = await Promise.all([
          GalleryService.getAllImages(
            currentImagePage,
            imagesPerPage,
            imageCategory !== "all" ? imageCategory : undefined,
          ),
          GalleryService.getAllVideos(
            currentVideoPage,
            videosPerPage,
            videoCategory !== "all" ? videoCategory : undefined,
          ),
        ])

        setGalleryImages(imagesResult.data)
        setTotalImages(imagesResult.count)
        setGalleryVideos(videosResult.data)
        setTotalVideos(videosResult.count)
      } catch (error) {
        console.error("Error fetching gallery data:", error)
        setError("Failed to load gallery data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryData()
  }, [currentImagePage, currentVideoPage, imageCategory, videoCategory])

  const renderImagePagination = () => {
    if (totalImagePages <= 1) return null

    return (
      <Pagination className="my-8">
        <PaginationContent>
          {currentImagePage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/gallery?imagePage=${currentImagePage - 1}&videoPage=${currentVideoPage}`} />
            </PaginationItem>
          )}

          {Array.from({ length: totalImagePages }).map((_, i) => {
            const page = i + 1

            // Show first page, last page, and pages around current page
            if (
              page === 1 ||
              page === totalImagePages ||
              (page >= currentImagePage - 1 && page <= currentImagePage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`/gallery?imagePage=${page}&videoPage=${currentVideoPage}`}
                    isActive={page === currentImagePage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Show ellipsis for gaps
            if (page === 2 || page === totalImagePages - 1) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return null
          })}

          {currentImagePage < totalImagePages && (
            <PaginationItem>
              <PaginationNext href={`/gallery?imagePage=${currentImagePage + 1}&videoPage=${currentVideoPage}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }

  const renderVideoPagination = () => {
    if (totalVideoPages <= 1) return null

    return (
      <Pagination className="my-8">
        <PaginationContent>
          {currentVideoPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/gallery?imagePage=${currentImagePage}&videoPage=${currentVideoPage - 1}`} />
            </PaginationItem>
          )}

          {Array.from({ length: totalVideoPages }).map((_, i) => {
            const page = i + 1

            // Show first page, last page, and pages around current page
            if (
              page === 1 ||
              page === totalVideoPages ||
              (page >= currentVideoPage - 1 && page <= currentVideoPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`/gallery?imagePage=${currentImagePage}&videoPage=${page}`}
                    isActive={page === currentVideoPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Show ellipsis for gaps
            if (page === 2 || page === totalVideoPages - 1) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return null
          })}

          {currentVideoPage < totalVideoPages && (
            <PaginationItem>
              <PaginationNext href={`/gallery?imagePage=${currentImagePage}&videoPage=${currentVideoPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }

  if (isLoading) {
    return (
      <div className="page-padding">
        <div className="container">
          <SectionHeader
            title="Video & Image Gallery"
            subtitle="Explore our collection of yoga practices, events, and experiences at Padmanaath Yog."
          />
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-padding">
        <div className="container">
          <SectionHeader
            title="Video & Image Gallery"
            subtitle="Explore our collection of yoga practices, events, and experiences at Padmanaath Yog."
          />
          <ErrorMessage
            message={error}
            retry={() => {
              setIsLoading(true)
              setError(null)
              Promise.all([
                GalleryService.getAllImages(
                  currentImagePage,
                  imagesPerPage,
                  imageCategory !== "all" ? imageCategory : undefined,
                ),
                GalleryService.getAllVideos(
                  currentVideoPage,
                  videosPerPage,
                  videoCategory !== "all" ? videoCategory : undefined,
                ),
              ])
                .then(([imagesResult, videosResult]) => {
                  setGalleryImages(imagesResult.data)
                  setTotalImages(imagesResult.count)
                  setGalleryVideos(videosResult.data)
                  setTotalVideos(videosResult.count)
                })
                .catch((error) => {
                  console.error("Error fetching gallery data:", error)
                  setError("Failed to load gallery data. Please try again later.")
                })
                .finally(() => setIsLoading(false))
            }}
          />
        </div>
      </div>
    )
  }

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
                    onClick={() => {
                      setImageCategory(category)
                      // Reset to page 1 when changing category
                      if (currentImagePage !== 1) {
                        window.history.pushState({}, "", `/gallery?imagePage=1&videoPage=${currentVideoPage}`)
                      }
                    }}
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

            {galleryImages.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700">No images found</h3>
                <p className="text-gray-500 mt-2">Try selecting a different category</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages.map((image) => (
                    <div
                      key={image.id}
                      className="sanatan-card overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative h-64 w-full">
                        <Image
                          src={image.url || "/placeholder.svg"}
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

                {renderImagePagination()}
              </>
            )}
          </TabsContent>

          <TabsContent value="videos">
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {videoCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setVideoCategory(category)
                      // Reset to page 1 when changing category
                      if (currentVideoPage !== 1) {
                        window.history.pushState({}, "", `/gallery?imagePage=${currentImagePage}&videoPage=1`)
                      }
                    }}
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

            {galleryVideos.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700">No videos found</h3>
                <p className="text-gray-500 mt-2">Try selecting a different category</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryVideos.map((video) => (
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
                          {/* Removed duration display for YouTube videos */}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {renderVideoPagination()}
              </>
            )}
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
                  src={selectedImage.url || "/placeholder.svg"}
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
        {
  (() => {
    let videoId = null;

    try {
      const url = new URL(selectedVideo.url);

      if (url.hostname === 'youtu.be') {
        // Handle shared short URL: https://youtu.be/VIDEO_ID
        videoId = url.pathname.slice(1);
      } else if (url.hostname.includes('youtube.com')) {
        // Handle full URL: https://www.youtube.com/watch?v=VIDEO_ID
        videoId = new URLSearchParams(url.search).get('v');
      }
    } catch (e) {
      console.error('Invalid YouTube URL', selectedVideo.url);
    }

    if (!videoId) return null;

    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={selectedVideo.title}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  })()
}

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
