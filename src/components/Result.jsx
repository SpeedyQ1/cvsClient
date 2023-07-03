import React, { useEffect, useState } from "react";
import axios from "axios";
import FirstTemplate from "./FirstTemplate";
import SecondTemplate from "./SecondTemplate";

const Result = () => {
  const [lastCv, setLastCv] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;

      axios
        .post("https://speedyqcvs.onrender.com/users/getCvs", {
          token: token,
        })
        .then((data) => {
          setLastCv(data.data[data.data.length - 1]);
        });

      setTimeout(() => {
        setLoading(false);
      }, 1350);
    } catch {
      console.log(error);
    }
  }, []);

  return (
    <div id="result-container">
      {loading ? ( // Conditional rendering based on loading state
        <div className="loader">
          <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle
              className="pl__ring pl__ring--a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 660"
              strokeDashoffset="-330"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 220"
              strokeDashoffset="-110"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
          </svg>
        </div>
      ) : (
        <>
          {lastCv.template == "second-template" && (
            <SecondTemplate item={lastCv} />
          )}
          {lastCv.template == "first-template" && (
            <FirstTemplate item={lastCv} />
          )}
        </>
      )}
    </div>
  );
};

export default Result;
