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
import { TestimonialService, type Testimonial } from "@/lib/services/testimonial-service"
import { StorageService } from "@/lib/services/storage-service"
import { toast } from "@/hooks/use-toast"


interface TestimonialModalProps {
  isOpen: boolean
  onClose: () => void
  testimonial: Testimonial | null
  onSuccess: () => void
}

export default function TestimonialModal({ isOpen, onClose, testimonial, onSuccess }: TestimonialModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    quote: testimonial?.quote || "",
    image: testimonial?.image || "",
    imageFile: null as File | null,
    imagePreview: testimonial?.image || "",
    rating: testimonial?.rating || 5,
  })

  // Preview the gradient avatar if no image is provided
  const [gradientAvatar, setGradientAvatar] = useState<string>("")

  useEffect(() => {
    if (formData.name && !formData.image && !formData.imagePreview) {
      setGradientAvatar(StorageService.generateGradientAvatar(formData.name))
    } else {
      setGradientAvatar("")
    }
  }, [formData.name, formData.image, formData.imagePreview])

  const imageInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!testimonial

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageFile: file,
          imagePreview: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.quote.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      let imageUrl = formData.image

      // Upload new image if provided
      if (formData.imageFile) {
        try {
          const uploadedUrl = await StorageService.uploadImage(formData.imageFile)
          if (uploadedUrl) {
            imageUrl = uploadedUrl
          } else {
            // If upload fails, use gradient avatar
            imageUrl = StorageService.generateGradientAvatar(formData.name)
          }
        } catch (error) {
          console.error("Image upload failed:", error)
          // Use gradient avatar as fallback
          imageUrl = StorageService.generateGradientAvatar(formData.name)
        }
      }

      // If no image is provided, generate a gradient avatar
      if (!imageUrl) {
        imageUrl = StorageService.generateGradientAvatar(formData.name)
      }

      if (isEditing && testimonial) {
        await TestimonialService.update(testimonial.id, {
          name: formData.name,
          role: formData.role,
          quote: formData.quote,
          image: imageUrl,
          rating: formData.rating,
        })
        toast({
          title: "Success",
          description: "Testimonial updated successfully!",
        })
      } else {
        await TestimonialService.create({
          name: formData.name,
          role: formData.role,
          quote: formData.quote,
          image: imageUrl,
          rating: formData.rating,
        })
        toast({
          title: "Success",
          description: "Testimonial created successfully!",
        })
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving testimonial:", error)
      toast({
        title: "Error",
        description: "Failed to save testimonial. Please try again.",
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
          <DialogTitle>{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the testimonial details below." : "Fill in the details for the new testimonial."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name*
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="col-span-3"
              placeholder="e.g. Yoga Student, Business Owner"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="quote" className="text-right pt-2">
              Testimonial*
            </Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              className="col-span-3"
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Photo</Label>
            <div className="col-span-3">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="testimonialImageUpload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {formData.imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={formData.imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-contain p-2"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setFormData({ ...formData, imageFile: null, imagePreview: "", image: "" })
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : gradientAvatar ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={gradientAvatar || "/placeholder.svg"}
                        alt="Gradient Avatar"
                        fill
                        className="object-contain p-2"
                      />
                      <p className="absolute bottom-2 text-xs text-center w-full">Gradient avatar will be used</p>
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
                    id="testimonialImageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    ref={imageInputRef}
                  />
                </label>
              </div>
              <div className="mt-2">
                <Label htmlFor="imageUrl" className="text-sm">
                  Or provide an image URL:
                </Label>
                <Input
                  id="imageUrl"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If no image is provided, a gradient avatar will be generated automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <div className="col-span-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 focus:outline-none"
                  >
                    <svg
                      className={`h-6 w-6 ${star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">{formData.rating} out of 5</span>
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
