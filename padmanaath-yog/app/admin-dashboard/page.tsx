"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { blogPosts, testimonials, galleryItems, upcomingEvents } from "@/lib/data"
import Image from "next/image"
import { Trash2, Edit, Plus, Eye, EyeOff, Search, Filter, ArrowLeft, Upload, Star, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

export default function AdminDashboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState("blog")

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Modal states
  const [blogModalOpen, setBlogModalOpen] = useState(false)
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  // Current item being edited/deleted
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  // File upload refs
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoThumbnailRef = useRef<HTMLInputElement>(null)

  // Form data states
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Yog Sadhak Umesh",
    tags: "",
    slug: "",
    date: format(new Date(), "MMMM dd, yyyy"),
  })

  const [testimonialFormData, setTestimonialFormData] = useState({
    name: "",
    role: "",
    quote: "",
    image: "",
    rating: 5,
  })

  const [imageFormData, setImageFormData] = useState({
    title: "",
    description: "",
    category: "Practice",
    imageFile: null as File | null,
    previewUrl: "",
  })

  const [videoFormData, setVideoFormData] = useState({
    title: "",
    description: "",
    category: "Practice",
    videoUrl: "",
    thumbnailFile: null as File | null,
    thumbnailPreview: "",
    duration: "00:00",
  })

  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    time: "",
    location: "",
    price: "",
    spots: 20,
  })

  // Simple authentication for demo purposes
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        setIsAuthenticated(true)
        setLoginError("")
      } else {
        setLoginError("Invalid credentials")
      }
      setIsLoading(false)
    }, 1000)
  }

  // Handle back button
  const handleBack = () => {
    if (window.confirm("Are you sure you want to leave the admin dashboard?")) {
      window.location.href = "/"
    }
  }

  // Open blog modal for create/edit
  const openBlogModal = (blog = null) => {
    if (blog) {
      setBlogFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.excerpt, // In a real app, you'd have full content
        image: blog.image,
        author: blog.author,
        tags: blog.tags.join(", "),
        slug: blog.slug,
        date: blog.date,
      })
      setCurrentItem(blog)
      setIsEditing(true)
    } else {
      setBlogFormData({
        title: "",
        excerpt: "",
        content: "",
        image: "/placeholder.svg?height=400&width=600",
        author: "Yog Sadhak Umesh",
        tags: "",
        slug: "",
        date: format(new Date(), "MMMM dd, yyyy"),
      })
      setIsEditing(false)
    }
    setBlogModalOpen(true)
  }

  // Open testimonial modal for create/edit
  const openTestimonialModal = (testimonial = null) => {
    if (testimonial) {
      setTestimonialFormData({
        name: testimonial.name,
        role: testimonial.role,
        quote: testimonial.quote,
        image: testimonial.image,
        rating: testimonial.rating,
      })
      setCurrentItem(testimonial)
      setIsEditing(true)
    } else {
      setTestimonialFormData({
        name: "",
        role: "",
        quote: "",
        image: "/placeholder.svg?height=200&width=200",
        rating: 5,
      })
      setIsEditing(false)
    }
    setTestimonialModalOpen(true)
  }

  // Open image upload modal
  const openImageModal = (image = null) => {
    if (image) {
      setImageFormData({
        title: image.title,
        description: image.description,
        category: image.category,
        imageFile: null,
        previewUrl: image.src,
      })
      setCurrentItem(image)
      setIsEditing(true)
    } else {
      setImageFormData({
        title: "",
        description: "",
        category: "Practice",
        imageFile: null,
        previewUrl: "",
      })
      setIsEditing(false)
    }
    setImageModalOpen(true)
  }

  // Open video upload modal
  const openVideoModal = (video = null) => {
    if (video) {
      setVideoFormData({
        title: video.title,
        description: video.description,
        category: video.category,
        videoUrl: video.src,
        thumbnailFile: null,
        thumbnailPreview: video.thumbnail,
        duration: video.duration,
      })
      setCurrentItem(video)
      setIsEditing(true)
    } else {
      setVideoFormData({
        title: "",
        description: "",
        category: "Practice",
        videoUrl: "",
        thumbnailFile: null,
        thumbnailPreview: "",
        duration: "00:00",
      })
      setIsEditing(false)
    }
    setVideoModalOpen(true)
  }

  // Open event modal for create/edit
  const openEventModal = (event = null) => {
    if (event) {
      setEventFormData({
        title: event.title,
        description: event.description,
        image: event.image,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price.replace("₹", ""),
        spots: event.spots,
      })
      setCurrentItem(event)
      setIsEditing(true)
    } else {
      setEventFormData({
        title: "",
        description: "",
        image: "/placeholder.svg?height=400&width=600",
        date: "",
        time: "",
        location: "",
        price: "",
        spots: 20,
      })
      setIsEditing(false)
    }
    setEventModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (item: any) => {
    setCurrentItem(item)
    setDeleteModalOpen(true)
  }

  // Handle image file selection
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageFormData({
          ...imageFormData,
          imageFile: file,
          previewUrl: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle video thumbnail selection
  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVideoFormData({
          ...videoFormData,
          thumbnailFile: file,
          thumbnailPreview: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submissions
  const handleBlogSubmit = () => {
    // In a real app, you would save to a database
    console.log("Saving blog:", blogFormData)
    setBlogModalOpen(false)
    // Show success message
    alert(isEditing ? "Blog post updated successfully!" : "Blog post created successfully!")
  }

  const handleTestimonialSubmit = () => {
    console.log("Saving testimonial:", testimonialFormData)
    setTestimonialModalOpen(false)
    alert(isEditing ? "Testimonial updated successfully!" : "Testimonial created successfully!")
  }

  const handleImageSubmit = () => {
    console.log("Saving image:", imageFormData)
    setImageModalOpen(false)
    alert(isEditing ? "Image updated successfully!" : "Image uploaded successfully!")
  }

  const handleVideoSubmit = () => {
    console.log("Saving video:", videoFormData)
    setVideoModalOpen(false)
    alert(isEditing ? "Video updated successfully!" : "Video added successfully!")
  }

  const handleEventSubmit = () => {
    console.log("Saving event:", eventFormData)
    setEventModalOpen(false)
    alert(isEditing ? "Event updated successfully!" : "Event created successfully!")
  }

  const handleDelete = () => {
    console.log("Deleting item:", currentItem)
    setDeleteModalOpen(false)
    alert("Item deleted successfully!")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-yoga-burnt">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              >
                {loginError}
              </motion.div>
            )}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-yoga-burnt hover:bg-yoga-lightorange" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center mt-4">
              <Button variant="ghost" size="sm" onClick={handleBack} className="text-gray-500 hover:text-yoga-burnt">
                <ArrowLeft size={16} className="mr-1" /> Back to Website
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    )
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
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-start mb-6 bg-white p-1 rounded-lg shadow-sm overflow-x-auto">
            <TabsTrigger value="blog" className="flex-1 min-w-[100px]">
              Blog Posts
            </TabsTrigger>
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

          {/* Search and Filter Bar */}
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
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-300 text-gray-700"
              >
                <Filter size={16} className="mr-1" /> Filters
              </Button>
              <Button
                className="bg-yoga-burnt hover:bg-yoga-lightorange whitespace-nowrap"
                onClick={() => {
                  switch (activeTab) {
                    case "blog":
                      openBlogModal()
                      break
                    case "testimonials":
                      openTestimonialModal()
                      break
                    case "gallery":
                      if (activeTab === "gallery") {
                        openImageModal()
                      }
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

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-4 rounded-lg shadow-sm mb-6 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt">
                      <option value="">All</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt">
                      <option value="">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt">
                      <option value="">All Categories</option>
                      <option value="yoga">Yoga</option>
                      <option value="meditation">Meditation</option>
                      <option value="health">Health</option>
                      <option value="wellness">Wellness</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt">
                      <option value="">All Authors</option>
                      <option value="yog-sadhak-umesh">Yog Sadhak Umesh</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                    Reset
                  </Button>
                  <Button size="sm" className="bg-yoga-burnt hover:bg-yoga-lightorange">
                    Apply Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog Posts Management */}
          <TabsContent value="blog" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Published
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => openBlogModal(post)}
                            >
                              <Edit size={16} className="mr-1" /> Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => openDeleteModal(post)}
                            >
                              <Trash2 size={16} className="mr-1" /> Delete
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                              <Eye size={16} className="mr-1" /> View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                    Next
                  </Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                      <span className="font-medium">20</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 rounded-l-md">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 bg-yoga-burnt text-white">
                        1
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                        2
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                        3
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 rounded-r-md">
                        Next
                      </Button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Testimonials Management */}
          <TabsContent value="testimonials" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-sm p-6 relative"
                >
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => openTestimonialModal(testimonial)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => openDeleteModal(testimonial)}
                    >
                      <Trash2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                      {testimonial.id % 2 === 0 ? <Eye size={16} /> : <EyeOff size={16} />}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">Added on {new Date().toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Images</h3>
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange" onClick={() => openImageModal()}>
                  <Upload size={16} className="mr-2" /> Upload Images
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {galleryItems.images.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="relative h-24 w-full rounded overflow-hidden">
                      <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-white"
                          onClick={() => openImageModal(image)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-white"
                          onClick={() => openDeleteModal(image)}
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
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Videos</h3>
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange" onClick={() => openVideoModal()}>
                  <Upload size={16} className="mr-2" /> Add Videos
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryItems.videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="relative h-36 w-full rounded overflow-hidden">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
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
                          onClick={() => openVideoModal(video)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-white"
                          onClick={() => openDeleteModal(video)}
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
            </div>
          </TabsContent>

          {/* Events Management */}
          <TabsContent value="events" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => openEventModal(event)}
                            >
                              <Edit size={16} className="mr-1" /> Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => openDeleteModal(event)}
                            >
                              <Trash2 size={16} className="mr-1" /> Delete
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                              <Eye size={16} className="mr-1" /> View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                    Next
                  </Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{" "}
                      <span className="font-medium">4</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 rounded-l-md">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 bg-yoga-burnt text-white">
                        1
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 rounded-r-md">
                        Next
                      </Button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
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

      {/* Blog Post Modal */}
      <Dialog open={blogModalOpen} onOpenChange={setBlogModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update the blog post details below." : "Fill in the details for your new blog post."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={blogFormData.title}
                onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <Input
                id="slug"
                value={blogFormData.slug}
                onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                value={blogFormData.author}
                onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                value={blogFormData.date}
                onChange={(e) => setBlogFormData({ ...blogFormData, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={blogFormData.image}
                onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                value={blogFormData.tags}
                onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                placeholder="Comma separated tags"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="excerpt" className="text-right pt-2">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                value={blogFormData.excerpt}
                onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                className="col-span-3"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="content"
                value={blogFormData.content}
                onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                className="col-span-3"
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlogModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBlogSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Testimonial Modal */}
      <Dialog open={testimonialModalOpen} onOpenChange={setTestimonialModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update the testimonial details below." : "Fill in the details for the new testimonial."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={testimonialFormData.name}
                onChange={(e) => setTestimonialFormData({ ...testimonialFormData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Input
                id="role"
                value={testimonialFormData.role}
                onChange={(e) => setTestimonialFormData({ ...testimonialFormData, role: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={testimonialFormData.image}
                onChange={(e) => setTestimonialFormData({ ...testimonialFormData, image: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <div className="flex items-center col-span-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setTestimonialFormData({ ...testimonialFormData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= testimonialFormData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="quote" className="text-right pt-2">
                Quote
              </Label>
              <Textarea
                id="quote"
                value={testimonialFormData.quote}
                onChange={(e) => setTestimonialFormData({ ...testimonialFormData, quote: e.target.value })}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTestimonialModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTestimonialSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Upload Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Image" : "Upload New Image"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update the image details below." : "Upload a new image to the gallery."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageTitle" className="text-right">
                Title
              </Label>
              <Input
                id="imageTitle"
                value={imageFormData.title}
                onChange={(e) => setImageFormData({ ...imageFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="imageDescription" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="imageDescription"
                value={imageFormData.description}
                onChange={(e) => setImageFormData({ ...imageFormData, description: e.target.value })}
                className="col-span-3"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageCategory" className="text-right">
                Category
              </Label>
              <select
                id="imageCategory"
                value={imageFormData.category}
                onChange={(e) => setImageFormData({ ...imageFormData, category: e.target.value })}
                className="col-span-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
              >
                <option value="Practice">Practice</option>
                <option value="Meditation">Meditation</option>
                <option value="Workshop">Workshop</option>
                <option value="Facility">Facility</option>
                <option value="Therapeutic">Therapeutic</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Image</Label>
              <div className="col-span-3">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {imageFormData.previewUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imageFormData.previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          fill
                          className="object-contain p-2"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            setImageFormData({ ...imageFormData, imageFile: null, previewUrl: "" })
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
                        <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                      </div>
                    )}
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageFileChange}
                      ref={imageInputRef}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImageModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImageSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Video" : "Add New Video"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update the video details below." : "Add a new video to the gallery."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoTitle" className="text-right">
                Title
              </Label>
              <Input
                id="videoTitle"
                value={videoFormData.title}
                onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="videoDescription" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="videoDescription"
                value={videoFormData.description}
                onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                className="col-span-3"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoCategory" className="text-right">
                Category
              </Label>
              <select
                id="videoCategory"
                value={videoFormData.category}
                onChange={(e) => setVideoFormData({ ...videoFormData, category: e.target.value })}
                className="col-span-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
              >
                <option value="Practice">Practice</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Introduction">Introduction</option>
                <option value="Therapeutic">Therapeutic</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoUrl" className="text-right">
                YouTube URL
              </Label>
              <Input
                id="videoUrl"
                value={videoFormData.videoUrl}
                onChange={(e) => setVideoFormData({ ...videoFormData, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoDuration" className="text-right">
                Duration
              </Label>
              <Input
                id="videoDuration"
                value={videoFormData.duration}
                onChange={(e) => setVideoFormData({ ...videoFormData, duration: e.target.value })}
                placeholder="MM:SS"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Thumbnail</Label>
              <div className="col-span-3">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="thumbnailUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {videoFormData.thumbnailPreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={videoFormData.thumbnailPreview || "/placeholder.svg"}
                          alt="Preview"
                          fill
                          className="object-contain p-2"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            setVideoFormData({ ...videoFormData, thumbnailFile: null, thumbnailPreview: "" })
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
                        <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                      </div>
                    )}
                    <input
                      id="thumbnailUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailFileChange}
                      ref={videoThumbnailRef}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVideoModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVideoSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Modal */}
      <Dialog open={eventModalOpen} onOpenChange={setEventModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Event" : "Create New Event"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update the event details below." : "Fill in the details for your new event."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventTitle" className="text-right">
                Title
              </Label>
              <Input
                id="eventTitle"
                value={eventFormData.title}
                onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="eventDescription" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="eventDescription"
                value={eventFormData.description}
                onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventImage" className="text-right">
                Image URL
              </Label>
              <Input
                id="eventImage"
                value={eventFormData.image}
                onChange={(e) => setEventFormData({ ...eventFormData, image: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventDate" className="text-right">
                Date
              </Label>
              <Input
                id="eventDate"
                value={eventFormData.date}
                onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                placeholder="July 21, 2023"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventTime" className="text-right">
                Time
              </Label>
              <Input
                id="eventTime"
                value={eventFormData.time}
                onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                placeholder="5:30 AM - 2:00 PM"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventLocation" className="text-right">
                Location
              </Label>
              <Input
                id="eventLocation"
                value={eventFormData.location}
                onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventPrice" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="eventPrice"
                value={eventFormData.price}
                onChange={(e) => setEventFormData({ ...eventFormData, price: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventSpots" className="text-right">
                Available Spots
              </Label>
              <Input
                id="eventSpots"
                type="number"
                value={eventFormData.spots.toString()}
                onChange={(e) => setEventFormData({ ...eventFormData, spots: Number.parseInt(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEventSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentItem && (
              <div className="flex items-center space-x-3">
                {currentItem.image && (
                  <div className="h-12 w-12 flex-shrink-0">
                    <Image
                      src={currentItem.image || currentItem.src || currentItem.thumbnail || "/placeholder.svg"}
                      alt="Item to delete"
                      width={48}
                      height={48}
                      className="rounded object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium">{currentItem.title || currentItem.name}</p>
                  <p className="text-sm text-gray-500">
                    {currentItem.excerpt || currentItem.quote || currentItem.description || ""}
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
