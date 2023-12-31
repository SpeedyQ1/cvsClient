import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import "./Cv.css";
import { useNavigate, useParams } from "react-router-dom";
import Upload from "./Upload";

function Edit() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const navigate = useNavigate();
  const [experienceArr, setExperienceArr] = useState([""]);
  const [skillsArray, setSkillsArray] = useState([""]);
  const { id } = useParams();
  const [cvsArr, setCvsArr] = useState([]);
  const [cvToEdit, setCvToEdit] = useState({});
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token")).token;

    axios
      .post("https://speedyqcvs.onrender.com/users/getCvs", {
        token: token,
      })
      .then((data) => {
        setCvsArr(data.data);
        setCvToEdit(data.data.find((item) => item._id === id));
        setExperienceArr(data.data.find((item) => item._id === id).experience);
        setSkillsArray(data.data.find((item) => item._id === id).skills);
        setImageURL(data.data.find((item) => item._id === id).img);
      });
  }, []);

  function deleteModel(theIndex) {
    setSkillsArray((prev) => prev.filter((item, index) => index !== theIndex));
  }

  function deleteMe(theIndex) {
    setExperienceArr(experienceArr.filter((item, index) => index !== theIndex));
  }

  function addSkill() {
    setSkillsArray((prev) => [...prev, ""]);
  }

  function editSkill(skillIndex, e) {
    const newArr = [...skillsArray];
    newArr[skillIndex] = e.target.value;
    setSkillsArray(newArr);
  }

  function addExperience() {
    setExperienceArr((prev) => [...prev, ""]);
  }

  function editExperience(expIndex, e) {
    const newArr = [...experienceArr];
    newArr[expIndex] = e.target.value;
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
      const data = await axios.patch("https://speedyqcvs.onrender.com/users/editCv", {
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
        template: cvToEdit.template,
        cvIdToChange: id,
      });
      navigate("/myprofile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <form id="info-form" onSubmit={handleSubmitForm}>
          <div id="form-container">
            <input
              className="input-field"
              type="text"
              placeholder="first name"
              defaultValue={cvToEdit.firstName}
            />
            <input
              className="input-field"
              type="text"
              placeholder="last name"
              defaultValue={cvToEdit.lastName}
            />
            <input
              className="input-field"
              type="email"
              placeholder="email"
              defaultValue={cvToEdit.theEmail}
            />
            <input
              className="input-field"
              type="text"
              placeholder="phone"
              defaultValue={cvToEdit.phone}
            />
            <input
              className="input-field"
              type="text"
              placeholder="address"
              defaultValue={cvToEdit.address}
            />
            <input
              className="input-field"
              type="text"
              placeholder="job title"
              defaultValue={cvToEdit.jobTitle}
            />
            <textarea
              className="input-field textarea-field"
              placeholder="summary"
              defaultValue={cvToEdit.summary}
            />
            <textarea
              className="input-field textarea-field"
              placeholder="education"
              defaultValue={cvToEdit.summary}
            />
            <input
              className="input-field"
              type="text"
              placeholder="languages"
              defaultValue={cvToEdit.languages}
            />
            <input
              className="input-field"
              type="text"
              placeholder="hobbies"
              defaultValue={cvToEdit.hobbies}
            />
            <h1>skills:</h1>
            {skillsArray.map((item, index) => (
              <div className="add-input" key={index}>
                <textarea
                  className="added-input-field"
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

            <h1>Experience:</h1>
            {experienceArr.map((item, index) => (
              <div className="add-input" key={index}>
                <textarea
                  className="added-input-field"
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

export default Edit;