export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string;
          created_at: string | null;
          guests: number;
          id: string;
          payment_status: string;
          product_pricing_id: string | null;
          product_supplier_id: string;
          status: string;
          total_price: number;
          user_id: string;
        };
        Insert: {
          booking_date: string;
          created_at?: string | null;
          guests?: number;
          id?: string;
          payment_status?: string;
          product_pricing_id?: string | null;
          product_supplier_id: string;
          status?: string;
          total_price: number;
          user_id: string;
        };
        Update: {
          booking_date?: string;
          created_at?: string | null;
          guests?: number;
          id?: string;
          payment_status?: string;
          product_pricing_id?: string | null;
          product_supplier_id?: string;
          status?: string;
          total_price?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_booking_pricing_supplier_safe";
            columns: ["product_pricing_id", "product_supplier_id"];
            isOneToOne: false;
            referencedRelation: "product_pricing";
            referencedColumns: ["id", "product_supplier_id"];
          },
          {
            foreignKeyName: "fk_booking_product_supplier";
            columns: ["product_supplier_id"];
            isOneToOne: false;
            referencedRelation: "product_suppliers";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string | null;
          id: string;
          image_url: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          image_url: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          image_url?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      destinations: {
        Row: {
          created_at: string | null;
          description: string | null;
          hero_image: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          hero_image?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          hero_image?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string | null;
          id: string;
          is_read: boolean | null;
          message: string;
          title: string;
          type: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_read?: boolean | null;
          message: string;
          title: string;
          type?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_read?: boolean | null;
          message?: string;
          title?: string;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      partners_applications: {
        Row: {
          company_name: string;
          created_at: string;
          description: string | null;
          email: string;
          emirate: string | null;
          experience_types: string | null;
          first_name: string;
          id: string;
          last_name: string;
          partner_type: string | null;
          phone: string | null;
          source: string;
          status: string;
          website: string;
        };
        Insert: {
          company_name: string;
          created_at?: string;
          description?: string | null;
          email: string;
          emirate?: string | null;
          experience_types?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          partner_type?: string | null;
          phone?: string | null;
          source?: string;
          status?: string;
          website: string;
        };
        Update: {
          company_name?: string;
          created_at?: string;
          description?: string | null;
          email?: string;
          emirate?: string | null;
          experience_types?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          partner_type?: string | null;
          phone?: string | null;
          source?: string;
          status?: string;
          website?: string;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          created_at: string | null;
          id: string;
          image_url: string;
          position: number;
          product_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          image_url: string;
          position: number;
          product_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          image_url?: string;
          position?: number;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_fk";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_pricing: {
        Row: {
          created_at: string | null;
          duration_minutes: number;
          id: string;
          is_active: boolean | null;
          original_price: number | null;
          pax: number;
          price: number;
          product_supplier_id: string;
        };
        Insert: {
          created_at?: string | null;
          duration_minutes: number;
          id?: string;
          is_active?: boolean | null;
          original_price?: number | null;
          pax?: number;
          price: number;
          product_supplier_id: string;
        };
        Update: {
          created_at?: string | null;
          duration_minutes?: number;
          id?: string;
          is_active?: boolean | null;
          original_price?: number | null;
          pax?: number;
          price?: number;
          product_supplier_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_pricing_product_supplier";
            columns: ["product_supplier_id"];
            isOneToOne: false;
            referencedRelation: "product_suppliers";
            referencedColumns: ["id"];
          },
        ];
      };
      product_suppliers: {
        Row: {
          commission_percent: number | null;
          created_at: string;
          display_title: string | null;
          id: string;
          is_active: boolean;
          location: string | null;
          price: number;
          product_id: string;
          specific_meeting_point: string | null;
          supplier_id: string;
          thumbnail_url: string | null;
          updated_at: string;
          variant_description: string | null;
        };
        Insert: {
          commission_percent?: number | null;
          created_at?: string;
          display_title?: string | null;
          id?: string;
          is_active?: boolean;
          location?: string | null;
          price: number;
          product_id: string;
          specific_meeting_point?: string | null;
          supplier_id: string;
          thumbnail_url?: string | null;
          updated_at?: string;
          variant_description?: string | null;
        };
        Update: {
          commission_percent?: number | null;
          created_at?: string;
          display_title?: string | null;
          id?: string;
          is_active?: boolean;
          location?: string | null;
          price?: number;
          product_id?: string;
          specific_meeting_point?: string | null;
          supplier_id?: string;
          thumbnail_url?: string | null;
          updated_at?: string;
          variant_description?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_product";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_supplier";
            columns: ["supplier_id"];
            isOneToOne: false;
            referencedRelation: "suppliers";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          badge: string | null;
          cancellation_policy: string | null;
          category_id: string | null;
          confirmation_hours: number;
          created_at: string;
          destination_id: string | null;
          facilities: string[] | null;
          highlights: string[];
          id: string;
          is_refundable: boolean;
          location: string | null;
          max_people: number | null;
          maxPeople: number;
          metadata: Json | null;
          mobile_ticket: boolean;
          overview: string | null;
          product_type: string;
          rating: number;
          review_count: number;
          search_vector: unknown;
          slug: string;
          subtitle: string | null;
          thumbnail_url: string | null;
          title: string;
          what_to_bring: string[];
        };
        Insert: {
          badge?: string | null;
          cancellation_policy?: string | null;
          category_id?: string | null;
          confirmation_hours?: number;
          created_at?: string;
          destination_id?: string | null;
          facilities?: string[] | null;
          highlights?: string[];
          id?: string;
          is_refundable?: boolean;
          location?: string | null;
          max_people?: number | null;
          maxPeople?: number;
          metadata?: Json | null;
          mobile_ticket?: boolean;
          overview?: string | null;
          product_type?: string;
          rating?: number;
          review_count?: number;
          search_vector?: unknown;
          slug: string;
          subtitle?: string | null;
          thumbnail_url?: string | null;
          title: string;
          what_to_bring?: string[];
        };
        Update: {
          badge?: string | null;
          cancellation_policy?: string | null;
          category_id?: string | null;
          confirmation_hours?: number;
          created_at?: string;
          destination_id?: string | null;
          facilities?: string[] | null;
          highlights?: string[];
          id?: string;
          is_refundable?: boolean;
          location?: string | null;
          max_people?: number | null;
          maxPeople?: number;
          metadata?: Json | null;
          mobile_ticket?: boolean;
          overview?: string | null;
          product_type?: string;
          rating?: number;
          review_count?: number;
          search_vector?: unknown;
          slug?: string;
          subtitle?: string | null;
          thumbnail_url?: string | null;
          title?: string;
          what_to_bring?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "fk_products_category";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_destination_id_fkey";
            columns: ["destination_id"];
            isOneToOne: false;
            referencedRelation: "destinations";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          full_name: string | null;
          id: string;
          phone: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      promotions: {
        Row: {
          code: string;
          created_at: string | null;
          discount_type: string;
          discount_value: number;
          id: string;
          is_active: boolean | null;
          max_uses: number | null;
          min_order_value: number | null;
          used_count: number | null;
          valid_from: string;
          valid_until: string;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          discount_type: string;
          discount_value: number;
          id?: string;
          is_active?: boolean | null;
          max_uses?: number | null;
          min_order_value?: number | null;
          used_count?: number | null;
          valid_from: string;
          valid_until: string;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          discount_type?: string;
          discount_value?: number;
          id?: string;
          is_active?: boolean | null;
          max_uses?: number | null;
          min_order_value?: number | null;
          used_count?: number | null;
          valid_from?: string;
          valid_until?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          body: string;
          booking_id: string | null;
          created_at: string | null;
          id: string;
          is_published: boolean | null;
          is_verified_purchase: boolean | null;
          product_id: string;
          rating: number;
          title: string | null;
          user_id: string;
        };
        Insert: {
          body: string;
          booking_id?: string | null;
          created_at?: string | null;
          id?: string;
          is_published?: boolean | null;
          is_verified_purchase?: boolean | null;
          product_id: string;
          rating: number;
          title?: string | null;
          user_id: string;
        };
        Update: {
          body?: string;
          booking_id?: string | null;
          created_at?: string | null;
          id?: string;
          is_published?: boolean | null;
          is_verified_purchase?: boolean | null;
          product_id?: string;
          rating?: number;
          title?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      seo_meta: {
        Row: {
          created_at: string | null;
          id: string;
          meta_description: string | null;
          meta_title: string | null;
          page_slug: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          meta_description?: string | null;
          meta_title?: string | null;
          page_slug: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          meta_description?: string | null;
          meta_title?: string | null;
          page_slug?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          hero_image: string | null;
          hero_subtitle: string | null;
          hero_title: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          hero_image?: string | null;
          hero_subtitle?: string | null;
          hero_title?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Update: {
          hero_image?: string | null;
          hero_subtitle?: string | null;
          hero_title?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      suppliers: {
        Row: {
          code: string;
          contact_email: string | null;
          contact_phone: string | null;
          created_at: string | null;
          id: string;
          name: string;
        };
        Insert: {
          code: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_at?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          code?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      wishlist: {
        Row: {
          created_at: string | null;
          id: string;
          product_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          product_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          product_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wishlist_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      booking_status_enum: "pending" | "confirmed" | "cancelled" | "completed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      booking_status_enum: ["pending", "confirmed", "cancelled", "completed"],
    },
  },
} as const;
