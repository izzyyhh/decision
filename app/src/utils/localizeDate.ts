import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export function localizeDateTime(date: Date | string) {
    return dayjs(date).format("L LT");
}

export function localizeDate(date: Date | string) {
    return dayjs(date).format("L");
}

export function localizeTime(date: Date | string) {
    return dayjs(date).format("LT");
}
