import React, { useEffect } from "react";
import Hero from "./Dashboard.js";
import ActivityFeed from "./ActivitySection.js";
import TrainerPage from "./TrainerPortalSection.js";
import FoodPage from "./DietSection.js";
import ExerciseDatabase from "./ExerciseSection.js";
const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <ActivityFeed />
      <TrainerPage />
      <FoodPage />
      <ExerciseDatabase />
    </div>
  );
};

export default Homepage;
