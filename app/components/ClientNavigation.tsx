"use client";

import { HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function ClientNavigation() {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/");
      }}
      className="cursor-pointer flex items-center gap-2 mb-2"
    >
      <HomeOutlined />
      Trang chủ
    </div>
  );
}
