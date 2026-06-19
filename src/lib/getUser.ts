import { cookies } from "next/headers";
import axios from "axios";

export const getUserFromCookie = async() => {
  // cookies() itu sync di server component, jadi jangan pakai await
    const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const res = await axios.get("https://albis-navy.vercel.app/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      // di SSR Next.js, axios tidak pakai 'cache', langsung pakai GET biasa
    });

    return res.data.user || null;
  } catch (err) {
    console.error("getUserFromCookie error:", err);
    return null;
  }
}
