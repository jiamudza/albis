import { cache } from "react";
import { cookies } from "next/headers";
import axios from "axios";

export const getUserFromCookie = cache(async() => {
  // cookies() itu sync di server component, jadi jangan pakai await
    const cookieStore = await cookies();
  console.log("🔍 COOKIE STORE:", cookieStore.getAll());
  const token = cookieStore.get("token")?.value;
  console.log("🔍 TOKEN FROM COOKIE:", token);
  if (!token) return null;

  try {
    const res = await axios.get("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      // di SSR Next.js, axios tidak pakai 'cache', langsung pakai GET biasa
    });
    console.log(token)

    return res.data.user || null;
  } catch (err) {
    console.error("getUserFromCookie error:", err);
    return null;
  }
})
