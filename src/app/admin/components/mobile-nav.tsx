"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { linksArray } from "./links";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface MobileNavProps extends PopoverTriggerProps {}

export default function MobileNav({ className }: MobileNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [showNewLink, setShowNewLink] = React.useState(false);
  const selectedLink = React.useMemo(() => {
    const link = linksArray.find((l) => pathname.startsWith(l.href));
    return link || linksArray[0];
  }, [pathname, linksArray]);

  return (
    <Dialog open={showNewLink} onOpenChange={setShowNewLink}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a link"
            className={cn("w-52 justify-between", className)}
          >
            {selectedLink.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
          <Command>
            <CommandList>
              {linksArray.map((link) => (
                <CommandItem
                  key={link.href}
                  onSelect={() => {
                    setOpen(false);
                    router.push(link.href);
                  }}
                  className="text-sm"
                >
                  {link.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedLink.href === link.href
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
