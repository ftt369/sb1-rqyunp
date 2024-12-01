export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cases: {
        Row: {
          id: string
          created_at: string
          title: string
          client_id: string
          type: string
          status: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          client_id: string
          type: string
          status?: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          client_id?: string
          type?: string
          status?: string
          description?: string | null
        }
      }
      clients: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          location: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          location: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          location?: string
          status?: string
        }
      }
      documents: {
        Row: {
          id: string
          created_at: string
          name: string
          case_id: string
          size: number
          type: string
          url: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          case_id: string
          size: number
          type: string
          url: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          case_id?: string
          size?: number
          type?: string
          url?: string
        }
      }
    }
  }
}