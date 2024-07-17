import DashboardTagsFetcher from "./dashboard-tags-fetcher";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-6 md:mb-10">
      <DashboardTagsFetcher />
    </section>
  );
}
