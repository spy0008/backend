import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat";

const Dashborad = () => {
  const chat = useChat();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);
  return <div>Dashborad</div>;
};

export default Dashborad;
