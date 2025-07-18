import { useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface Props {
  message: string;
  onClose?: () => void;
}

export default function FarmAlert({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
      <Alert variant="default" className="mb-4">
        <AlertTitle>Thông báo</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}
