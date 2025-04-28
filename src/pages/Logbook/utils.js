import { differenceInMinutes } from "date-fns";

export const timeDiffernce = (toTime, fromTime) => {
    const dateObj = new Date(toTime);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const dateObj1 = new Date(fromTime);
    const day1 = dateObj1.getDate();
    const month1 = dateObj1.getMonth();
    const year1 = dateObj1.getFullYear();
    const hour1 = dateObj1.getHours();
    const minutes1 = dateObj1.getMinutes();
    const newDiff = differenceInMinutes(
        new Date(year, month, day, hour, minutes),
        new Date(year1, month1, day1, hour1, minutes1)
    )
    const res = `${(newDiff / 60).toFixed(0)} : ${newDiff % 60}`
    return res;
}