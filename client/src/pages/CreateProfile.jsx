import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../index.scss";

const CreateProfile = () => {
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

  const [certiifcationFile, setCertificationFile] = useState("");
  const [showCertificationFile, setShowCertificationFile] = useState(false);
  const [address, setAddress] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [dob, setDob] = useState("1990-11-27");
  const [showDob, setShowDob] = useState(false);
  const [license, setLicense] = useState("");
  const [showLicense, setShowLicense] = useState(false);

  const [summary, showSummary] = useState(false);
  return (
    <section className="createprofile">
      <Navbar />
      <h1 className="title">{!name ? "Welcome." : `Welcome, ${name}.`}</h1>
      <p>r u ready kids</p>
      <div className="flex-row-center"></div>
      <button className="btn-cta" onClick={() => setShowName(true)}>
        I'm Ready
      </button>
      <p>{name}</p>
      <p>{email}</p>
      <p>{interests[0]}</p>
      <p>{skills[0]}</p>
      <p>{certifications[0]}</p>
      <p>{address}</p>
      <p>{license}</p>

      <form
        action="
      "
      >
        {showName ? (
          <>
            <label htmlFor="name" className="create-profile__label">
              What's your name?
            </label>
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
            <label htmlFor="name" className="create-profile__label">
              What are your interests? (Press ENTER)
            </label>
            <p>existing options...</p>
            <input
              type="text"
              className="create-profile__input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex-row-center">
              <button
                className="btn-cta"
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
            <label htmlFor="name" className="create-profile__label">
              What are your certifications? (Press ENTER)
            </label>
            <p>existing options...</p>
            <input
              type="text"
              className="create-profile__input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button>Add Another</button>
            <div className="flex-row-center">
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
      </form>
    </section>
  );
};

export default CreateProfile;
