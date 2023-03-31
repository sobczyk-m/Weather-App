export const formatTemp = (temp: number) => {
  const formattedTemp = temp.toString().split(".");
  if (formattedTemp[0] === "-0") {
    return "0";
  } else {
    return formattedTemp[0].toString();
  }
};
