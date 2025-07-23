import { Tractor } from "lucide-react";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <div className="flex flex-col gap-4 p-6 md:p-10 flex-1">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Tractor className="size-4" />
            </div>
            Farmverse
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 py-10">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
