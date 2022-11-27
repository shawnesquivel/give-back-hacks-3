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
                  <td className="border">Project item</td>
                  <td className="border">Project Qty</td>
                  <td className="border">Project Desc</td>
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
                  <td className="border">Project item</td>
                  <td className="border">Project Qty</td>
                  <td className="border">Project Desc</td>
                </tbody>
              </table>

              <button className="btn-purple">Donate Equipment or Money</button>
            </div>

            {/* Volunteers */}

            {/* Updates */}

            <h4>Updates</h4>
            <div className="expand-project-card">
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
            </div>
          </div>

          <div className="col">
            <h4>Help</h4>
            <div className="expand-project-card expand-project-card--col">
              <div className="comment-header-left">
                <img src={avatar} className="avatar-sm" alt="avatar" />
                <h5 className="">Rick Smith</h5>
              </div>
              <p>
                I’m having problems with this specific issue and I don’t know
                what to do like how do I even solve this help me pls idk the
                internet isn’t helping
              </p>
              <button className="btn-purple">Suggest A Solution</button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ExpandProject;
