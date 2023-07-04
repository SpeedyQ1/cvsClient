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
  const summaryTextAreaRef = useRef(null);
  const educationTextAreaRef = useRef(null);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token")).token;

    axios
      .post("http://localhost:3005/users/getCvs", {
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

  // Function to adjust the height of the text area based on the content
  const adjustTextAreaHeight = useCallback((ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    // Adjust the height of the summary text area initially and whenever its content changes
    adjustTextAreaHeight(summaryTextAreaRef);
  }, [summaryTextAreaRef, adjustTextAreaHeight]);

  useEffect(() => {
    // Adjust the height of the education text area initially and whenever its content changes
    adjustTextAreaHeight(educationTextAreaRef);
  }, [educationTextAreaRef, adjustTextAreaHeight]);

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
      const data = await axios.patch("http://localhost:3005/users/editCv", {
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
              className="text-area-field"
              placeholder="summary"
              defaultValue={cvToEdit.summary}
              ref={summaryTextAreaRef}
            />
            <textarea
              className="text-area-field"
              placeholder="education"
              defaultValue={cvToEdit.summary}
              ref={educationTextAreaRef}
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
                <input
                  className="added-input-field"
                  type="text"
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

            <div className="upload-container">
              <Upload setImageURL={setImageURL} imageURL={imageURL} />
              <img src={imageURL} alt="profile-img" />
            </div>

            <button className="submit-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
