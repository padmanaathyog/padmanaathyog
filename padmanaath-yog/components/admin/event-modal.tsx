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
  DialogDescription,
  DialogFooter,
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

  const [imageChanged, setImageChanged] = useState(false)
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

      setImageChanged(false)

      let timeValue = ""
      if (event.time) {
        const timeParts = event.time.match(/(\d+):(\d+)\s*(AM|PM)/)
        if (timeParts) {
          let hours = Number.parseInt(timeParts[1], 10)
          const minutes = timeParts[2]
          const ampm = timeParts[3]

          if (ampm === "PM" && hours < 12) hours += 12
          if (ampm === "AM" && hours === 12) hours = 0

          timeValue = `${hours.toString().padStart(2, "0")}:${minutes}`
        }
      }
      setTimeInput(timeValue)
    } else {
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
        description: "Please fill in all required fields (Title, Description, Date, Time, and Location).",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      let imageUrl = formData.image

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

          if (
            isEditing &&
            event?.image &&
            (event.image.includes("storage.googleapis.com") || event.image.includes("supabase"))
          ) {
            try {
              await EventService.deleteEventImage(event.image)
            } catch (deleteError) {
              console.error("Failed to delete old image:", deleteError)
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
        setImageChanged(true)
      }

      const now = new Date()
      now.setHours(0, 0, 0, 0)

      const eventDate = new Date(formData.date)
      eventDate.setHours(0, 0, 0, 0)

      const isPast = eventDate < now

      if (isEditing && event) {
        await EventService.update(event.id, {
          title: formData.title,
          description: formData.description,
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

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ""

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
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter event description"
            />
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => imageInputRef.current?.click()}
                // leftIcon={<Upload />}
              >
                Upload Image
              </Button>
              {formData.imagePreview && (
                <div className="relative w-16 h-16">
                  <Image
                    src={formData.imagePreview}
                    alt="Event image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <Button
                    variant="ghost"
                    className="absolute top-0 right-0 p-1"
                    onClick={() => setFormData({ ...formData, imagePreview: "", image: "", imageFile: null })}
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="date">Event Date</Label>
            <Input
              id="date"
              type="date"
              value={formatDateForInput(formData.date)}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="time">Event Time</Label>
            <Input
              id="time"
              type="time"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              onBlur={() => setFormData({ ...formData, time: timeInput })}
            />
          </div>

          <div>
            <Label htmlFor="location">Event Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter event location"
            />
          </div>

          <div>
            <Label htmlFor="spots">Available Spots</Label>
            <Input
              id="spots"
              type="number"
              min={1}
              value={formData.spots}
              onChange={(e) => setFormData({ ...formData, spots: Math.max(1, Number(e.target.value)) })}
              placeholder="Enter number of available spots"
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
