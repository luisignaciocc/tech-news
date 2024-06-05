import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

type Props = {
  date: Date;
};

const DateFormatter = ({ date }: Props) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zonedDate = toZonedTime(date, timeZone);

  const formattedDate = format(zonedDate, "LLLL d, yyyy", { locale: es });

  return <time dateTime={date.toISOString()}>{formattedDate}</time>;
};

export default DateFormatter;
