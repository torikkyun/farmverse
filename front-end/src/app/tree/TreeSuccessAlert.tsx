import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface TreeSuccessAlertProps {
  title: string;
  description: string;
}

export default function TreeSuccessAlert({
  title,
  description,
}: TreeSuccessAlertProps) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
      <Alert className="bg-white border-2 border-black">
        <AlertTitle className="text-black font-bold">{title}</AlertTitle>
        <AlertDescription className="text-gray-700">
          {description}
        </AlertDescription>
      </Alert>
    </div>
  );
}
