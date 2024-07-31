import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";

import { useParams } from "react-router-dom";

import { UserByID } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
const handleCommentButtonClick = () => {};
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.FindUserByID);
  const id = params.id;
  useEffect(() => {
    dispatch(UserByID(id));
  }, []);
  return <>{user && <ProfileCard user={user} />}</>;
};

export default ProfilePage;
