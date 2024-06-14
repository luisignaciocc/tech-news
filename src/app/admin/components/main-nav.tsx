import { cn } from "@/lib/utils";

import { Links } from "./links";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Links className="text-sm font-medium transition-colors hover:text-primary flex gap-4" />
    </nav>
  );
}
