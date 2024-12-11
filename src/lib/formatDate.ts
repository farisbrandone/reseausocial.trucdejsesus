import { format } from "date-fns";

export function formatDate(stringDate: string) {
  const dateValue = new Date(stringDate);
  const dateNow = new Date();

  const oneDay = 24 * 60 * 60 * 1000;
  const d = dateNow.getTime() - dateValue.getTime();
  if (d < oneDay) {
    return format(dateValue, " HH:mm");
  } else if (d > oneDay && d < 7 * oneDay) {
    const diffDay = dateNow.getDate() - dateNow.getDate();
    return `${diffDay}j`;
  } else if (d > 7 * oneDay) {
    return format(dateValue, "'' dd/MM/yyyy");
  }
}

export function formatDateWithString(stringDate: string) {
  const dateValue = new Date(stringDate);
  const dateNow = new Date();

  const oneDay = 24 * 60 * 60 * 1000;
  const d = dateNow.getTime() - dateValue.getTime();
  if (d < oneDay) {
    return format(dateValue, " H'h':mm'min'");
  } else if (d > oneDay && d < 7 * oneDay) {
    const diffDay = dateNow.getDate() - dateValue.getDate();
    return `il y a ${diffDay}j`;
  } else if (d > 7 * oneDay) {
    return format(dateValue, "'' dd/MM/yyyy");
  }
}
