export interface Database {
  public: {
    Tables: {
      perfiles: {
        Row: {
          id: string;
          nombre_usuario: string | null;
          nombre_completo: string | null;
          avatar_url: string | null;
          biografia: string | null;
          puntos: number;
          rol: string;
          creado_at: string | null;
          actualizado_at: string | null;
        };
        Insert: {
          id: string;
          nombre_usuario?: string | null;
          nombre_completo?: string | null;
          avatar_url?: string | null;
          biografia?: string | null;
          puntos?: number;
          rol?: string;
          creado_at?: string | null;
          actualizado_at?: string | null;
        };
        Update: {
          id?: string;
          nombre_usuario?: string | null;
          nombre_completo?: string | null;
          avatar_url?: string | null;
          biografia?: string | null;
          puntos?: number;
          rol?: string;
          creado_at?: string | null;
          actualizado_at?: string | null;
        };
        Relationships: [];
      };
      notificaciones: {
        Row: {
          id: string;
          usuario_id: string;
          remitente_id: string | null;
          tipo: string;
          mensaje: string;
          leida: boolean;
          creado_at: string;
        };
        Insert: {
          id?: string;
          usuario_id: string;
          remitente_id?: string | null;
          tipo: string;
          mensaje: string;
          leida?: boolean;
          creado_at?: string;
        };
        Update: {
          id?: string;
          usuario_id?: string;
          remitente_id?: string | null;
          tipo?: string;
          mensaje?: string;
          leida?: boolean;
          creado_at?: string;
        };
        Relationships: [];
      };
      comentarios: {
        Row: {
          id: string;
          usuario_id: string;
          documento_id: string | null;
          contenido: string;
          creado_at: string;
          actualizado_at: string;
        };
        Insert: {
          id?: string;
          usuario_id: string;
          documento_id?: string | null;
          contenido: string;
          creado_at?: string;
          actualizado_at?: string;
        };
        Update: {
          id?: string;
          usuario_id?: string;
          documento_id?: string | null;
          contenido?: string;
          creado_at?: string;
          actualizado_at?: string;
        };
        Relationships: [];
      };
      reacciones: {
        Row: {
          id: string;
          usuario_id: string;
          documento_id: string | null;
          tipo_reaccion: string;
          creado_at: string;
        };
        Insert: {
          id?: string;
          usuario_id: string;
          documento_id?: string | null;
          tipo_reaccion: string;
          creado_at?: string;
        };
        Update: {
          id?: string;
          usuario_id?: string;
          documento_id?: string | null;
          tipo_reaccion?: string;
          creado_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      search_resources: {
        Args: { query: string };
        Returns: unknown;
      };
      obtener_email_por_usuario: {
        Args: { p_nombre_usuario: string };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
