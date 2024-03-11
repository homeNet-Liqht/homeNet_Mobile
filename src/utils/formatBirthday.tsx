export const formatBirthday = (date: Date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate;
  };