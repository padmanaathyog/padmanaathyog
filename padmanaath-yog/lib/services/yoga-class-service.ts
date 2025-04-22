import { supabase } from "../supabase"
import type { Database } from "../database.types"

export type YogaClass = Database["public"]["Tables"]["yoga_classes"]["Row"]
export type YogaClassInsert = Database["public"]["Tables"]["yoga_classes"]["Insert"]
export type YogaClassUpdate = Database["public"]["Tables"]["yoga_classes"]["Update"]

export const YogaClassService = {
  async getAll(): Promise<YogaClass[]> {
    const { data, error } = await supabase.from("yoga_classes").select("*").order("id", { ascending: true })

    if (error) {
      console.error("Error fetching yoga classes:", error)
      return []
    }

    return data || []
  },

  async getById(id: number): Promise<YogaClass | null> {
    const { data, error } = await supabase.from("yoga_classes").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching yoga class with id ${id}:`, error)
      return null
    }

    return data
  },

  async create(yogaClass: YogaClassInsert): Promise<YogaClass | null> {
    const { data, error } = await supabase
      .from("yoga_classes")
      .insert([
        {
          ...yogaClass,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating yoga class:", error)
      return null
    }

    return data
  },

  async update(id: number, yogaClass: YogaClassUpdate): Promise<YogaClass | null> {
    const { data, error } = await supabase
      .from("yoga_classes")
      .update({
        ...yogaClass,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating yoga class with id ${id}:`, error)
      return null
    }

    return data
  },

  async delete(id: number): Promise<boolean> {
    const { error } = await supabase.from("yoga_classes").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting yoga class with id ${id}:`, error)
      return false
    }

    return true
  },
}
