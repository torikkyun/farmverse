"use client";
import AuthGuard from "@/app/AuthGuard";
import ClientOnly from "@/app/ClientOnly";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientOnly>
      <AuthGuard>{children}</AuthGuard>
    </ClientOnly>
  );
}
