export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          actor_id: string | null
          category: string
          created_at: string
          details: Json
          id: string
          study_id: string | null
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          category: string
          created_at?: string
          details?: Json
          id?: string
          study_id?: string | null
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          category?: string
          created_at?: string
          details?: Json
          id?: string
          study_id?: string | null
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "studies"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_testers: {
        Row: {
          account_configuration: Json
          assigned_by: string | null
          assignment_id: string
          created_at: string
          id: string
          platform_service_id: string | null
          slot: Database["public"]["Enums"]["tester_slot"]
          status: Database["public"]["Enums"]["assignment_tester_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          account_configuration?: Json
          assigned_by?: string | null
          assignment_id: string
          created_at?: string
          id?: string
          platform_service_id?: string | null
          slot: Database["public"]["Enums"]["tester_slot"]
          status?: Database["public"]["Enums"]["assignment_tester_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          account_configuration?: Json
          assigned_by?: string | null
          assignment_id?: string
          created_at?: string
          id?: string
          platform_service_id?: string | null
          slot?: Database["public"]["Enums"]["tester_slot"]
          status?: Database["public"]["Enums"]["assignment_tester_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_testers_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_testers_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_testers_platform_service_id_fkey"
            columns: ["platform_service_id"]
            isOneToOne: false
            referencedRelation: "platform_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_testers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          assignment_code: string
          created_at: string
          created_by: string | null
          destination_location: string
          id: string
          instructions: Json
          isolated_variable: string
          pickup_location: string
          protocol_id: string
          scheduled_end: string | null
          scheduled_start: string | null
          status: Database["public"]["Enums"]["assignment_status"]
          study_id: string
          updated_at: string
        }
        Insert: {
          assignment_code: string
          created_at?: string
          created_by?: string | null
          destination_location: string
          id?: string
          instructions?: Json
          isolated_variable: string
          pickup_location: string
          protocol_id: string
          scheduled_end?: string | null
          scheduled_start?: string | null
          status?: Database["public"]["Enums"]["assignment_status"]
          study_id: string
          updated_at?: string
        }
        Update: {
          assignment_code?: string
          created_at?: string
          created_by?: string | null
          destination_location?: string
          id?: string
          instructions?: Json
          isolated_variable?: string
          pickup_location?: string
          protocol_id?: string
          scheduled_end?: string | null
          scheduled_start?: string | null
          status?: Database["public"]["Enums"]["assignment_status"]
          study_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_protocol_id_study_id_fkey"
            columns: ["protocol_id", "study_id"]
            isOneToOne: false
            referencedRelation: "protocols"
            referencedColumns: ["id", "study_id"]
          },
          {
            foreignKeyName: "assignments_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "studies"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_files: {
        Row: {
          assignment_id: string
          captured_at: string | null
          created_at: string
          evidence_code: string | null
          evidence_type: string
          id: string
          integrity_status: Database["public"]["Enums"]["evidence_integrity_status"]
          metadata: Json
          mime_type: string
          original_filename: string
          sha256: string | null
          size_bytes: number
          storage_bucket: string
          storage_path: string
          study_id: string
          submission_id: string
          updated_at: string
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          assignment_id: string
          captured_at?: string | null
          created_at?: string
          evidence_code?: string | null
          evidence_type: string
          id?: string
          integrity_status?: Database["public"]["Enums"]["evidence_integrity_status"]
          metadata?: Json
          mime_type: string
          original_filename: string
          sha256?: string | null
          size_bytes: number
          storage_bucket?: string
          storage_path: string
          study_id: string
          submission_id: string
          updated_at?: string
          uploaded_at?: string
          uploaded_by: string
        }
        Update: {
          assignment_id?: string
          captured_at?: string | null
          created_at?: string
          evidence_code?: string | null
          evidence_type?: string
          id?: string
          integrity_status?: Database["public"]["Enums"]["evidence_integrity_status"]
          metadata?: Json
          mime_type?: string
          original_filename?: string
          sha256?: string | null
          size_bytes?: number
          storage_bucket?: string
          storage_path?: string
          study_id?: string
          submission_id?: string
          updated_at?: string
          uploaded_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_files_submission_id_study_id_assignment_id_fkey"
            columns: ["submission_id", "study_id", "assignment_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id", "study_id", "assignment_id"]
          },
          {
            foreignKeyName: "evidence_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_reviews: {
        Row: {
          created_at: string
          decided_at: string | null
          id: string
          matched_pair_id: string
          note: string | null
          reason: string | null
          reviewer_id: string
          status: Database["public"]["Enums"]["review_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          id?: string
          matched_pair_id: string
          note?: string | null
          reason?: string | null
          reviewer_id: string
          status?: Database["public"]["Enums"]["review_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          id?: string
          matched_pair_id?: string
          note?: string | null
          reason?: string | null
          reviewer_id?: string
          status?: Database["public"]["Enums"]["review_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_reviews_matched_pair_id_fkey"
            columns: ["matched_pair_id"]
            isOneToOne: false
            referencedRelation: "matched_pairs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expert_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matched_pairs: {
        Row: {
          absolute_fare_difference: number | null
          assignment_id: string
          created_at: string
          evidence_status: Database["public"]["Enums"]["evidence_integrity_status"]
          gps_distance_feet: number | null
          higher_priced_slot: Database["public"]["Enums"]["tester_slot"] | null
          id: string
          pair_code: string
          paired_at: string | null
          percentage_fare_difference: number | null
          study_id: string
          submission_a_id: string
          submission_b_id: string
          technical_status: Database["public"]["Enums"]["pair_validation_status"]
          timestamp_difference_seconds: number | null
          updated_at: string
        }
        Insert: {
          absolute_fare_difference?: number | null
          assignment_id: string
          created_at?: string
          evidence_status?: Database["public"]["Enums"]["evidence_integrity_status"]
          gps_distance_feet?: number | null
          higher_priced_slot?: Database["public"]["Enums"]["tester_slot"] | null
          id?: string
          pair_code: string
          paired_at?: string | null
          percentage_fare_difference?: number | null
          study_id: string
          submission_a_id: string
          submission_b_id: string
          technical_status?: Database["public"]["Enums"]["pair_validation_status"]
          timestamp_difference_seconds?: number | null
          updated_at?: string
        }
        Update: {
          absolute_fare_difference?: number | null
          assignment_id?: string
          created_at?: string
          evidence_status?: Database["public"]["Enums"]["evidence_integrity_status"]
          gps_distance_feet?: number | null
          higher_priced_slot?: Database["public"]["Enums"]["tester_slot"] | null
          id?: string
          pair_code?: string
          paired_at?: string | null
          percentage_fare_difference?: number | null
          study_id?: string
          submission_a_id?: string
          submission_b_id?: string
          technical_status?: Database["public"]["Enums"]["pair_validation_status"]
          timestamp_difference_seconds?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matched_pairs_assignment_id_study_id_fkey"
            columns: ["assignment_id", "study_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id", "study_id"]
          },
          {
            foreignKeyName: "matched_pairs_submission_a_id_study_id_assignment_id_fkey"
            columns: ["submission_a_id", "study_id", "assignment_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id", "study_id", "assignment_id"]
          },
          {
            foreignKeyName: "matched_pairs_submission_b_id_study_id_assignment_id_fkey"
            columns: ["submission_b_id", "study_id", "assignment_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id", "study_id", "assignment_id"]
          },
        ]
      }
      platform_services: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          metadata: Json
          name: string
          platform_id: string
          service_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json
          name: string
          platform_id: string
          service_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json
          name?: string
          platform_id?: string
          service_code?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_services_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      platforms: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          metadata: Json
          name: string
          provider_category: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          metadata?: Json
          name: string
          provider_category?: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          metadata?: Json
          name?: string
          provider_category?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"]
          created_at: string
          display_name: string | null
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"]
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"]
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      protocols: {
        Row: {
          approved_by: string | null
          created_at: string
          created_by: string | null
          effective_at: string | null
          evidence_requirements: Json
          exclusion_conditions: Json
          fixed_controls: Json
          id: string
          protocol_code: string
          status: Database["public"]["Enums"]["protocol_status"]
          study_id: string
          study_question: string
          updated_at: string
          validation_configuration: Json
          version: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          effective_at?: string | null
          evidence_requirements?: Json
          exclusion_conditions?: Json
          fixed_controls?: Json
          id?: string
          protocol_code: string
          status?: Database["public"]["Enums"]["protocol_status"]
          study_id: string
          study_question: string
          updated_at?: string
          validation_configuration?: Json
          version: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          effective_at?: string | null
          evidence_requirements?: Json
          exclusion_conditions?: Json
          fixed_controls?: Json
          id?: string
          protocol_code?: string
          status?: Database["public"]["Enums"]["protocol_status"]
          study_id?: string
          study_question?: string
          updated_at?: string
          validation_configuration?: Json
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "protocols_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocols_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocols_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "studies"
            referencedColumns: ["id"]
          },
        ]
      }
      studies: {
        Row: {
          configuration: Json
          created_at: string
          created_by: string | null
          default_currency: string | null
          description: string | null
          display_timezone: string
          id: string
          isolated_variable: string | null
          name: string
          status: Database["public"]["Enums"]["study_status"]
          study_code: string
          study_question: string | null
          study_type: Database["public"]["Enums"]["study_type"]
          target_pair_count: number | null
          testing_ends_at: string | null
          testing_starts_at: string | null
          updated_at: string
        }
        Insert: {
          configuration?: Json
          created_at?: string
          created_by?: string | null
          default_currency?: string | null
          description?: string | null
          display_timezone?: string
          id?: string
          isolated_variable?: string | null
          name: string
          status?: Database["public"]["Enums"]["study_status"]
          study_code: string
          study_question?: string | null
          study_type: Database["public"]["Enums"]["study_type"]
          target_pair_count?: number | null
          testing_ends_at?: string | null
          testing_starts_at?: string | null
          updated_at?: string
        }
        Update: {
          configuration?: Json
          created_at?: string
          created_by?: string | null
          default_currency?: string | null
          description?: string | null
          display_timezone?: string
          id?: string
          isolated_variable?: string | null
          name?: string
          status?: Database["public"]["Enums"]["study_status"]
          study_code?: string
          study_question?: string | null
          study_type?: Database["public"]["Enums"]["study_type"]
          target_pair_count?: number | null
          testing_ends_at?: string | null
          testing_starts_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "studies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_members: {
        Row: {
          added_by: string | null
          created_at: string
          membership_status: Database["public"]["Enums"]["membership_status"]
          study_id: string
          study_role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          membership_status?: Database["public"]["Enums"]["membership_status"]
          study_id: string
          study_role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          membership_status?: Database["public"]["Enums"]["membership_status"]
          study_id?: string
          study_role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_members_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_members_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_platforms: {
        Row: {
          created_at: string
          platform_id: string
          study_id: string
        }
        Insert: {
          created_at?: string
          platform_id: string
          study_id: string
        }
        Update: {
          created_at?: string
          platform_id?: string
          study_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_platforms_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_platforms_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "studies"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          account_profile: Json
          app_version: string | null
          assignment_id: string
          assignment_tester_id: string
          battery_percentage: number | null
          created_at: string
          currency: string | null
          destination_location: string | null
          device_type: string | null
          displayed_fare: number | null
          id: string
          latitude: number | null
          longitude: number | null
          network_type: string | null
          notes: string | null
          operating_system: string | null
          operating_system_version: string | null
          pickup_location: string | null
          platform_service_id: string | null
          quote_timestamp: string | null
          status: Database["public"]["Enums"]["submission_status"]
          study_id: string
          submission_code: string | null
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_profile?: Json
          app_version?: string | null
          assignment_id: string
          assignment_tester_id: string
          battery_percentage?: number | null
          created_at?: string
          currency?: string | null
          destination_location?: string | null
          device_type?: string | null
          displayed_fare?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          network_type?: string | null
          notes?: string | null
          operating_system?: string | null
          operating_system_version?: string | null
          pickup_location?: string | null
          platform_service_id?: string | null
          quote_timestamp?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          study_id: string
          submission_code?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_profile?: Json
          app_version?: string | null
          assignment_id?: string
          assignment_tester_id?: string
          battery_percentage?: number | null
          created_at?: string
          currency?: string | null
          destination_location?: string | null
          device_type?: string | null
          displayed_fare?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          network_type?: string | null
          notes?: string | null
          operating_system?: string | null
          operating_system_version?: string | null
          pickup_location?: string | null
          platform_service_id?: string | null
          quote_timestamp?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          study_id?: string
          submission_code?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_study_id_fkey"
            columns: ["assignment_id", "study_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id", "study_id"]
          },
          {
            foreignKeyName: "submissions_assignment_tester_id_assignment_id_user_id_fkey"
            columns: ["assignment_tester_id", "assignment_id", "user_id"]
            isOneToOne: false
            referencedRelation: "assignment_testers"
            referencedColumns: ["id", "assignment_id", "user_id"]
          },
          {
            foreignKeyName: "submissions_platform_service_id_fkey"
            columns: ["platform_service_id"]
            isOneToOne: false
            referencedRelation: "platform_services"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      validation_results: {
        Row: {
          affects_overall_status: boolean
          created_at: string
          explanation: string | null
          id: string
          label: string
          matched_pair_id: string
          observed_difference: string | null
          requirement_level: Database["public"]["Enums"]["requirement_level"]
          rule_code: string
          status: Database["public"]["Enums"]["rule_status"]
          tester_a_value: Json | null
          tester_b_value: Json | null
          threshold_configuration: Json | null
        }
        Insert: {
          affects_overall_status?: boolean
          created_at?: string
          explanation?: string | null
          id?: string
          label: string
          matched_pair_id: string
          observed_difference?: string | null
          requirement_level?: Database["public"]["Enums"]["requirement_level"]
          rule_code: string
          status: Database["public"]["Enums"]["rule_status"]
          tester_a_value?: Json | null
          tester_b_value?: Json | null
          threshold_configuration?: Json | null
        }
        Update: {
          affects_overall_status?: boolean
          created_at?: string
          explanation?: string | null
          id?: string
          label?: string
          matched_pair_id?: string
          observed_difference?: string | null
          requirement_level?: Database["public"]["Enums"]["requirement_level"]
          rule_code?: string
          status?: Database["public"]["Enums"]["rule_status"]
          tester_a_value?: Json | null
          tester_b_value?: Json | null
          threshold_configuration?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "validation_results_matched_pair_id_fkey"
            columns: ["matched_pair_id"]
            isOneToOne: false
            referencedRelation: "matched_pairs"
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
      account_status: "pending" | "active" | "disabled"
      app_role:
        | "admin"
        | "test_coordinator"
        | "tester"
        | "expert_reviewer"
        | "law_firm_viewer"
      assignment_status:
        | "not_started"
        | "in_progress"
        | "draft"
        | "awaiting_partner"
        | "ready_for_validation"
        | "completed"
        | "cancelled"
      assignment_tester_status:
        | "invited"
        | "assigned"
        | "ready"
        | "in_progress"
        | "submitted"
        | "removed"
      evidence_integrity_status: "pending" | "complete" | "flagged" | "rejected"
      membership_status: "invited" | "active" | "removed"
      pair_validation_status:
        | "pending"
        | "valid"
        | "warning"
        | "invalid"
        | "incomplete"
      protocol_status: "draft" | "active" | "superseded" | "archived"
      requirement_level: "required" | "advisory"
      review_status: "pending" | "accepted" | "flagged" | "rejected"
      rule_status: "pass" | "warning" | "fail" | "not_applicable"
      study_status: "draft" | "active" | "paused" | "completed" | "archived"
      study_type: "within_platform_pair" | "cross_platform_comparison"
      submission_status: "draft" | "submitted" | "withdrawn"
      tester_slot: "tester_a" | "tester_b"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["pending", "active", "disabled"],
      app_role: [
        "admin",
        "test_coordinator",
        "tester",
        "expert_reviewer",
        "law_firm_viewer",
      ],
      assignment_status: [
        "not_started",
        "in_progress",
        "draft",
        "awaiting_partner",
        "ready_for_validation",
        "completed",
        "cancelled",
      ],
      assignment_tester_status: [
        "invited",
        "assigned",
        "ready",
        "in_progress",
        "submitted",
        "removed",
      ],
      evidence_integrity_status: ["pending", "complete", "flagged", "rejected"],
      membership_status: ["invited", "active", "removed"],
      pair_validation_status: [
        "pending",
        "valid",
        "warning",
        "invalid",
        "incomplete",
      ],
      protocol_status: ["draft", "active", "superseded", "archived"],
      requirement_level: ["required", "advisory"],
      review_status: ["pending", "accepted", "flagged", "rejected"],
      rule_status: ["pass", "warning", "fail", "not_applicable"],
      study_status: ["draft", "active", "paused", "completed", "archived"],
      study_type: ["within_platform_pair", "cross_platform_comparison"],
      submission_status: ["draft", "submitted", "withdrawn"],
      tester_slot: ["tester_a", "tester_b"],
    },
  },
} as const
