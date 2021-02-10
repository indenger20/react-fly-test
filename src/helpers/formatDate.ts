export const formatDate = (date: Date) => {
  return date.toLocaleString('en', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
