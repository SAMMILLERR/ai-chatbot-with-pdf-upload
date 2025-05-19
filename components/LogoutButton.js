import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button onClick={handleLogout} style={{ margin: "10px 0" }}>
      Logout
    </button>
  );
}