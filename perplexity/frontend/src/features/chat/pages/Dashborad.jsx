import React from "react";
import { useSelector } from "react-redux";

const Dashborad = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);
  return <div>Dashborad</div>;
};

export default Dashborad;
