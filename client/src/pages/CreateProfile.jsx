import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../index.scss";

const CreateProfile = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [interests, setInterests] = useState([]);
  const [showInterests, setShowInterests] = useState(false);
  const [skills, setSkills] = useState([]);
  const [showSkills, setShowSkills] = useState(false);

  const [certifications, setCertifications] = useState("");
  const [showCertifications, setShowCertifications] = useState(false);
  const [certificationType, setCertificationType] = useState("");
  const [certificationDescription, setCertificationDescription] = useState("");
  const [certificationExpiry, setCertificationExpiry] = useState("2023-11-26");

  const [certiifcationFile, setCertificationFile] = useState("");
  const [showCertificationFile, setShowCertificationFile] = useState(false);
  const [address, setAddress] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [dob, setDob] = useState("1990-11-27");
  const [showDob, setShowDob] = useState(false);
  const [license, setLicense] = useState("");
  const [showLicense, setShowLicense] = useState(false);

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

  return (
    <section className="createprofile">
      <Navbar />
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

      <p>{interests[0]}</p>
      <p>{skills[0]}</p>
      <p>{certifications[0]}</p>
      <p>{address}</p>
      <p>{license}</p>

      <form
        action="
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
            />
            <div className="flex-row-center">
              <button
                className="btn-cta"
                onClick={() => {
                  setShowName(false);
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
            <label htmlFor="name" className="create-profile__label">
              Please enter your email:
            </label>
            <br />
            <input
              type="text"
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
              className="create-profile__input"
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

            <div className="flex-row-center">
              <button
                className="btn-cta"
                type="button"
                onClick={() => {
                  setShowInterests(false);
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
            />
            <label htmlFor="certDescription" className="create-profile__label">
              Description
            </label>
            <input
              type="text"
              className="create-profile__input"
              onChange={(e) => setCertificationDescription(e.target.value)}
            />
            <label htmlFor="certExpiry" className="create-profile__label">
              Expiration Date
            </label>
            <input
              type="text"
              className="create-profile__input"
              onChange={(e) => setCertificationExpiry(e.target.value)}
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
              onClick={() => {
                console.log("file uploaded");
              }}
            >
              Upload
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
            <label htmlFor="address">What's you address?</label>
            <input type="text" onChange={(e) => setAddress(e.target.value)} />
            <label htmlFor="dob">What's you DOB?</label>
            <input type="text" onChange={(e) => setDob(e.target.value)} />

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
              className="btn-cta"
              onClick={() => {
                setShowLicense(false);
                setSuccess(true);
              }}
            >
              Finish
            </button>
          </>
        ) : (
          ""
        )}

        {success ? <h1>User Created</h1> : ""}
      </form>
    </section>
  );
};

export default CreateProfile;
