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
import { EventService, type Event } from "@/lib/services/event-service"
import { toast } from "@/hooks/use-toast"

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event | null
  onSuccess: () => void
}

export default function EventModal({ isOpen, onClose, event, onSuccess }: EventModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    image: event?.image || "",
    imageFile: null as File | null,
    imagePreview: event?.image || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    spots: event?.spots || 20,
  })

  // Track if the image has been changed
  const [imageChanged, setImageChanged] = useState(false)

  // For time input
  const [timeInput, setTimeInput] = useState("")

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        image: event.image || "",
        imageFile: null,
        imagePreview: event.image || "",
        date: event.date || "",
        time: event.time || "",
        location: event.location || "",
        spots: event.spots || 20,
      })

      // Reset image changed flag when editing a different event
      setImageChanged(false)

      // Parse the time from "12:00 PM" format to "12:00" for the time input
      let timeValue = ""
      if (event.time) {
        const timeParts = event.time.match(/(\d+):(\d+)\s*(AM|PM)/)
        if (timeParts) {
          let hours = Number.parseInt(timeParts[1], 10)
          const minutes = timeParts[2]
          const ampm = timeParts[3]

          // Convert to 24-hour format for the input
          if (ampm === "PM" && hours < 12) hours += 12
          if (ampm === "AM" && hours === 12) hours = 0

          timeValue = `${hours.toString().padStart(2, "0")}:${minutes}`
        }
      }
      setTimeInput(timeValue)
    } else {
      // Reset form for new event
      setFormData({
        title: "",
        description: "",
        image: "",
        imageFile: null,
        imagePreview: "",
        date: "",
        time: "",
        location: "",
        spots: 20,
      })
      setImageChanged(false)
      setTimeInput("")
    }
  }, [event, isOpen])

  const imageInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!event

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageFile: file,
          imagePreview: reader.result as string,
          // Clear the image URL since we're using a file now
          image: "",
        })
        setImageChanged(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
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

      // Only upload new image if provided and changed
      if (formData.imageFile && imageChanged) {
        try {
          const uploadedUrl = await EventService.uploadEventImage(formData.imageFile)
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

          // If we're editing and replacing an image, delete the old one
          if (
            isEditing &&
            event?.image &&
            (event.image.includes("storage.googleapis.com") || event.image.includes("supabase"))
          ) {
            try {
              await EventService.deleteEventImage(event.image)
            } catch (deleteError) {
              console.error("Failed to delete old image:", deleteError)
              // Continue even if deletion fails
            }
          }
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
      } else if (formData.image !== event?.image) {
        // If URL was changed but no file was uploaded
        setImageChanged(true)
      }

      // Calculate if the event is in the past
      const eventDate = new Date(formData.date)
      const isPast = eventDate < new Date()

      if (isEditing && event) {
        await EventService.update(event.id, {
          title: formData.title,
          description: formData.description,
          // Only update image if it changed
          ...(imageChanged ? { image: imageUrl } : {}),
          date: formData.date,
          time: formData.time,
          location: formData.location,
          spots: formData.spots,
          is_past: isPast,
        })
      } else {
        await EventService.create({
          title: formData.title,
          description: formData.description,
          image: imageUrl,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          spots: formData.spots,
          is_past: isPast,
        })
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving event:", error)
      toast({
        title: "Error",
        description: "Failed to save event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Format date for input
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return ""

    try {
      // Try to parse the date string
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ""

      // Format as YYYY-MM-DD
      return date.toISOString().split("T")[0]
    } catch (error) {
      console.error("Error formatting date:", error)
      return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              Title*
            </Label>
            <Input
              id="eventTitle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="eventDescription" className="text-right pt-2">
              Description*
            </Label>
            <Textarea
              id="eventDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="col-span-3"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Event Image</Label>
            <div className="col-span-3">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="eventImageUpload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {formData.imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={formData.imagePreview || "/placeholder.svg?height=160&width=240"}
                        alt="Preview"
                        fill
                        className="object-contain p-2"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setFormData({ ...formData, imageFile: null, imagePreview: "", image: "" })
                          setImageChanged(true)
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
                      <p className="text-xs text-gray-500">PNG, JPG or WEBP (Optional)</p>
                    </div>
                  )}
                  <input
                    id="eventImageUpload"
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
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value, imageFile: null })
                    // Mark as changed if the URL is different from the original
                    if (e.target.value !== event?.image) {
                      setImageChanged(true)
                    }
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventDate" className="text-right">
              Date*
            </Label>
            <Input
              id="eventDate"
              type="date"
              value={formatDateForInput(formData.date)}
              onChange={(e) => {
                const selectedDate = e.target.value
                if (selectedDate) {
                  const date = new Date(selectedDate)
                  const formattedDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  setFormData({ ...formData, date: formattedDate })
                }
              }}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventTime" className="text-right">
              Time*
            </Label>
            <Input
              id="eventTime"
              type="time"
              value={timeInput}
              onChange={(e) => {
                const timeValue = e.target.value
                setTimeInput(timeValue)

                if (timeValue) {
                  // Convert 24-hour format to 12-hour format with AM/PM
                  const [hours24, minutes] = timeValue.split(":")
                  const hours = Number.parseInt(hours24, 10)
                  const ampm = hours >= 12 ? "PM" : "AM"
                  const hours12 = hours % 12 || 12
                  const formattedTime = `${hours12}:${minutes} ${ampm}`
                  setFormData({ ...formData, time: formattedTime })
                }
              }}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventLocation" className="text-right">
              Location*
            </Label>
            <Input
              id="eventLocation"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventSpots" className="text-right">
              Available Spots
            </Label>
            <Input
              id="eventSpots"
              type="number"
              value={formData.spots.toString()}
              onChange={(e) => setFormData({ ...formData, spots: Number.parseInt(e.target.value) || 0 })}
              className="col-span-3"
            />
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
