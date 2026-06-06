import React from "react";
import LeftContent from "./LeftContent/LeftContent";
import RightContent from "./RightContent/RightContent";

const Main = () => {
  return (
    <div className="main flex">
      <LeftContent />
      <RightContent />
    </div>
  );
};

export default Main;
