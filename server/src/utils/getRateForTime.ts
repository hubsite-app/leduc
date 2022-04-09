import { RateClass } from "@typescript/models";
import dayjs from "dayjs";

const getRateForTime = (rates: RateClass[], date: Date): number => {
  if (rates.length === 0) return 0;

  const sortedRates = rates.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (let i = 0; i < sortedRates.length; i++) {
    const rateDate = dayjs(sortedRates[i].date);

    if (!sortedRates[i].rate) return 0;

    // Before all rates
    if (i === 0 && dayjs(date).isBefore(rateDate)) return sortedRates[i].rate;

    // After all rates
    if (i === sortedRates.length - 1 && dayjs(date).isAfter(rateDate))
      return sortedRates[i].rate;

    // In between rates
    if (
      sortedRates[i + 1] &&
      dayjs(date).isAfter(rateDate) &&
      dayjs(date).isBefore(dayjs(sortedRates[i + 1].date))
    )
      return sortedRates[i].rate;
  }

  return 0;
};

export default getRateForTime;
