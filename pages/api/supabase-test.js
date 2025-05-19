// Example: Test in a Next.js API route or a backend route
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase.from('your_table_name').select('*').limit(1);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ data });
}