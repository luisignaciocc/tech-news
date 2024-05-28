import Container from "@/app/_components/container";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
};

const Alert = ({ text }: Props) => {
  return (
    <div
      className={cn("border-b", {
        "bg-neutral-800 border-neutral-800 text-white": true,
        // "bg-neutral-50 border-neutral-200": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">{text}</div>
      </Container>
    </div>
  );
};

export default Alert;
