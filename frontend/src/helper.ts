export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return [
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    date.getFullYear(),
  ].join("-");
};
