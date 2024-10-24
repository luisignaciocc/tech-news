import TabLinks from "../components/tab-links";

export default async function GroupedLayout(
  props: {
    params: Promise<{ tab: string }>;
    children: React.ReactNode;
    topublish: React.ReactNode;
    deleted: React.ReactNode;
    notaproved: React.ReactNode;
  }
) {
  const params = await props.params;

  const {
    tab
  } = params;

  const {
    children,
    topublish,
    deleted,
    notaproved
  } = props;

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
