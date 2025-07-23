import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type AlertMessageProps = {
  type: "error" | "success";
  message: string | null;
};

export default function AlertMessage({ type, message }: AlertMessageProps) {
  if (!message) return null;
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
      <Alert variant={type === "error" ? "destructive" : "default"}>
        <AlertTitle>{type === "error" ? "Lỗi" : "Thành công"}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}
