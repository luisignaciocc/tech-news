import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type Props = {
  date: Date;
};

const DateFormatter = ({ date }: Props) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zonedDate = toZonedTime(date, timeZone);

  const formattedDate = format(zonedDate, "LLLL d, yyyy");

  return <time dateTime={date.toISOString()}>{formattedDate}</time>;
};

export default DateFormatter;
