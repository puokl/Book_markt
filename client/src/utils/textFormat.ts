import moment from "moment";

export const formattedDate = (date: Date) => moment(date).format("YYYY-MM-DD");

export const dateFromNow = (date: Date) => {
  return moment(date).fromNow();
};

export const truncateString = (string: string) => {
  if (string.length <= 40) {
    return string;
  } else {
    return string.slice(0, 40) + "...";
  }
};

export const toUpperCase = (name: string) => {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
