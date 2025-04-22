import { supabase } from "../supabase"
import type { Database } from "../database.types"

export type FaqItem = Database["public"]["Tables"]["faq_items"]["Row"]
export type FaqItemInsert = Database["public"]["Tables"]["faq_items"]["Insert"]
export type FaqItemUpdate = Database["public"]["Tables"]["faq_items"]["Update"]

export const FaqService = {
  async getAll(): Promise<FaqItem[]> {
    const { data, error } = await supabase.from("faq_items").select("*").order("id", { ascending: true })

    if (error) {
      console.error("Error fetching FAQ items:", error)
      return []
    }

    return data || []
  },

  async getById(id: number): Promise<FaqItem | null> {
    const { data, error } = await supabase.from("faq_items").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching FAQ item with id ${id}:`, error)
      return null
    }

    return data
  },

  async create(faqItem: FaqItemInsert): Promise<FaqItem | null> {
    const { data, error } = await supabase
      .from("faq_items")
      .insert([
        {
          ...faqItem,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating FAQ item:", error)
      return null
    }

    return data
  },

  async update(id: number, faqItem: FaqItemUpdate): Promise<FaqItem | null> {
    const { data, error } = await supabase
      .from("faq_items")
      .update({
        ...faqItem,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating FAQ item with id ${id}:`, error)
      return null
    }

    return data
  },

  async delete(id: number): Promise<boolean> {
    const { error } = await supabase.from("faq_items").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting FAQ item with id ${id}:`, error)
      return false
    }

    return true
  },
}
