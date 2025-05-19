import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import LogoutButton from "../components/LogoutButton";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>User Profile</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <LogoutButton />
    </div>
  );
}