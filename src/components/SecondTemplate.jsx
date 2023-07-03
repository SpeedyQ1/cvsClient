import React, { useState } from "react";
import "./SecondTemplate.css";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function SecondTemplate(x) {
  let token = JSON.parse(localStorage.getItem("token")).token;

  const deleteCv = async (theId) => {
    try {
      const deleteThis = await axios.patch(
        "http://localhost:3005/users/deleteCv",
        {
          cvid: theId,
          token: token,
        }
      );
      if (window.location.href.includes("/myprofile")) {
        window.location.reload();
      } else {
        navigate("/myprofile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const cv = x.item;
  const firstName = cv.firstName?.toUpperCase();
  const lastName = cv.lastName?.toUpperCase();
  const jobTitle = cv.jobTitle;
  const img = cv.img;
  const phone = cv.phone;
  const address = cv.address;
  const summary = cv.summary;
  const skills = cv.skills;
  const experience = cv.experience;
  const education = cv.education;
  const languages = cv.languages;
  const hobbies = cv.hobbies;
  const theEmail = cv.theEmail;
  const [randomId, setRandomId] = useState(Math.random().toString(36));

  const convertHtmlToPdf = () => {
    const input = document.getElementById(randomId);
    const pxWidth = input.offsetWidth;
    const pxHeight = input.offsetHeight;
   
    html2canvas(input, {
      width: pxWidth,
      height: pxHeight,
      scale: 1.8,
      allowTaint: true, 
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "px", [pxWidth, pxHeight]);
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("my-resume.pdf");
    });
  };

  return (
    <div id="first-template-container">
      <div className="tool-bar">
        <button onClick={convertHtmlToPdf} className="remove-defult scale-up">
          <PictureAsPdfIcon fontSize="small" />
        </button>
        <Link className="remove-defult scale-up" to={`/edit/${cv._id}`}>
          <EditIcon fontSize="small" />
        </Link>
        <button
          className="remove-defult scale-up"
          onClick={() => deleteCv(cv._id)}
        >
          <DeleteIcon fontSize="small" />
        </button>
      </div>

      <div id={randomId} className="a4-container">
        <div id="top-section">
          <div id="gray-section">
            <div id="name-title-section">
              <div id="name-title">
                <h1 id="first-name">{firstName} </h1>
                <h1 id="last-name">{lastName}</h1>
              </div>
              <h4>{jobTitle}</h4>
            </div>
          </div>
          <img id="profile-img" src={img} alt="" />
        </div>
        <div id="bottom-section">
          <div id="left-section">
            <div className="contact-div">
              <div className="contact-info-div">
                <PhoneIcon fontSize="small" />{" "}
                <span className="contact-info">{phone}</span>
              </div>
              <div className="contact-info-div">
                <EmailIcon fontSize="small" />{" "}
                <span id="email-span" className="contact-info">{theEmail}</span>
              </div>
              <div className="contact-info-div">
                <LocationOnIcon fontSize="small" />{" "}
                <span className="contact-info">{address}</span>
              </div>
            </div>

            <div className="info-cubes-section">
              <h3>SKILLS</h3>
              <ul>
                {skills?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="info-cubes-section">
              <h3 className="cube-title">EDUCATION</h3>
              {education}
            </div>
          </div>

          <div id="right-section">
            <div id="profile-section">
              <h3 className="cube-title">PROFILE</h3>
              {summary}
            </div>
            <div className="info-cubes-section">
              <h3>EXPERIENCE</h3>
              <ul>
                {experience?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SecondTemplate;
