import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Chat() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session]);

  if (!session) return <p>Redirecting to login...</p>;
  return <div>/* Chat UI coming soon */</div>;
}