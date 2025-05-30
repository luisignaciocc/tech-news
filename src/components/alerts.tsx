import { FaCheckCircle, FaCross } from "react-icons/fa";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertDestructiveProps {
  title: string;
  message: string;
}

interface AlertDemoProps {
  title: string;
  message: string;
}

export function AlertDestructive({ title, message }: AlertDestructiveProps) {
  return (
    <Alert variant="destructive">
      <FaCross className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export function AlertSuccess({ title, message }: AlertDemoProps) {
  return (
    <Alert>
      <FaCheckCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
