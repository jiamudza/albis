"use client";

import dynamic from "next/dynamic";

const DynamicNavbar = dynamic(() => import("@/components/navbar"), {
  ssr: false,
});

export default DynamicNavbar