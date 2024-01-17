export const formatTime = (seconds) => {
  return (
    Math.floor(seconds / 60)
      .toString()
      //wypełnia zerem w przypadku wyświetlania cyfr
      .padStart(2, "0") +
    ":" +
    Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0")
  );
};
