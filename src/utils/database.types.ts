export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _attachments: {
        Row: {
          created_at: string
          id: string
          item_id: string | null
          media_id: string | null
          organization_id: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          item_id?: string | null
          media_id?: string | null
          organization_id?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string | null
          media_id?: string | null
          organization_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public__attachments_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public__attachments_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public__attachments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      _collaborators: {
        Row: {
          collection_id: string | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_collaborators_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_collaborators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      _collections: {
        Row: {
          description: string | null
          id: string
          name: string
          name_singular: string | null
          organization_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          name_singular?: string | null
          organization_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          name_singular?: string | null
          organization_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_collections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      _custom_fields: {
        Row: {
          collection_id: string | null
          id: string
          name: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          collection_id?: string | null
          id?: string
          name?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          collection_id?: string | null
          id?: string
          name?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_custom_fields_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_custom_fields_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      _custom_fields_data: {
        Row: {
          custom_field_id: string | null
          id: string
          item_id: string | null
          user_id: string | null
          value: string | null
        }
        Insert: {
          custom_field_id?: string | null
          id?: string
          item_id?: string | null
          user_id?: string | null
          value?: string | null
        }
        Update: {
          custom_field_id?: string | null
          id?: string
          item_id?: string | null
          user_id?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_custom_fields_data_custom_field_id_fkey"
            columns: ["custom_field_id"]
            isOneToOne: false
            referencedRelation: "_custom_fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_custom_fields_data_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_custom_fields_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      _invites: {
        Row: {
          accepted: boolean | null
          id: string
          user_email: string | null
        }
        Insert: {
          accepted?: boolean | null
          id?: string
          user_email?: string | null
        }
        Update: {
          accepted?: boolean | null
          id?: string
          user_email?: string | null
        }
        Relationships: []
      }
      _item_labels: {
        Row: {
          id: number
          item_id: string
          label_id: string
        }
        Insert: {
          id?: number
          item_id: string
          label_id: string
        }
        Update: {
          id?: number
          item_id?: string
          label_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "_item_labels_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_item_labels_label_id_fkey"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "_labels"
            referencedColumns: ["id"]
          },
        ]
      }
      _items: {
        Row: {
          _attachment: string | null
          _media: string | null
          attachment: string | null
          collection_id: string | null
          content: string | null
          content_type: string | null
          created_at: string
          deleted_at: string | null
          id: string
          is_deleted: boolean
          parent_item: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          _attachment?: string | null
          _media?: string | null
          attachment?: string | null
          collection_id?: string | null
          content?: string | null
          content_type?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean
          parent_item?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          _attachment?: string | null
          _media?: string | null
          attachment?: string | null
          collection_id?: string | null
          content?: string | null
          content_type?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean
          parent_item?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_items_parent_item_fkey"
            columns: ["parent_item"]
            isOneToOne: false
            referencedRelation: "_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public__items__media_fkey"
            columns: ["_media"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
        ]
      }
      _labels: {
        Row: {
          description: string | null
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          name?: string
          user_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_labels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      _members: {
        Row: {
          id: number
          organization_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: number
          organization_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: number
          organization_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public__members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      _organizations: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
