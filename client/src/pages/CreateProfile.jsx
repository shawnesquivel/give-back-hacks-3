import React, { useState } from "react";
import "../index.scss";
import axios from "../api/axios";

const REGISTER_URL = "/api/register";

const CreateProfile = () => {
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
  const [showCertificationFile, setShowCertificationFile] = useState(false);
  const [address, setAddress] = useState("123 Washington St");
  const [showAddress, setShowAddress] = useState(false);
  const [dob, setDob] = useState("1990-11-27");
  // const [showDob, setShowDob] = useState(false);
  // const [license, setLicense] = useState("");
  const [showLicense, setShowLicense] = useState(false);

  const [uploadedCert, setUploadedCert] = useState(false);
  const [uploadedLicense, setUploadedLicense] = useState(false);
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
    <section className="createprofile">
      <h1 className="title">{!name ? "Welcome." : `Welcome, ${name}.`}</h1>
      {showWelcome ? (
        <>
          <h3>Get ready to connect</h3>
          <div className="flex-row-center">
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
            <label htmlFor="name" className="create-profile__label">
              What's your name?
            </label>
            <br />
            <input
              type="text"
              className="create-profile__input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <div className="flex-row-center">
              <button
                className="btn-cta"
                onClick={() => {
                  setShowName(false);
                  setShowPwd(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {showPwd ? (
          <>
            <label htmlFor="pwd" className="create-profile__label">
              Enter a password
            </label>
            <br />
            <input
              type="password"
              className="create-profile__input"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
            <div className="flex-row-center">
              <button
                className="btn-cta"
                onClick={() => {
                  setShowPwd(false);
                  setShowEmail(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {showEmail ? (
          <>
            <label htmlFor="email" className="create-profile__label">
              Please enter your email:
            </label>
            <br />
            <input
              type="text"
              value={email}
              className="create-profile__input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex-row-center">
              <button
                className="btn-cta"
                onClick={() => {
                  setShowEmail(false);
                  setShowInterests(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {showInterests ? (
          <>
            <label htmlFor="interests" className="create-profile__label">
              What are your interests? (Press ENTER)
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

            <div className="flex-row-center">
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
          </>
        ) : (
          ""
        )}

        {showSkills ? (
          <>
            <label htmlFor="skills" className="create-profile__label">
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
            </div>
          </>
        ) : (
          ""
        )}

        {showCertifications ? (
          <>
            <h1>Do you have any certifications?</h1>
            <label htmlFor="certType" className="create-profile__label">
              Type
            </label>
            <input
              type="text"
              className="create-profile__input"
              onChange={(e) => setCertificationType(e.target.value)}
              value={certificationType}
            />

            <label htmlFor="certExpiry" className="create-profile__label">
              Expiration Date
            </label>
            <input
              type="date"
              className="create-profile__input"
              onChange={(e) => setCertificationExpiry(e.target.value)}
              value={certificationExpiry}
            />
            <button className="btn-secondary">Add Another</button>
            <div className="flex-row-center">
              <button
                onClick={() => {
                  setShowInterests(true);
                  setShowCertifications(false);
                }}
                className="btn-cta"
              >
                Back
              </button>
              <button
                className="btn-cta"
                onClick={() => {
                  setShowCertifications(false);
                  setShowCertificationFile(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {showCertificationFile ? (
          <>
            <h1>Hi, {name}</h1>
            <label htmlFor="certFile">Upload</label>
            <input type="file" />
            <button
              className={!uploadedCert ? "btn-upload" : "btn-success"}
              type="button"
              onClick={() => {
                setUploadedCert(true);
              }}
            >
              {!uploadedCert ? "upload img" : "✅ success"}
            </button>

            <div className="flex-row-center">
              <button className="btn-cta">Back</button>
              <button
                className="btn-cta"
                onClick={() => {
                  setShowCertificationFile(false);
                  setShowAddress(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {showAddress ? (
          <>
            <div className="label-col-container">
              <label htmlFor="address">What is your address?</label>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <div className="label-col-container">
              <label htmlFor="dob">What is your DOB?</label>
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <button
              className="btn-cta"
              onClick={() => {
                setShowAddress(false);
                setShowLicense(true);
              }}
            >
              Next
            </button>
          </>
        ) : (
          ""
        )}

        {showLicense ? (
          <>
            <label htmlFor="license">Upload ID</label>
            <input type="file" />

            <button
              className={!uploadedLicense ? "btn-upload" : "btn-success"}
              type="button"
              onClick={() => {
                setUploadedLicense(true);
              }}
            >
              {!uploadedLicense ? "upload license" : "✅ success"}
            </button>

            <button
              className="btn-cta"
              type="submit"
              onClick={(e) => {
                setShowLicense(false);
                setSuccess(true);
                handleCreateProfile(e);
              }}
            >
              Finish
            </button>
          </>
        ) : (
          ""
        )}

        {success ? <h1>User Created!</h1> : ""}
      </form>
    </section>
  );
};

export default CreateProfile;
