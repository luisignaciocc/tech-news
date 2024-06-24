import TabLinks from "../components/tab-links";

export default function GroupedLayout({
  params: { tab },
  children,
  topublish,
  deleted,
  notaproved,
}: {
  params: { tab: string };
  children: React.ReactNode;
  topublish: React.ReactNode;
  deleted: React.ReactNode;
  notaproved: React.ReactNode;
}) {
  return (
    <div>
      <TabLinks tab={tab} />
      {tab === "topublish" ? (
        <div>{topublish}</div>
      ) : tab === "deleted" ? (
        <div>{deleted}</div>
      ) : tab === "notaproved" ? (
        <div>{notaproved}</div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
