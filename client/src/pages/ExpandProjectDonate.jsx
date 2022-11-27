import React, { useState } from "react";
import DonateMoney from "../components/DonateMoney";
import { useLocation, Link } from "react-router-dom";
import NavbarColumn from "../components/NavbarColumn";
import avatar from "../assets/avatar.png";

const ExpandProjectDonate = () => {
  const location = useLocation();
  const project = location.state?.data;
  const [showDonateMoney, setShowDonateMoney] = useState(false);
  const { itemsYouHaveArray, itemsYouNeedArray } = project;
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
            <div class="donate-section">
              {/* Project Details */}
              <div class="donate-action">
                <h1>Would you like to</h1>
                <div class="btn-options">
                  <button
                    class="btn-big"
                    onClick={() => setShowDonateMoney(true)}
                  >
                    <h5>Donate Money 💳</h5>
                  </button>
                  <h5>Or</h5>
                  <button class="btn-big">
                    <h5>Donate Item 🔨</h5>
                  </button>
                </div>
              </div>

              {showDonateMoney ? <DonateMoney /> : ""}

              <div class="donate-information">
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
                      {itemsYouHaveArray?.map((item) => (
                        <>
                          <td className="border">{item.name}</td>
                          <td className="border">{item.qty}</td>
                          <td className="border">{item.description}</td>
                        </>
                      ))}
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
                      {itemsYouNeedArray?.map((item) => (
                        <>
                          <td className="border">{item.name}</td>
                          <td className="border">{item.qty}</td>
                          <td className="border">{item.description}</td>
                        </>
                      ))}
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

export default ExpandProjectDonate;
