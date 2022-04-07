import dayjs from "dayjs";

const formatDate = (x: string | Date, format: string = "MMMM DD, YYYY") => {
  return dayjs(x).format(format);
};

export default formatDate;
