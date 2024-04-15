import React from "react";

export const TimeConvert = ({seconds,nanoseconds}) => {
  const milliseconds = nanoseconds / 1e6;
  const totalMilliseconds = seconds * 1000 + milliseconds;
  const date = new Date(totalMilliseconds);
  let hours = date.getUTCHours();
  const minutes = (date.getUTCMinutes() < 10) ? ("0" + date.getUTCMinutes()) : (date.getUTCMinutes());
  const amPm = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  return `${(hours < 10) ? ("0"+hours) : (hours)} : ${minutes} ${amPm}`;
};
