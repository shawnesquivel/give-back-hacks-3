import React, { useState } from "react";
import "../index.scss";
import axios from "../api/axios";
import landingImg from "../assets/createprofile-start.png";
import happyFaces from "../assets/happyfaces.png";
import logo from "../assets/humankynd-logo.png";
import backArrow from "../assets/back-arrow.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const REGISTER_URL = "/api/register";

const CreateProfile = () => {
  const navigate = useNavigate(); // to use the navigate hook

  const [showWelcome, setShowWelcome] = useState(true);
  const [name, setName] = useState("Shawn");
  const [showName, setShowName] = useState(false);
  const [pwd, setPwd] = useState("password");
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("user@gmail.com");
  const [showEmail, setShowEmail] = useState(false);
  const [interests, setInterests] = useState(["animals", "homelessness"]);
  const [showInterests, setShowInterests] = useState(false);
  const [skills, setSkills] = useState(["cooking", "managing"]);
  const [showSkills, setShowSkills] = useState(false);

  // const [certifications, setCertifications] = useState("");
  const [showCertifications, setShowCertifications] = useState(false);
  const [certificationType, setCertificationType] =
    useState("FoodSafe Level 3");
  const [certificationExpiry, setCertificationExpiry] = useState("2023-11-26");

  // const [certifcationFile, setCertificationFile] = useState("");
  const [address, setAddress] = useState("123 Washington St");
  const [showAddress, setShowAddress] = useState(false);
  const [dob, setDob] = useState("1990-11-27");
  // const [showDob, setShowDob] = useState(false);
  // const [license, setLicense] = useState("");

  const [success, setSuccess] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value;

    if (!value.trim()) return;

    if (e.target.className === "interests-input") {
      setInterests([...interests, value]);
      console.log(interests);
    }

    if (e.target.className === "skills-input") {
      setSkills([...skills, value]);
      console.log(skills);
    }

    e.target.value = "";
  };

  const removeKeyword = (e, deleteIndex) => {
    if (e.target.className === "interests-delete") {
      setInterests(interests.filter((keyword, index) => index !== deleteIndex));
    }
    if (e.target.className === "skills-delete") {
      setInterests(interests.filter((keyword, index) => index !== deleteIndex));
    }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    try {
      const payload = JSON.stringify({
        name,
        pwd,
        email,
        interests,
        skills,
        certificationType,
        certificationExpiry,
        certificationFile:
          "https://www.foodsafe.ca/assets/images/wallet-card.jpg",
        address,
        dob,
        license:
          "https://saaq.gouv.qc.ca/fileadmin/documents/_processed_/2/9/csm_permis_regulier_5a8f3c69a5.jpg",
      });
      console.log(payload);
      const response = await axios.post(REGISTER_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
      } else {
        alert(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="create-profile">
      <img
        src={logo}
        alt="humankynd logo"
        className="logo logo--createprofile"
      />
      {showWelcome ? (
        <>
          <div class="create-profile-row">
            <div class="create-profile-col__left">
              <div class="page-label">
                <h1 class="title">
                  Start with your why and we’ll take care of the how.
                </h1>
                <h3>
                  Create a profile and find ways to be kind in your community.
                  <span className="bold"> Ready to make a difference?</span>
                </h3>
              </div>
              <div className="btn-container btn-container--left">
                <button
                  className="btn-cta"
                  onClick={() => {
                    setShowWelcome(false);
                    setShowName(true);
                  }}
                >
                  I'm Ready
                </button>
              </div>
              <Link to="/login">Already Have An Account? Login</Link>
            </div>
            <div class="create-profile-col__right">
              <img
                class="image"
                src={landingImg}
                alt="two women volunteers smiling at a laptop"
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <form
        action="
        submit
      "
        className="create-profile__form"
      >
        {showName ? (
          <>
            <div class="create-profile-row">
              <div class="create-profile-col__left">
                <div class="page-label">
                  <h6 className="c-black">Create A Profile</h6>
                  <h1>What is your name?</h1>
                </div>
                <div class="input-fields">
                  <div>
                    <label htmlFor="name" class="create-profile__label">
                      Full Name
                    </label>
                    <br />
                    <input
                      type="text"
                      className="create-profile__input"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>
                <div className="btn-container btn-container--left">
                  <button
                    className="btn-back"
                    type="button"
                    onClick={() => {
                      setShowName(false);
                      setShowWelcome(true);
                    }}
                  >
                    <img
                      src={backArrow}
                      alt="back arrow"
                      class="btn-back-img"
                    />
                  </button>
                  <button
                    className="btn-cta"
                    type="button"
                    onClick={() => {
                      setShowName(false);
                      setShowPwd(true);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div class="create-profile-col__right">
                <img
                  class="image"
                  src={happyFaces}
                  alt="pastel circles on green background and a happy face"
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {showPwd ? (
          <>
            <div class="create-profile-row">
              <div class="create-profile-col__left">
                <div class="page-label">
                  <h6 className="c-black">Create A Profile</h6>
                  <h1>Enter a password</h1>
                </div>
                <div class="input-fields">
                  <div className="label-col-container">
                    <label htmlFor="pwd" className="create-profile__label">
                      Enter a password
                    </label>
                    <input
                      type="password"
                      className="create-profile__input"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                    />
                  </div>
                </div>
                <div className="btn-container btn-container--left">
                  <button
                    className="btn-back"
                    type="button"
                    onClick={() => {
                      setShowPwd(false);
                      setShowName(true);
                    }}
                  >
                    <img
                      src={backArrow}
                      alt="back arrow"
                      class="btn-back-img"
                    />
                  </button>
                  <button
                    className="btn-cta"
                    type="button"
                    onClick={() => {
                      setShowPwd(false);
                      setShowEmail(true);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div class="create-profile-col__right">
                <img
                  class="image"
                  src={happyFaces}
                  alt="pastel circles on green background and a happy face"
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {showEmail ? (
          <>
            <div class="create-profile-row">
              <div class="create-profile-col__left">
                <div class="page-label">
                  <h6 className="c-black">Create Login</h6>
                  <h1>What is your email?</h1>
                </div>
                <div class="input-fields">
                  <div className="label-col-container">
                    <label htmlFor="email" className="create-profile__label">
                      Please enter your email:
                    </label>
                    <input
                      type="text"
                      value={email}
                      className="create-profile__input"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="btn-container btn-container--left">
                  <button
                    className="btn-back"
                    type="button"
                    onClick={() => {
                      setShowPwd(false);
                      setShowName(true);
                    }}
                  >
                    <img
                      src={backArrow}
                      alt="back arrow"
                      class="btn-back-img"
                    />
                  </button>
                  <button
                    className="btn-cta"
                    type="button"
                    onClick={() => {
                      setShowEmail(false);
                      setShowInterests(true);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div class="create-profile-col__right">
                <img
                  class="image"
                  src={happyFaces}
                  alt="pastel circles on green background and a happy face"
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {showInterests ? (
          <>
            <div class="create-profile-row">
              <div class="create-profile-col__left">
                <div class="page-label">
                  <h6 className="c-black">Create A Profile</h6>
                  <h1>What are your interests?</h1>
                </div>
                <div class="input-fields">
                  <div className="label-col-container">
                    <label htmlFor="email" className="create-profile__label">
                      Type interests & press Enter
                    </label>
                    <input
                      id="interests"
                      type="text"
                      className="interests-input"
                      onKeyDown={handleKeyDown}
                    />
                    <div className="words-container">
                      {interests?.map((word, index) => (
                        <div className="words-item" key={index}>
                          <span className="words-text">{word}</span>
                          <span
                            onClick={(e) => removeKeyword(e, index)}
                            className="interests-delete"
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="btn-container btn-container--left">
                  <button
                    className="btn-back"
                    type="button"
                    onClick={() => {
                      setShowInterests(false);
                      setShowEmail(true);
                    }}
                  >
                    <img
                      src={backArrow}
                      alt="back arrow"
                      class="btn-back-img"
                    />
                  </button>
                  <button
                    className="btn-cta"
                    type="button"
                    onClick={() => {
                      setShowInterests(false);
                      setShowSkills(true);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div class="create-profile-col__right">
                <img
                  class="image"
                  src={happyFaces}
                  alt="pastel circles on green background and a happy face"
                />
              </div>
            </div>

            {/* not sure why "ENTER" only works when there is stuff between the button and the input */}
            <div className="offscreen">
              <label htmlFor="tags" className="form__label">
                Required Profile Tags (Press Enter ⏎)
              </label>
              <input
                type="text"
                className="tags-input"
                placeholder="Add a tag"
              />
            </div>
          </>
        ) : (
          ""
        )}

        {showSkills ? (
          <>
            <div class="create-profile-row">
              <div class="create-profile-col__left">
                <div class="page-label">
                  <h6 className="c-black">Create A Profile</h6>
                  <h1>What are your skills?</h1>
                </div>
                <div class="input-fields">
                  <div>
                    <label htmlFor="email" className="create-profile__label">
                      What are your skills? (Press ENTER)
                    </label>
                    <input
                      id="skills"
                      type="text"
                      className="skills-input"
                      onKeyDown={handleKeyDown}
                    />
                    <div className="words-container">
                      {skills?.map((word, index) => (
                        <div className="words-item" key={index}>
                          <span className="words-text">{word}</span>
                          <span
                            onClick={(e) => removeKeyword(e, index)}
                            className="skills-delete"
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="btn-container btn-container--left">
                  <button
                    className="btn-back"
                    type="button"
                    onClick={() => {
                      setShowSkills(false);
                      setShowInterests(true);
                    }}
                  >
                    <img
                      src={backArrow}
                      alt="back arrow"
                      class="btn-back-img"
                    />
                  </button>
                  <button
                    className="btn-cta"
                    type="button"
                    onClick={() => {
                      setShowSkills(false);
                      setShowCertifications(true);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div class="create-profile-col__right">
                <img
                  class="image"
                  src={happyFaces}
                  alt="pastel circles on green background and a happy face"
                />
              </div>
            </div>

            {/* not sure why "ENTER" only works when there is stuff between the button and the input */}
            <div className="offscreen">
              <label htmlFor="tags" className="form__label">
                Required Profile Tags (Press Enter ⏎)
              </label>
              <input
                type="text"
                className="tags-input"
                placeholder="Add a tag"
              />
            </div>

            {/* old */}
            {/* <label htmlFor="skills" className="create-profile__label">
              What are your skills? (Press ENTER)
            </label>
            <input
              id="skills"
              type="text"
              className="skills-input"
              onKeyDown={handleKeyDown}
            />
            <div className="words-container">
              {skills?.map((word, index) => (
                <div className="words-item" key={index}>
                  <span className="words-text">{word}</span>
                  <span
                    onClick={(e) => removeKeyword(e, index)}
                    className="skills-delete"
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div> */}
            {/* not sure why "ENTER" only works when there is stuff between the button and the input */}
            {/* <div className="offscreen">
              <label htmlFor="tags" className="form__label">
                Required Profile Tags (Press Enter ⏎)
              </label>
              <input
                type="text"
                className="tags-input"
                placeholder="Add a tag"
              />
            </div>

            <div className="flex-row-center">
              <button
                className="btn-cta"
                type="button"
                onClick={() => {
                  setShowSkills(false);
                  setShowCertifications(true);
                }}
              >
                Next
              </button>
            </div> */}
          </>
        ) : (
          ""
        )}

        {showCertifications ? (
          <>
            <div class="create-profile-row">
              <div class="create-profile-col__left">
                <div class="page-label">
                  <h6>Create A Profile</h6>
                  <h1>Do you have any certifications?</h1>
                </div>
                <div class="input-fields">
                  <label htmlFor="certType" class="create-profile__label">
                    Type
                  </label>
                  <input
                    type="text"
                    className="create-profile__input"
                    onChange={(e) => setCertificationType(e.target.value)}
                    value={certificationType}
                  />

                  <label htmlFor="certExpiry" class="create-profile__label">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    className="create-profile__input"
                    onChange={(e) => setCertificationExpiry(e.target.value)}
                    value={certificationExpiry}
                  />
                  <button className="btn-secondary">Add Certification +</button>
                </div>
                <div className="btn-container btn-container--left">
                  <button
                    className="btn-back"
                    type="button"
                    onClick={() => {
                      setShowCertifications(false);
                      setShowSkills(true);
                    }}
                  >
                    <img
                      src={backArrow}
                      alt="back arrow"
                      class="btn-back-img"
                    />
                  </button>
                  <button
                    className="btn-cta"
                    type="button"
                    onClick={() => {
                      setShowCertifications(false);
                      setShowAddress(true);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div class="create-profile-col__right">
                <img
                  class="image"
                  src={happyFaces}
                  alt="pastel circles on green background and a happy face"
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {showAddress ? (
          <>
            <div class="create-profile-row">
              <div class="create-profile-col__left">
                <div class="page-label">
                  <h6>Create A Profile</h6>
                  <h1>Personal Information</h1>
                </div>
                <div class="input-fields">
                  <label htmlFor="address" class="create-profile__label">
                    What is your address?
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    class="create-profile__input"
                  />
                </div>
                <div class="label-col-container">
                  <label htmlFor="dob" class="create-profile__label">
                    What is your DOB?
                  </label>
                  <input
                    class="create-profile__input"
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div className="btn-container btn-container--left">
                  <button
                    className="btn-back"
                    type="button"
                    onClick={() => {
                      setShowCertifications(false);
                      setShowSkills(true);
                    }}
                  >
                    <img
                      src={backArrow}
                      alt="back arrow"
                      class="btn-back-img"
                    />
                  </button>
                  <button
                    className="btn-cta"
                    type="submit"
                    onClick={(e) => {
                      navigate("/login");
                      handleCreateProfile(e);
                    }}
                  >
                    Finish
                  </button>
                </div>
              </div>
              <div class="create-profile-col__right">
                <img
                  class="image"
                  src={happyFaces}
                  alt="pastel circles on green background and a happy face"
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};

export default CreateProfile;
