export default function modifyPublishedTime(publishedAt) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const now = new Date();

  const date = new Date(publishedAt).getDate();
  const month = new Date(publishedAt).getMonth();
  const year = new Date(publishedAt).getFullYear();

  if (
    date === now.getDate() &&
    month === now.getMonth() &&
    year === now.getFullYear()
  ) {
    return "Today";
  } else if (
    now.getDate() - date === 1 &&
    month === now.getMonth() &&
    year === now.getFullYear()
  ) {
    return "Yesterday";
  }
  return `${months[month]} ${date}, ${year}`;
}
