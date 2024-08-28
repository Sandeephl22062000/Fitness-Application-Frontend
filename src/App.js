import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrainerCards from "./components/Trainer-Info";
import TrainerProfile from "./components/TrainerMyProfile/TrainerProfile";
import Exercises from "./components/Exercises/Exercises";
import ExerciseVideos from "./components/Exercises/ExerciseVideo";
import Signup from "./components/Auth/signup";
import UserInput from "./components/Food";
import Login from "./components/Auth/login";
import CalorieDetail from "./components/Food/calorieCalculation";
import TrainerSigup from "./components/Auth/trainerSignup";
import ShowPost from "./components/Activities/ShowPost";
import SinglePost from "./components/Activities/singlePost";
import ExeprmientFoodApi from "./components/Food/FoodTracking";
import Profile from "./components/MyProfile";
import ProfileToShow from "./components/ProfileToShow";
import ViewAllRecords from "./components/Food/ViewAllRecords";
import Gym from "./components/Gyms/NearByGym";
import Createservices from "./components/createservices";
import { useSelector } from "react-redux";
import Protected from "./ProtectingRoutes";
import PageNotFound from "./components/404Page";

const App = () => {
  const isLoggedIn = useSelector((state) => state?.user?.token);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trainersignup" element={<TrainerSigup />} />
          <Route
            path="/food"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <UserInput />
              </Protected>
            }
          />
          <Route
            path="/food/calculateCalories/:maintainceCalories"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <CalorieDetail />
              </Protected>
            }
          />
          <Route
            path="/calculatediet"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <ExeprmientFoodApi />
              </Protected>
            }
          />
          <Route
            path="/viewallrecords"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <ViewAllRecords />
              </Protected>
            }
          />
          <Route
            path="/trainer"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <TrainerCards />
              </Protected>
            }
          />
          <Route
            path="/trainer/:id"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <TrainerProfile />
              </Protected>
            }
          />
          <Route
            path="/services"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Createservices />
              </Protected>
            }
          />
          <Route
            path="/user/:id"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <ProfileToShow />
              </Protected>
            }
          />
          <Route path="/gyms" element={<Gym />} />
          <Route path="/exercise" element={<Exercises />} />

          <Route
            path="/profile"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/execiseVideos/:muscle/:exercise"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <ExerciseVideos />
              </Protected>
            }
          />
          <Route
            path="/activities"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <ShowPost />
              </Protected>
            }
          />
          <Route
            path="/post/:postID"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <SinglePost />
              </Protected>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
