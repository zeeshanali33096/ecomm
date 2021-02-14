export const capitalize = (sentence: string) => {
  return sentence
    .split(" ")
    .map((words) => words.charAt(0).toUpperCase() + words.slice(1))
    .join(" ");
};
