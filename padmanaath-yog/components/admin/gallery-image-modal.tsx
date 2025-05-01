"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
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
import { GalleryService, type GalleryImage } from "@/lib/services/gallery-service"
import { StorageService } from "@/lib/services/storage-service"
import { toast } from "@/hooks/use-toast"

interface GalleryImageModalProps {
  isOpen: boolean
  onClose: () => void
  image: GalleryImage | null
  onSuccess: () => void
  categories: string[]
}

export default function GalleryImageModal({
  isOpen,
  onClose,
  image,
  onSuccess,
  categories,
}: GalleryImageModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    imageFile: null as File | null,
    imagePreview: "",
  })

  const imageInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!image

  // Reset form when modal opens or image changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: image?.title || "",
        description: image?.description || "",
        url: image?.url || "",
        imageFile: null,
        imagePreview: image?.url || "",
      })
    }
  }, [isOpen, image])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for the image",
        variant: "destructive",
      })
      return
    }

    if (!formData.url && !formData.imageFile) {
      toast({
        title: "Missing Image",
        description: "Please upload an image or provide an image URL",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      let imageUrl = formData.url

      if (formData.imageFile) {
        try {
          const uploadedUrl = await StorageService.uploadImage(formData.imageFile)
          if (!uploadedUrl) {
            toast({
              title: "Image Upload Failed",
              description: "Failed to upload image. Please try again or use an image URL.",
              variant: "destructive",
            })
            setIsLoading(false)
            return
          }
          imageUrl = uploadedUrl
        } catch (error) {
          console.error("Image upload failed:", error)
          toast({
            title: "Image Upload Failed",
            description: "Failed to upload image. Please try again or use an image URL.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }
      }

      if (isEditing && image) {
        await GalleryService.updateImage(image.id, {
          title: formData.title,
          description: formData.description,
          url: imageUrl,
        })
        toast({ title: "Success", description: "Image updated successfully!" })
      } else {
        await GalleryService.createImage({
          title: formData.title,
          description: formData.description,
          url: imageUrl,
        })
        toast({ title: "Success", description: "Image added successfully!" })
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving gallery image:", error)
      toast({
        title: "Error",
        description: "Failed to save gallery image. Please try again.",
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
          <DialogTitle>{isEditing ? "Edit Gallery Image" : "Add New Gallery Image"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the image details below."
              : "Fill in the details for your new gallery image."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageTitle" className="text-right">
              Title*
            </Label>
            <Input
              id="imageTitle"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="imageDescription" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="imageDescription"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="col-span-3"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Image*</Label>
            <div className="col-span-3">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="galleryImageUpload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {formData.imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={formData.imagePreview}
                        alt="Preview"
                        fill
                        className="object-contain p-2"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setFormData((prev) => ({
                            ...prev,
                            imageFile: null,
                            imagePreview: "",
                            url: "",
                          }))
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
                      <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                    </div>
                  )}
                  <input
                    id="galleryImageUpload"
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
                  value={formData.url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://example.com/image.jpg"
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
