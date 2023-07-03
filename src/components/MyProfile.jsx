import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FirstTemplate from "./FirstTemplate";
import SecondTemplate from "./SecondTemplate";
import "./MyProfile.css";
import html2canvas from "html2canvas";

function MyProfile() {
  const [cvArr, setCvArr] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  let token = JSON.parse(localStorage.getItem("token")).token;
  let FirstTemplateArr = [];
  let SecondTemplateArr = [];

  FirstTemplateArr = cvArr.filter(
    (item, index) => item.template === "first-template"
  );
  SecondTemplateArr = cvArr.filter(
    (item, index) => item.template === "second-template"
  );

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const response = await axios.post(
          "https://speedyqcvs.onrender.com/users/getCvs",
          {
            token: token,
          }
        );
        setCvArr(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCvs();
  }, []);

  const convertToImg = (item, index) => {
    html2canvas(document.getElementById(`F${index}`)).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `cv_${index}.png`;
      link.href = imgData;
      link.click();
    });
  };

  return (
    <div id="myProfile-container">
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
          {FirstTemplateArr.map((item, index) => (
            <div
              key={index}
              id={`F${index}`}
              className="small-template"
              onLoad={() => convertToImg(item, index)}
            >
              <FirstTemplate item={item} />
            </div>
          ))}

          {SecondTemplateArr.map((item, index) => {
            return (
              <div key={index} className="small-template">
                <SecondTemplate item={item} />
              </div>
            );
          })}

          {SecondTemplateArr.length === 0 && FirstTemplateArr.length === 0 ? (
            <div>No Cv created yet</div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default MyProfile;
