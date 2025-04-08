"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { blogPosts, testimonials, galleryItems, upcomingEvents } from "@/lib/data"
import Image from "next/image"
import { Trash2, Edit, Plus, Upload } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Simple authentication for demo purposes
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Invalid credentials")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-yoga-burnt">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{loginError}</div>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-yoga-burnt hover:bg-yoga-lightorange">
              Login
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yoga-burnt text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Padmanaath Yog Admin Dashboard</h1>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-yoga-burnt"
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-start mb-8 bg-white p-1 rounded-lg">
            <TabsTrigger value="blog" className="flex-1">
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex-1">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex-1">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="events" className="flex-1">
              Events
            </TabsTrigger>
          </TabsList>

          {/* Blog Posts Management */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Blog Posts</h2>
              <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">
                <Plus size={16} className="mr-2" /> Add New Post
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogPosts.map((post) => (
                    <tr key={post.id}>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 mr-2">
                          <Edit size={16} className="mr-1" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Testimonials Management */}
          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Testimonials</h2>
              <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">
                <Plus size={16} className="mr-2" /> Add New Testimonial
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg shadow p-6 relative">
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                      <Trash2 size={16} />
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
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Gallery</h2>
              <div className="flex space-x-2">
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">
                  <Upload size={16} className="mr-2" /> Upload Images
                </Button>
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">
                  <Upload size={16} className="mr-2" /> Upload Videos
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {galleryItems.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="relative h-24 w-full rounded overflow-hidden">
                      <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryItems.videos.map((video) => (
                  <div key={video.id} className="relative group">
                    <div className="relative h-36 w-full rounded overflow-hidden">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <div className="mt-1 text-sm font-medium truncate">{video.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Events Management */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Events</h2>
              <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">
                <Plus size={16} className="mr-2" /> Add New Event
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingEvents.map((event) => (
                    <tr key={event.id}>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 mr-2">
                          <Edit size={16} className="mr-1" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

