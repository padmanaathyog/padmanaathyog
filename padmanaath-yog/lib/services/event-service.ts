import { supabase } from "../supabase"
import type { Database } from "../database.types"
import { StorageService } from "./storage-service"
import { toast } from "@/hooks/use-toast"

export type Event = Database["public"]["Tables"]["events"]["Row"]
export type EventInsert = Database["public"]["Tables"]["events"]["Insert"]
export type EventUpdate = Database["public"]["Tables"]["events"]["Update"]

export const EventService = {
  async getAll(page = 1, pageSize = 9): Promise<{ data: Event[]; count: number }> {
    try {
      // Calculate pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Get count for pagination
      const { count, error: countError } = await supabase.from("events").select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error counting events:", countError)
        throw new Error(`Failed to count events: ${countError.message}`)
      }

      // Get paginated data
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .range(from, to)

      if (error) {
        console.error("Error fetching events:", error)
        throw new Error(`Failed to fetch events: ${error.message}`)
      }

      return {
        data: data || [],
        count: count || 0,
      }
    } catch (error) {
      console.error("Error in getAll events:", error)
      throw error
    }
  },

  async getUpcomingEvents(page = 1, pageSize = 6): Promise<{ data: Event[]; count: number }> {
    try {
      // Calculate pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Get count for pagination
      const { count, error: countError } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .eq("is_past", false)

      if (countError) {
        console.error("Error counting upcoming events:", countError)
        throw new Error(`Failed to count upcoming events: ${countError.message}`)
      }

      // Get paginated data
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_past", false)
        .order("date", { ascending: true })
        .range(from, to)

      if (error) {
        console.error("Error fetching upcoming events:", error)
        throw new Error(`Failed to fetch upcoming events: ${error.message}`)
      }

      return {
        data: data || [],
        count: count || 0,
      }
    } catch (error) {
      console.error("Error in getUpcomingEvents:", error)
      throw error
    }
  },
   
  async getPastEvents(page = 1, pageSize = 6): Promise<{ data: Event[]; count: number }> {
    try {
      // Calculate pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Get count for pagination
      const { count, error: countError } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .eq("is_past", true)

      if (countError) {
        console.error("Error counting past events:", countError)
        throw new Error(`Failed to count past events: ${countError.message}`)
      }

      // Get paginated data
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_past", true)
        .order("date", { ascending: false })
        .range(from, to)

      if (error) {
        console.error("Error fetching past events:", error)
        throw new Error(`Failed to fetch past events: ${error.message}`)
      }

      return {
        data: data || [],
        count: count || 0,
      }
    } catch (error) {
      console.error("Error in getPastEvents:", error)
      throw error
    }
  },
  

  async getById(id: number): Promise<Event | null> {
    try {
      const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

      if (error) {
        if (error.code === "PGRST116") {
          // PGRST116 is the error code for "no rows returned"
          return null
        }
        console.error(`Error fetching event with id ${id}:`, error)
        throw new Error(`Failed to fetch event: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error in getById for event ${id}:`, error)
      throw error
    }
  },

  async create(event: EventInsert): Promise<Event | null> {
    try {
      // Determine if the event is in the past
      const eventDate = new Date(event.date)
      const isPast = eventDate < new Date()

      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            ...event,
            is_past: isPast,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error creating event:", error)
        toast({
          title: "Error",
          description: `Failed to create event: ${error.message}`,
          variant: "destructive",
        })
        throw new Error(`Failed to create event: ${error.message}`)
      }

      toast({
        title: "Success",
        description: "Event created successfully!",
      })
      return data
    } catch (error) {
      console.error("Error in create event:", error)
      throw error
    }
  },

  async update(id: number, event: EventUpdate): Promise<Event | null> {
    try {
      // If date is being updated, determine if the event is in the past
      let isPast = undefined
      if (event.date) {
        const eventDate = new Date(event.date)
        isPast = eventDate < new Date()
      }

      const { data, error } = await supabase
        .from("events")
        .update({
          ...event,
          is_past: isPast,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error(`Error updating event with id ${id}:`, error)
        toast({
          title: "Error",
          description: `Failed to update event: ${error.message}`,
          variant: "destructive",
        })
        throw new Error(`Failed to update event: ${error.message}`)
      }

      toast({
        title: "Success",
        description: "Event updated successfully!",
      })
      return data
    } catch (error) {
      console.error(`Error in update for event ${id}:`, error)
      throw error
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      // First, get the event to check if it has an image
      const { data: event, error: fetchError } = await supabase.from("events").select("image").eq("id", id).single()

      if (fetchError) {
        console.error(`Error fetching event with id ${id}:`, fetchError)
        toast({
          title: "Error",
          description: `Failed to fetch event: ${fetchError.message}`,
          variant: "destructive",
        })
        throw new Error(`Failed to fetch event: ${fetchError.message}`)
      }

      // Delete the event
      const { error } = await supabase.from("events").delete().eq("id", id)

      if (error) {
        console.error(`Error deleting event with id ${id}:`, error)
        toast({
          title: "Error",
          description: `Failed to delete event: ${error.message}`,
          variant: "destructive",
        })
        throw new Error(`Failed to delete event: ${error.message}`)
      }

      // If the event had an image stored in Supabase, delete it
      if (
        event &&
        event.image &&
        (event.image.includes("storage.googleapis.com") || event.image.includes("supabase"))
      ) {
        try {
          const deleted = await StorageService.deleteImage(event.image)
          if (!deleted) {
            console.warn(`Failed to delete image for event ${id}, but event was deleted successfully`)
          } else {
            console.log(`Successfully deleted image for event ${id}`)
          }
        } catch (imageError) {
          console.error(`Error deleting event image:`, imageError)
          // Continue even if image deletion fails
        }
      }

      toast({
        title: "Success",
        description: "Event deleted successfully!",
      })
      return true
    } catch (error) {
      console.error(`Error in delete for event ${id}:`, error)
      throw error
    }
  },

  async uploadEventImage(file: File): Promise<string | null> {
    try {
      const imageUrl = await StorageService.uploadImage(file)
      if (!imageUrl) {
        toast({
          title: "Upload Failed",
          description: "Failed to upload event image. Please try again.",
          variant: "destructive",
        })
        return null
      }
      return imageUrl
    } catch (error) {
      console.error("Error uploading event image:", error)
      toast({
        title: "Upload Error",
        description: "An unexpected error occurred during image upload.",
        variant: "destructive",
      })
      return null
    }
  },

  async deleteEventImage(imageUrl: string): Promise<boolean> {
    if (!imageUrl) return true

    try {
      const deleted = await StorageService.deleteImage(imageUrl)
      if (!deleted) {
        toast({
          title: "Deletion Error",
          description: "Failed to delete event image from storage.",
          variant: "destructive",
        })
        return false
      }
      return true
    } catch (error) {
      console.error("Error in deleteEventImage:", error)
      toast({
        title: "Deletion Error",
        description: "An unexpected error occurred while deleting the image.",
        variant: "destructive",
      })
      return false
    }
  },
  async updatePastStatus(): Promise<void> {
    try {
      const today = new Date().toISOString();
  
      const { error } = await supabase
        .from("events")
        .update({
          is_past: true,
          updated_at: new Date().toISOString(),
        })
        .lt("date", today)       // Only where date is in the past
        .eq("is_past", false);   // And not already marked as past
  
      if (error) {
        console.error("Error updating past statuses:", error);
        throw new Error(`Failed to update past statuses: ${error.message}`);
      }
    } catch (error) {
      console.error("Error in updatePastStatus:", error);
      throw error;
    }
  }
  
  }
