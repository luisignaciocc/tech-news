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
