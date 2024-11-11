export default function getFutureDate(offsetMonths = 1) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + offsetMonths);
    return currentDate;
}
