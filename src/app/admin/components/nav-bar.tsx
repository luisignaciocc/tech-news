import { MainNav } from "@/app/admin/components/main-nav";
import { Search } from "@/app/admin/components/search";
import TeamSwitcher from "@/app/admin/components/team-switcher";
import { UserNav } from "@/app/admin/components/user-nav";

function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <TeamSwitcher />
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