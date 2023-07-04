import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Cv.css";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";

function InfoForm({ template }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const navigate = useNavigate();
  const [experienceArr, setExperienceArr] = useState([""]);
  const [skillsArray, setSkillsArray] = useState([""]);

  const [imageURL, setImageURL] = useState("");

  function deleteModel(theIndex) {
    setSkillsArray((prev) => prev.filter((item, index) => index !== theIndex));
  }

  function deleteMe(theIndex) {
    setExperienceArr((prev) =>
      prev.filter((item, index) => index !== theIndex)
    );
  }

  function addSkill() {
    setSkillsArray((prev) => [...prev, ""]);
  }

  function editSkill(index, e) {
    const newArr = [...skillsArray];
    newArr[index] = e.target.value;
    setSkillsArray(newArr);
  }

  function addExperience() {
    setExperienceArr((prev) => [...prev, ""]);
  }

  function editExperience(index, e) {
    const newArr = [...experienceArr];
    newArr[index] = e.target.value;
    setExperienceArr(newArr);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const theEmail = e.target[2].value;
    const phone = e.target[3].value;
    const address = e.target[4].value;
    const jobTitle = e.target[5].value;
    const summary = e.target[6].value;
    const education = e.target[7].value;
    const languages = e.target[8].value;
    const hobbies = e.target[9].value;

    try {
      if (imageURL != "") {
        const data = await axios.patch(
          "https://speedyqcvs.onrender.com/users/addCv",
          {
            token: token.token,
            firstName,
            lastName,
            img: imageURL,
            phone,
            address,
            jobTitle,
            theEmail,
            summary,
            skills: skillsArray,
            experience: experienceArr,
            education,
            languages,
            hobbies,
            template: template,
          }
        );
        navigate("/result");
        e.target.reset();
      } else {
        alert("Please upload an image");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (template == "") {
      navigate("/create");
    }
  }, []);

  return (
    <div>
      <div>
        <form id="info-form" onSubmit={handleSubmitForm}>
          <div id="form-container">
            <input
              className="input-field"
              type="text"
              placeholder="first name"
            />
            <input
              className="input-field"
              type="text"
              placeholder="last name"
            />

            <input className="input-field" type="email" placeholder="email" />
            <input className="input-field" type="text" placeholder="phone" />
            <input className="input-field" type="text" placeholder="address" />
            <input
              className="input-field"
              type="text"
              placeholder="job title"
            />
            <textarea
              className="input-field textarea-field"
              placeholder="summary"
            />
            <textarea
              className="input-field textarea-field"
              placeholder="education"
            />
            <input
              className="input-field"
              type="text"
              placeholder="languages"
            />
            <input className="input-field" type="text" placeholder="hobbies" />
            <h1 className="form-title-h">skills:</h1>
            {skillsArray.map((item, index) => (
              <div className="add-input" key={index}>
                <textarea
                  className="added-input-field textarea-field"
                  placeholder={`skill ${index + 1}`}
                  value={item}
                  onChange={(e) => editSkill(index, e)}
                />
                {index > 0 && (
                  <button
                    className="X-btn"
                    type="button"
                    onClick={() => deleteModel(index)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            <button className="add-btn" type="button" onClick={addSkill}>
              add another skill
            </button>

            <h1 className="form-title-h">Experience:</h1>
            {experienceArr.map((item, index) => (
              <div className="add-input" key={index}>
                <textarea
                  className="added-input-field textarea-field"
                  placeholder={`experience ${index + 1}`}
                  value={item}
                  onChange={(e) => editExperience(index, e)}
                />
                {index > 0 && (
                  <button
                    className="X-btn"
                    type="button"
                    onClick={() => deleteMe(index)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            <button className="add-btn" type="button" onClick={addExperience}>
              add another experience
            </button>

            {<Upload setImageURL={setImageURL} />}
            {imageURL != "" && (
              <div className="img-preview-div">
                <button
                  className="remove-img-btn"
                  type="button"
                  onClick={() => setImageURL("")}
                >
                  <svg viewBox="0 0 448 512" className="delete-btn-svg">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
                <img className="uploaded-image" src={imageURL} alt="" />
              </div>
            )}
            <button type="submit">Save Info</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfoForm;
