import React, { useEffect } from "react";
import Hero from "./Frontpage/Hero";
import ActivityFeed from "./Frontpage/ActivityFeeds";
import TrainerPage from "./Frontpage/TrainerPage.jsx.js";
import FoodPage from "./Frontpage/Foodpage";

import ExerciseDatabase from "./Frontpage/ExerciseDatabase";
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
