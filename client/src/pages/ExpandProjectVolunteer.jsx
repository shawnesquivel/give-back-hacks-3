import React, { useState } from "react";
import NavbarColumn from "../components/NavbarColumn";
import avatar from "../assets/avatar.png";
import { useLocation, Link } from "react-router-dom";

const ExpandProjectVolunteer = () => {
  const location = useLocation();
  const project = location.state?.data;
  const {
    title,
    description,
    type,
    size,
    volunteersYouHaveArray,
    volunteersYouNeedArray,
  } = project;

  const [volunteerSuccess, setVolunteerSuccess] = useState(false);
  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn active="dashboard" />
      </div>

      <main className="dashboard">
        <header className="dashboard-header">
          <h6>Dashboard</h6>
          <div className="links">
            <Link to="/settings" className="link">
              Settings
            </Link>
            <Link to="/profile">
              <img src={avatar} alt="avatar" className="avatar-sm" />
            </Link>
          </div>
        </header>
        <div className="row">
          <div className="col">
            <div class="donate-section">
              <div class="donate-action">
                <h1>Sign Up to Volunteer</h1>
                <div class="volunteer-input">
                  <div>
                    <label htmlFor="name" class="donate-money__label">
                      Position
                    </label>
                    <br />
                    <input type="text" class="donate-money__input" />
                  </div>
                  <div>
                    <label htmlFor="name" class="donate-money__label">
                      Message to the organizer
                    </label>
                    <br />
                    <input type="textarea" class="donate-money__input" />
                  </div>
                </div>
                <button
                  class="btn-cta"
                  type="button"
                  onClick={() => {
                    setVolunteerSuccess(true);
                  }}
                >
                  Sign Up
                </button>
                {volunteerSuccess ? <p>You signed up as a volunteer!</p> : ""}
              </div>

              <div class="volunteer-information">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ExpandProjectVolunteer;
