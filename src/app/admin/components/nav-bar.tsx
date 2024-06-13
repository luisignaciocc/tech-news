import Image from "next/image";
import Link from "next/link";

import { MainNav } from "@/app/admin/components/main-nav";
import { UserNav } from "@/app/admin/components/user-nav";

function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href={"/"}>
          <Image src="/icon.png" alt="Logo" width={50} height={50} priority />
        </Link>
        <MainNav className="mx-6 hidden md:block" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
