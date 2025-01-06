export const formatShowDate = (date) => {
  if (!date) {
    return "";
  }
  const [day, month, year] = date.split("-");
  const showableDate = `${year}-${month}-${day}`;
  return showableDate;
};
