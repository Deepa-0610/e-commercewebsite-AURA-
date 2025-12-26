-- Add role column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Create index for role
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Update policies to allow admins to view all profiles (optional, but good for admin)
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Example: Set a specific user as admin (replace UUID with actual user ID)
-- UPDATE profiles SET role = 'admin' WHERE id = 'user_uuid_here';
