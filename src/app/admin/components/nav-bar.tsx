import Image from "next/image";

import { MainNav } from "@/app/admin/components/main-nav";
import { Search } from "@/app/admin/components/search";
import { UserNav } from "@/app/admin/components/user-nav";

function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Image src="/icon.png" alt="Logo" width={50} height={50} priority />
        <MainNav className="mx-6 hidden md:block" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
