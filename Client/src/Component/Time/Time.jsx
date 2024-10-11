//import React from 'react'
import { useEffect, useState } from "react";
const Time = () => {
  const [showTime, setShowTime] = useState([new Date()]);

  useEffect(() => {
    setInterval(() => {
      setShowTime(new Date());
    });
  }, [showTime]);

  console.log("is this working-->", showTime);

  return (
    <div>
      <p>Hey time {showTime.toLocaleDateString()}</p>
    </div>
  );
};

export default Time;
