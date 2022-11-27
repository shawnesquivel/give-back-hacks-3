import React from "react";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useLocation, Link } from "react-router-dom";
import NavbarColumn from "../components/NavbarColumn";
import avatar from "../assets/avatar.png";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
const GETUSER_URL = "/api/getuser";

const ExpandProject = ({}) => {
  const { auth } = useAuth(AuthContext);
  const [userData, setUserData] = useState("");
  // get user data
  useEffect(() => {
    getUserData();
  }, []);

  const [showSuggest, setShowSuggest] = useState(false);
  const [solution, setSolution] = useState("");
  const [solutionSuccess, setSolutionSuccess] = useState(false);

  const getUserData = async () => {
    const user = auth?.user;
    const payload = JSON.stringify({
      token: localStorage.getItem("token"),
    });
    const response = await axios.post(GETUSER_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    setUserData(response.data.user);
  };
  // get data from Card Link
  const location = useLocation();
  const project = location.state?.data;

  //   https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4

  useEffect(() => {
    console.log(location);
    console.log(project);
  }, []);

  const {
    title,
    description,
    keywords,
    time,
    type,
    size,
    donationAmount,
    donationReason,
    itemsYouHaveArray,
    itemsYouNeedArray,
    volunteersYouHaveArray,
    volunteersYouNeedArray,
    issuesArray,
  } = project;

  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn />
      </div>

      <main className="dashboard">
        <header className="dashboard-header">
          <h6>{project?.title}</h6>
          <div className="links">
            <Link to="/settings">Settings</Link>
            <Link to="/profile">
              <img src={avatar} alt="avatar" className="avatar-sm" />
            </Link>
          </div>
        </header>
        <div className="row">
          <div className="col">
            {/* Project Details */}
            <h4>Project Details</h4>
            <div className="expand-project-card">
              <table>
                <tr>
                  <th>Project Name</th>
                  <td>{title}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{type}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>2022-12-25</td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td>{size}</td>
                </tr>
              </table>
              <table>
                <thead>
                  <th className="bold">Description</th>
                </thead>
                <tbody>
                  <td>{description}</td>
                </tbody>
              </table>
            </div>

            {/* Equipment */}
            <h4>Equipment</h4>
            <div className="expand-project-card expand-project-card--col">
              <h6 className="c-black">Things they need</h6>
              <table className="t-borders">
                <thead>
                  <th className="border">Item</th>
                  <th className="border">Quantity</th>
                  <th className="border">Description</th>
                </thead>
                <tbody>
                  {itemsYouHaveArray?.map((item) => {
                    return (
                      <>
                        <td className="border">{item.name}</td>
                        <td className="border">{item.qty}</td>
                        <td className="border">{item.description}</td>
                      </>
                    );
                  })}
                </tbody>
              </table>
              <h6 className="c-black">Things they have</h6>
              <table className="t-borders">
                <thead>
                  <th className="border">Item</th>
                  <th className="border">Quantity</th>
                  <th className="border">Description</th>
                </thead>
                <tbody>
                  {itemsYouNeedArray?.map((item) => {
                    return (
                      <>
                        <td className="border">{item.name}</td>
                        <td className="border">{item.qty}</td>
                        <td className="border">{item.description}</td>
                      </>
                    );
                  })}
                </tbody>
              </table>

              <button className="btn-purple">Donate Equipment</button>
            </div>

            {/* Volunteers */}
            <h4>Volunteers</h4>
            <div className="expand-project-card expand-project-card--col">
              <h6 className="c-black">Volunteers They Need</h6>
              <table className="t-borders">
                <thead>
                  <th className="border">Position</th>
                  <th className="border"># of People</th>
                  <th className="border">Certification</th>
                  <th className="border">Description</th>
                </thead>
                <tbody>
                  {volunteersYouHaveArray?.map((item) => {
                    return (
                      <>
                        <td className="border">{item.position}</td>
                        <td className="border">{item.qty}</td>
                        <td className="border">{item.certification}</td>
                        <td className="border">{item.description}</td>
                      </>
                    );
                  })}
                </tbody>
              </table>
              <h6 className="c-black">Volunteers They Have</h6>
              <table className="t-borders">
                <thead>
                  <th className="border">Position</th>
                  <th className="border"># of People</th>
                  <th className="border">Certification</th>
                  <th className="border">Description</th>
                </thead>
                <tbody>
                  {volunteersYouNeedArray?.map((item) => {
                    return (
                      <>
                        <td className="border">{item.position}</td>
                        <td className="border">{item.qty}</td>
                        <td className="border">{item.certification}</td>
                        <td className="border">{item.description}</td>
                      </>
                    );
                  })}
                </tbody>
              </table>

              <button className="btn-purple">Volunteer</button>
            </div>
            {/* Updates */}

            <h4>Updates</h4>
            <div className="expand-project-card expand-project-card--col">
              <div className="comment-card">
                <div className="comment-header">
                  <div className="comment-header-left">
                    <img src={avatar} alt="" className="avatar-sm" />
                    <p>Rick Shaw</p>
                  </div>
                  <p style={{ color: "darkgrey" }}>2h ago</p>
                </div>
                <p>
                  Everyone please meet at 151 W Hastings St with your equipment
                  about 15 minutes before start time. Thanks!
                </p>
              </div>
              <div className="comment-card">
                <div className="comment-header">
                  <div className="comment-header-left">
                    <img src={avatar} alt="" className="avatar-sm" />
                    <p>Rick Shaw</p>
                  </div>
                  <p style={{ color: "darkgrey" }}>2h ago</p>
                </div>
                <p>
                  Hi everyone, I just pushed the date a week ahead due to some
                  scheduling conflicts. Please update your RSVP!
                </p>
              </div>
              <div className="comment-card">
                <div className="comment-header">
                  <div className="comment-header-left">
                    <img src={avatar} alt="" className="avatar-sm" />
                    <p>Rick Shaw</p>
                  </div>
                  <p style={{ color: "darkgrey" }}>2h ago</p>
                </div>
                <p>Anyone got garbage bags?????</p>
              </div>
            </div>
          </div>

          <div className="col">
            <h4>Help</h4>
            <div className="expand-project-card expand-project-card--col expand-project-card--sm">
              <div className="comment-header-left">
                <img src={avatar} className="avatar-sm" alt="avatar" />
                <h5 className="">Rick Smith</h5>
              </div>
              <p>
                I’m having problems with this specific issue and I don’t know
                what to do like how do I even solve this help me pls idk the
                internet isn’t helping
              </p>
              {!showSuggest ? (
                <button
                  className="btn-purple"
                  type="button"
                  onClick={() => {
                    setShowSuggest(true);
                  }}
                >
                  Suggest A Solution
                </button>
              ) : (
                <>
                  <div className="label-col-container">
                    <label htmlFor="solution"></label>
                    <input
                      type="text"
                      value={solution}
                      className="mb-1"
                      onChange={(e) => setSolution(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-purple"
                      onClick={() => {
                        setSolutionSuccess(true);
                        setSolution("");
                      }}
                    >
                      Suggest Solution
                    </button>
                  </div>
                </>
              )}
              {solutionSuccess ? <p>Your suggestion was recommended!</p> : ""}
            </div>

            <h4>Funding</h4>
            <div className="expand-project-card expand-project-card--col expand-project-card--sm">
              <h6 className="c-black">$0 RAISED of ${donationAmount}</h6>
              <p> To be used for: {donationReason}</p>
              <button className="btn-purple">Donate Equipment</button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ExpandProject;
