import { RecentPosts } from "@/app/admin/components/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CardPosts() {
  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>You made 265 sales this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentPosts />
        </CardContent>
      </Card>
    </>
  );
}

export default CardPosts;
