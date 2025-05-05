export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      testimonials: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          name: string
          role: string
          quote: string
          image: string
          rating: number
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          name: string
          role: string
          quote: string
          image: string
          rating: number
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          name?: string
          role?: string
          quote?: string
          image?: string
          rating?: number
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          title: string
          description: string
          url: string
          category: string
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          title: string
          description: string
          url: string
          category?: string
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          url?: string
          category?: string
        }
        Relationships: []
      }
      gallery_videos: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          title: string
          description: string
          url: string
          thumbnail: string
          duration: string
          category: string
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          title: string
          description: string
          url: string
          thumbnail: string
          duration: string
          category: string
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          url?: string
          thumbnail?: string
          duration?: string
          category?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          title: string
          description: string
          image: string
          date: string
          time: string
          location: string
          spots: number
          is_past: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          title: string
          description: string
          image: string
          date: string
          time: string
          location: string
          spots: number
          is_past?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          image?: string
          date?: string
          time?: string
          location?: string
          spots?: number
          is_past?: boolean
        }
        Relationships: []
      }
      yoga_classes: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          title: string
          description: string
          image: string
          duration: string
          level: string
          instructor: string
          category: string
          slug: string
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          title: string
          description: string
          image: string
          duration: string
          level: string
          instructor: string
          category: string
          slug: string
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          image?: string
          duration?: string
          level?: string
          instructor?: string
          category?: string
          slug?: string
        }
        Relationships: []
      }
      blog_external_refs: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          external_id: string
          title: string
          excerpt: string
          image: string
          author: string
          date: string
          slug: string
          provider: string
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          external_id: string
          title: string
          excerpt: string
          image: string
          author: string
          date: string
          slug: string
          provider: string
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          external_id?: string
          title?: string
          excerpt?: string
          image?: string
          author?: string
          date?: string
          slug?: string
          provider?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type Insertable<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type Updatable<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]
