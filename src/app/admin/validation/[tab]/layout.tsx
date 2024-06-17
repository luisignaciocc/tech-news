import TabLinks from "../components/tab-links";

export default function GroupedLayout({
  params: { tab },
  children,
  topublish,
  deleted,
}: {
  params: { tab: string };
  children: React.ReactNode;
  topublish: React.ReactNode;
  deleted: React.ReactNode;
}) {
  return (
    <div>
      <TabLinks tab={tab} />
      {tab === "topublish" ? (
        <div>{topublish}</div>
      ) : tab === "deleted" ? (
        <div>{deleted}</div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
