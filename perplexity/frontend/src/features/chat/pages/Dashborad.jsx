import React from "react";
import { useSelector } from "react-redux";

const Dashborad = () => {
  const { user } = useSelector((state) => state.auth);

  return <div>Dashborad</div>;
};

export default Dashborad;
