import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    router.push("/pages/Login");
  }, [router]);

  return <p>Logging out...</p>;
}
