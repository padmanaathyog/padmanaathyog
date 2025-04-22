"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft, Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Import services
import { AuthService } from "@/lib/services/auth-service"
import { TestimonialService, type Testimonial } from "@/lib/services/testimonial-service"
import { GalleryService, type GalleryImage, type GalleryVideo } from "@/lib/services/gallery-service"
import { EventService, type Event } from "@/lib/services/event-service"

// Import components
import LoginForm from "@/components/admin/login-form"
import TestimonialsTab from "@/components/admin/testimonials-tab"
import GalleryTab from "@/components/admin/gallery-tab"
import EventsTab from "@/components/admin/events-tab"
import TestimonialModal from "@/components/admin/testimonial-modal"
import EventModal from "@/components/admin/event-modal"
import DeleteModal from "@/components/admin/delete-modal"

export default function AdminDashboard() {
  const router = useRouter()

  // Tab state
  const [activeTab, setActiveTab] = useState("testimonials")

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  // Data states
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([])
  const [events, setEvents] = useState<Event[]>([])

  // Search state
  const [searchTerm, setSearchTerm] = useState("")

  // Loading state
  const [isLoading, setIsLoading] = useState(false)

  // Modal states
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false)
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  // Current item being edited/deleted
  const [currentItem, setCurrentItem] = useState<any>(null)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await AuthService.isAuthenticated()
        setIsAuthenticated(isAuth)
      } catch (error) {
        console.error("Error checking authentication:", error)
        setIsAuthenticated(false)
      } finally {
        setIsAuthLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Load data based on active tab
  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated, activeTab])

  const loadData = async () => {
    setIsLoading(true)

    try {
      switch (activeTab) {
        case "testimonials":
          const testimonialResult = await TestimonialService.getAll()
          setTestimonials(testimonialResult?.data || [])
          break
        case "gallery":
          try {
            const imageResult = await GalleryService.getAllImages()
            setGalleryImages(imageResult?.data || [])
          } catch (error) {
            console.error("Error loading gallery images:", error)
            setGalleryImages([])
          }

          try {
            const videoResult = await GalleryService.getAllVideos()
            setGalleryVideos(videoResult?.data || [])
          } catch (error) {
            console.error("Error loading gallery videos:", error)
            setGalleryVideos([])
          }
          break
        case "events":
          const eventResult = await EventService.getAll()
          setEvents(eventResult?.data || [])
          break
      }
    } catch (error) {
      console.error(`Error loading ${activeTab} data:`, error)
      toast({
        title: "Error",
        description: `Failed to load ${activeTab} data. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle login success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await AuthService.signOut()
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Handle back button
  const handleBack = () => {
    if (window.confirm("Are you sure you want to leave the admin dashboard?")) {
      router.push("/")
    }
  }

  // Open modals
  const openTestimonialModal = (testimonial: Testimonial | null = null) => {
    setCurrentItem(testimonial)
    setTestimonialModalOpen(true)
  }

  const openEventModal = (event: Event | null = null) => {
    setCurrentItem(event)
    setEventModalOpen(true)
  }

  const openDeleteModal = (item: any) => {
    setCurrentItem(item)
    setDeleteModalOpen(true)
  }

  // Handle delete
  const handleDelete = async () => {
    if (!currentItem) return

    setIsLoading(true)

    try {
      let success = false

      switch (activeTab) {
        case "testimonials":
          success = await TestimonialService.delete(currentItem.id)
          break
        case "gallery":
          if (currentItem.thumbnail) {
            // It's a video
            success = await GalleryService.deleteVideo(currentItem.id)
          } else {
            // It's an image
            success = await GalleryService.deleteImage(currentItem.id)
          }
          break
        case "events":
          success = await EventService.delete(currentItem.id)
          break
      }

      if (success) {
        toast({
          title: "Success",
          description: "Item deleted successfully!",
        })
        loadData()
      } else {
        throw new Error("Failed to delete item")
      }

      setDeleteModalOpen(false)
    } catch (error) {
      console.error("Error deleting item:", error)
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt mx-auto"></div>
          <p className="mt-4 text-yoga-burnt">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLoginSuccess} onBack={handleBack} />
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <header className="bg-yoga-burnt text-white p-4 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold">Padmanaath Yog Admin</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white hover:text-yoga-burnt hidden sm:flex"
              onClick={handleBack}
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Website
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white hover:text-yoga-burnt"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-start mb-6 bg-white p-1 rounded-lg shadow-sm overflow-x-auto">
            <TabsTrigger value="testimonials" className="flex-1 min-w-[100px]">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex-1 min-w-[100px]">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="events" className="flex-1 min-w-[100px]">
              Events
            </TabsTrigger>
          </TabsList>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-auto flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <Button
                className="bg-yoga-burnt hover:bg-yoga-lightorange whitespace-nowrap"
                onClick={() => {
                  switch (activeTab) {
                    case "testimonials":
                      openTestimonialModal()
                      break
                    case "gallery":
                      // Handle in the gallery tab
                      break
                    case "events":
                      openEventModal()
                      break
                  }
                }}
              >
                <Plus size={16} className="mr-1" /> Add New
              </Button>
            </div>
          </div>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <TestimonialsTab
              testimonials={testimonials}
              isLoading={isLoading}
              searchTerm={searchTerm}
              onEdit={openTestimonialModal}
              onDelete={openDeleteModal}
              refreshData={loadData}
            />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <GalleryTab
              galleryImages={galleryImages}
              galleryVideos={galleryVideos}
              isLoading={isLoading}
              searchTerm={searchTerm}
              onEditImage={(image) => openDeleteModal(image)}
              onEditVideo={(video) => openDeleteModal(video)}
              onDeleteImage={openDeleteModal}
              onDeleteVideo={openDeleteModal}
              onAddImage={() => {}}
              onAddVideo={() => {}}
            />
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <EventsTab
              events={events}
              isLoading={isLoading}
              searchTerm={searchTerm}
              onEdit={openEventModal}
              onDelete={openDeleteModal}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Padmanaath Yog Admin Dashboard. All rights reserved.</p>
          <p className="mt-1">This is a secure area. Unauthorized access is prohibited.</p>
        </div>
      </footer>

      {/* Modals */}
      <TestimonialModal
        isOpen={testimonialModalOpen}
        onClose={() => setTestimonialModalOpen(false)}
        testimonial={currentItem}
        onSuccess={loadData}
      />

      <EventModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        event={currentItem}
        onSuccess={loadData}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        item={currentItem}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  )
}
