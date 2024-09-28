export type UserSession = {
  session_id: string;
  session_token_id: string;
  user_id?: string;
  admin_id?: string;
  data?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}