import React from "react";
import SearchInput from "./SearchInput";
import { useEffect } from "react";
const TrainerCards = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SearchInput />
    </>
  );
};

export default TrainerCards;
