"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
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

const links = [
  {
    label: "Dashboard",
    href: "/admin/dashboard/",
  },
  {
    label: "Validación",
    href: "/admin/validation",
  },
  {
    label: "Products",
    href: "/examples/products",
  },
  {
    label: "Settings",
    href: "/examples/settings",
  },
];

type Link = (typeof links)[number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedLink, setSelectedLink] = React.useState<Link>(links[0]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a link"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedLink.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search link..." />
              <CommandEmpty>No link found.</CommandEmpty>
              {links.map((link) => (
                <CommandItem
                  key={link.href}
                  onSelect={() => {
                    setSelectedLink(link);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Link href={link.href}>{link.label}</Link>
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
