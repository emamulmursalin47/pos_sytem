/*
  # Audit Logging System

  1. New Tables
    - `audit_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `action` (text) - Type of action performed
      - `details` (jsonb) - Detailed information about the action
      - `ip_address` (text) - IP address of the user
      - `created_at` (timestamptz) - When the action occurred
      
  2. Security
    - Enable RLS on `audit_logs` table
    - Add policy for admins to read all logs
    - Add policy for users to create logs
*/

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  action text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}',
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Admins can read all logs
CREATE POLICY "Admins can read all audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'ADMIN'
  );

-- Users can create logs
CREATE POLICY "Users can create audit logs"
  ON audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS audit_logs_user_id_idx ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs(created_at DESC);