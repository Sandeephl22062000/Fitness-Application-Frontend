export const CapitalLetterCOnversions = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const showdetail = (
  Goal,
  Target,
  maintainceCalory,
  setRequireCalories,
  setCarbs,
  setProtein
) => {
  if (Goal === "Gain") {
    const calculatedCalories = (Target * 7700) / 7 + maintainceCalory;
    console.log({ calculatedCalories });
    const calculatedCarbs = (maintainceCalory * 0.65) / 4;
    const calculatedProtein = (maintainceCalory * 0.2) / 4;
    setRequireCalories(calculatedCalories?.toFixed(2));
    setCarbs(calculatedCarbs?.toFixed(2));
    setProtein(calculatedProtein?.toFixed(2));
  } else if (Goal === "Loss") {
    const calculatedCalories =
      (maintainceCalory - Target * 7700) / 7 + maintainceCalory;
    const calculatedCarbs = (maintainceCalory * 0.45) / 4;
    const calculatedProtein = (maintainceCalory * 0.15) / 4;
    setRequireCalories(calculatedCalories.toFixed(2));
    setCarbs(calculatedCarbs.toFixed(2));
    setProtein(calculatedProtein.toFixed(2));
  } else {
    setRequireCalories(maintainceCalory);
    const calculatedCarbs = (maintainceCalory * 0.55) / 4;
    const calculatedProtein = (maintainceCalory * 0.17) / 4;
    setCarbs(calculatedCarbs.toFixed(2));
    setProtein(calculatedProtein.toFixed(2));
  }
  return;
};

export const capAtZero = (value) => {
  return value < 0 ? 0 : value;
};
