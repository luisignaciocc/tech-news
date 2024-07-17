import DashboardTagsFetcher from "./dashboard-tags-fetcher";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-5 md:mb-8">
      <DashboardTagsFetcher />
    </section>
  );
}
