import { supabase } from "../supabase"
import { supabaseAdmin } from "../supabase-admin"

export const AuthService = {
  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      return true
    } catch (error: any) {
      console.error("Error signing in:", error.message)
      throw error
    }
  },

  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error("Error signing out:", error.message)
      throw error
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const { data } = await supabase.auth.getSession()
      return !!data.session
    } catch (error) {
      console.error("Error checking authentication:", error)
      return false
    }
  },

  async getCurrentUser() {
    try {
      const { data } = await supabase.auth.getUser()
      return data.user
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  },

  async createUser(email: string, password: string, userData = {}): Promise<any> {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: userData,
      })

      if (error) {
        throw error
      }

      return data.user
    } catch (error: any) {
      console.error("Error creating user:", error.message)
      throw error
    }
  },

  async deleteUser(userId: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

      if (error) {
        throw error
      }

      return true
    } catch (error: any) {
      console.error("Error deleting user:", error.message)
      throw error
    }
  },

  async listUsers(): Promise<any[]> {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers()

      if (error) {
        throw error
      }

      return data.users
    } catch (error: any) {
      console.error("Error listing users:", error.message)
      throw error
    }
  },
}
