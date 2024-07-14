import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-28 lg:w-72"
      />
    </div>
  );
}
