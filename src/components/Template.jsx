import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Template.css";

function Template({ setTemplate }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const selectedInput = document.querySelector('input[name="first"]:checked');
    const selectedId = selectedInput ? selectedInput.id : null;
    setTemplate(selectedId);
    navigate("/info");
  };

  return (
    <div id="template-page-container">
      <form id="template-form" onSubmit={(e) => handleSubmitForm(e)}>
        <h1>Please Choose A Template For Your Cv</h1>
        <br />
        <div id="template-selection-div">
          <div className="input-label-div">
            <label htmlFor="first-template">
              <img
                id="first-template-img"
                className="template-img"
                src="https://i.ibb.co/ssYcbVC/curly-brackets.jpg"
                alt=""
              />
            </label>
            <input id="first-template" type="radio" name="first" required/>
          </div>
          <div className="input-label-div">
            <label htmlFor="second-template">
              <img
                className="template-img"
                src="https://marketplace.canva.com/EAE8mhdnw_g/2/0/1131w/canva-grey-clean-cv-resume-photo-pIsBixsev8I.jpg"
                alt=""
              />
            </label>
            <input id="second-template" type="radio" name="first" required />
          </div>
        </div>
        <button id="save-template" type="submit">
          save template
        </button>
      </form>
    </div>
  );
}

export default Template;
