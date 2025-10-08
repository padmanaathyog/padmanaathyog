"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { BlogService, type BlogExternalRef } from "@/lib/services/blog-service"

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  blog?: BlogExternalRef | null
  onSuccess: () => void
}

export default function BlogModal({ isOpen, onClose, blog, onSuccess }: BlogModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    external_id: "",
    title: "",
    excerpt: "",
    image: "",
    author: "",
    date: "",
    slug: "",
    provider: "external",
    tags: "",
  })

  // Reset form when modal opens/closes or blog changes
  useEffect(() => {
    if (isOpen) {
      if (blog) {
        setFormData({
          external_id: blog.external_id || "",
          title: blog.title || "",
          excerpt: blog.excerpt || "",
          image: blog.image || "",
          author: blog.author || "",
          date: blog.date ? new Date(blog.date).toISOString().split('T')[0] : "",
          slug: blog.slug || "",
          provider: blog.provider || "external",
          tags: (blog as any).tags?.join(", ") || "",
        })
      } else {
        setFormData({
          external_id: "",
          title: "",
          excerpt: "",
          image: "",
          author: "",
          date: new Date().toISOString().split('T')[0],
          slug: "",
          provider: "external",
          tags: "",
        })
      }
    }
  }, [isOpen, blog])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: prev.slug || generateSlug(value)
    }))
  }

  const extractDataFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.toLowerCase()
      
      // Extract provider from URL
      let provider = "external"
      if (hostname.includes("medium.com")) {
        provider = "medium"
      } else if (hostname.includes("dev.to")) {
        provider = "dev.to"
      } else if (hostname.includes("hashnode")) {
        provider = "hashnode"
      } else if (hostname.includes("wordpress")) {
        provider = "wordpress"
      }

      // Extract external_id from URL path
      const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0)
      const external_id = pathParts[pathParts.length - 1] || url

      setFormData(prev => ({
        ...prev,
        external_id,
        provider
      }))
    } catch (error) {
      // Invalid URL, just use as external_id
      setFormData(prev => ({
        ...prev,
        external_id: url,
        provider: "external"
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.author.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!formData.slug.trim()) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }))
    }

    setIsLoading(true)

    try {
      const blogData = {
        external_id: formData.external_id || formData.slug,
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        image: formData.image.trim() || "/heroSection.png",
        author: formData.author.trim(),
        date: formData.date,
        slug: formData.slug.trim() || generateSlug(formData.title),
        provider: formData.provider,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      }

      if (blog?.id) {
        await BlogService.update(blog.id, blogData)
        toast({
          title: "Success",
          description: "Blog post updated successfully!",
        })
      } else {
        await BlogService.create(blogData)
        toast({
          title: "Success",
          description: "Blog post created successfully!",
        })
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving blog post:", error)
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blog ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="external_id">External URL/ID</Label>
              <Input
                id="external_id"
                value={formData.external_id}
                onChange={(e) => extractDataFromUrl(e.target.value)}
                placeholder="https://example.com/blog-post or unique-id"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select value={formData.provider} onValueChange={(value) => setFormData(prev => ({ ...prev, provider: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="external">External</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="dev.to">Dev.to</SelectItem>
                  <SelectItem value="hashnode">Hashnode</SelectItem>
                  <SelectItem value="wordpress">WordPress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter blog post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-friendly-slug"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief description of the blog post"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Author name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="yoga, meditation, wellness (comma separated)"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-yoga-burnt hover:bg-yoga-lightorange">
              {isLoading ? "Saving..." : blog ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
