import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export type AuditAction = 
  | 'USER_CREATE'
  | 'USER_UPDATE'
  | 'USER_DELETE'
  | 'PERMISSION_UPDATE'
  | 'PRICE_OVERRIDE'
  | 'VOID_TRANSACTION'
  | 'SYSTEM_CONFIG'
  | 'LOGIN'
  | 'LOGOUT';

export const logAuditEvent = async (
  action: AuditAction,
  details: Record<string, any>,
  userId: string
) => {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: userId,
        action,
        details,
        ip_address: window.location.hostname // In production, this would come from the server
      });

    if (error) {
      console.error('Error logging audit event:', error);
    }
  } catch (err) {
    console.error('Error logging audit event:', err);
  }
};