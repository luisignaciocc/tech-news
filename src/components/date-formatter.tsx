"use client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

type Props = {
  date: Date;
};

export const DateFormatter = ({ date }: Props) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zonedDate = toZonedTime(date, timeZone);

  const formattedDate = format(zonedDate, "LLLL d, yyyy", { locale: es });

  return <time dateTime={date.toISOString()}>{formattedDate}</time>;
};

export const DateTimeFormatter = ({ date }: Props) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zonedDate = toZonedTime(date, timeZone);

  const formattedDate = format(zonedDate, "dd/MM/yy", { locale: es });
  const formattedTime = format(zonedDate, "HH:mm", { locale: es });

  return (
    <time dateTime={date.toISOString()}>
      {formattedDate} {formattedTime}
    </time>
  );
};
