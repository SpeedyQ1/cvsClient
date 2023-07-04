import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Cv.css";
import { useNavigate, useParams } from "react-router-dom";
import Upload from "./Upload";

function useDynamicTextArea(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [height, setHeight] = useState('auto');

  const ref = useCallback((node) => {
    if (node !== null) {
      setHeight(`${node.scrollHeight}px`);
    }
  }, []);

  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
      setHeight(`${event.target.scrollHeight}px`);
    },
    []
  );

  return [value, height, ref, handleChange];
}

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
      const data = await axios.patch("http://localhost:3005/users/editCv", {
        token: token.token,
        firstName,
        lastName,
        img: imageURL,
        phone,
        address,
        jobTitle,
        summary,
        skills: skillsArray,
        experience: experienceArr,
        education,
        languages,
        hobbies,
        theEmail,
        id: id,
      });

      console.log(data);
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (url) => {
    setImageURL(url);
  };

  const experienceFields = experienceArr.map((item, index) => {
    const [value, height, ref, handleChange] = useDynamicTextArea(item);
    return (
      <div className="add-input" key={index}>
        <textarea
          className="added-input-field"
          placeholder={`experience ${index + 1}`}
          value={value}
          style={{ height }}
          onChange={handleChange}
          ref={ref}
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
    );
  });

  const skillsFields = skillsArray.map((item, index) => {
    const [value, height, ref, handleChange] = useDynamicTextArea(item);
    return (
      <div className="add-input" key={index}>
        <textarea
          className="added-input-field"
          placeholder={`skill ${index + 1}`}
          value={value}
          style={{ height }}
          onChange={handleChange}
          ref={ref}
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
    );
  });

  return (
    <div>
      <div className="edit-div">
        <div className="row">
          <div className="col edit-col">
            <div className="add-button">
              <h2>Edit</h2>
            </div>
            <form onSubmit={handleSubmitForm}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={cvToEdit.firstName}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={cvToEdit.lastName}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={cvToEdit.theEmail}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={cvToEdit.phone}
                  required
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={cvToEdit.address}
                  required
                />
              </div>
              <div>
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  defaultValue={cvToEdit.jobTitle}
                  required
                />
              </div>
              <div>
                <label htmlFor="summary">Summary</label>
                <textarea
                  name="summary"
                  defaultValue={cvToEdit.summary}
                  required
                ></textarea>
              </div>

              <div className="dynamic-input">
                <h4>Skills</h4>
                {skillsFields}
                <button
                  type="button"
                  className="add-btn"
                  onClick={addSkill}
                >
                  Add Skill
                </button>
              </div>

              <div className="dynamic-input">
                <h4>Experience</h4>
                {experienceFields}
                <button
                  type="button"
                  className="add-btn"
                  onClick={addExperience}
                >
                  Add Experience
                </button>
              </div>

              <div>
                <label htmlFor="education">Education</label>
                <textarea
                  name="education"
                  defaultValue={cvToEdit.education}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="languages">Languages</label>
                <textarea
                  name="languages"
                  defaultValue={cvToEdit.languages}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="hobbies">Hobbies</label>
                <textarea
                  name="hobbies"
                  defaultValue={cvToEdit.hobbies}
                  required
                ></textarea>
              </div>

              <button className="save-btn" type="submit">
                Save
              </button>
            </form>
          </div>
          <div className="col">
            <Upload handleImageUpload={handleImageUpload} />
            {imageURL && <img src={imageURL} alt="Profile" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
