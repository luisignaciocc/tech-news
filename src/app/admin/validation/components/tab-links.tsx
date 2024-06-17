import Link from "next/link";

export default function TabLinks({ tab }: { tab: string }) {
  return (
    <div className="flex space-x-4">
      <Link
        href={`/admin/validation/topublish?page=1`}
        className={`bg-primary hover:bg-white hover:text-black border border-black font-bold py-2 px-6 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 ${
          tab === "topublish" ? "bg-white text-black" : "text-white"
        }`}
      >
        To Publish
      </Link>
      <Link
        href={`/admin/validation/deleted?page=1`}
        className={`bg-primary hover:bg-white hover:text-black border border-black font-bold py-2 px-6 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 ${
          tab === "deleted" ? "bg-white text-black" : "text-white"
        }`}
      >
        Deleted
      </Link>
    </div>
  );
}
