import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  details: Record<string, any>;
  ip_address: string;
  created_at: string;
  users: {
    email: string;
    user_metadata: {
      full_name: string;
    };
  };
}

export const useAuditLogs = (limit = 100) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('audit_logs')
          .select(`
            *,
            users:user_id (
              email,
              user_metadata
            )
          `)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;
        setLogs(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('audit_logs_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'audit_logs'
      }, payload => {
        setLogs(current => [payload.new as AuditLog, ...current].slice(0, limit));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [limit]);

  return { logs, loading, error };
};