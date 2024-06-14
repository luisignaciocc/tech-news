import Link from "next/link";

export const linksArray = [
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

interface LinksProps {
  className?: string;
}

export function Links({ className }: LinksProps) {
  return (
    <div className={className}>
      {linksArray.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
