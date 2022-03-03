import dayjs from "dayjs";

const convertHourToDate = (hour: string, date: Date) => {
  return dayjs(date)
    .set("hour", parseInt(hour.split(":")[0]))
    .set("minute", parseInt(hour.split(":")[1]))
    .toISOString();
};

export default convertHourToDate;
