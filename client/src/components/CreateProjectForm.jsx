import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import copyPurple from "../assets/copy-purple.png";
import plusPurple from "../assets/plus.png";

const CREATEPROJECT_URL = "/api/createproject";

const CreateProjectForm = () => {
  // User Information
  const { auth } = useAuth(AuthContext);

  useEffect(() => {
    console.log(auth);
  }, []);

  // PAGES
  const [showSelect, setShowSelect] = useState(true);
  const [showPageOne, setShowPageOne] = useState(false);
  const [showPageTwo, setShowPageTwo] = useState(false);

  const [showPageThree, setShowPageThree] = useState(false);
  const [showPageFour, setShowPageFour] = useState(false);
  const [showPageFive, setShowPageFive] = useState(false);
  const [projectSuccess, setProjectSuccess] = useState(false);

  // PAGE ONE
  const [title, setTitle] = useState("Clothing Drive");
  const [date, setDate] = useState("2022-12-25");
  const [description, setDescription] = useState("To collect clothes");
  const [keywords, setKeywords] = useState("homelessness, cooking");
  const [time, setTime] = useState("3PM - 6PM");
  const [type, setType] = useState("food drive");
  const [size, setSize] = useState(10);

  //   PAGE TWO
  const [other, showOther] = useState(false);
  const [donationAmount, setDonationAmount] = useState(100);
  const [donationReason, setDonationReason] = useState(
    "Rental cost from home depot"
  );

  //   PAGE THREE
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemNeedName, setItemNeedName] = useState("");
  const [itemNeedQty, setItemNeedQty] = useState("");
  const [itemNeedDescription, setItemNeedDescription] = useState("");
  const [itemNeedPrice, setItemNeedPrice] = useState("");

  const [itemsYouHaveArray, setItemsYouHaveArray] = useState([
    { name: "garbage bag", qty: 20, description: "to collect garbage" },
  ]);
  const [itemsYouNeedArray, setItemsYouNeedArray] = useState([
    { name: "buckets", qty: 20, description: "to collect glass", price: 10 },
  ]);

  const addItemToArray = (name, qty, description, arrayToPush, price) => {
    // push the item to the array of items
    if (arrayToPush === "have") {
      const item = {
        name,
        qty,
        description,
      };
      setItemsYouHaveArray([...itemsYouHaveArray, item]);

      setItemName("");
      setItemQty("");
      setItemDescription("");
    }
    if (arrayToPush === "need") {
      const item = {
        name,
        qty,
        description,
        price,
      };
      setItemsYouNeedArray([...itemsYouNeedArray, item]);

      setItemNeedName("");
      setItemNeedQty("");
      setItemNeedDescription("");
      setItemNeedPrice("");
    }
  };

  useEffect(() => {
    console.log("Items You Have:", itemsYouHaveArray);
    console.log("Items You Need :", itemsYouNeedArray);
  }, [itemsYouHaveArray, itemsYouNeedArray]);

  const generateTableRowJSX = (item, qty, description) => {
    return (
      <tr key={Math.floor(Math.random() * 100000)}>
        <td>{item}</td>
        <td>{qty}</td>
        <td>{description}</td>
      </tr>
    );
  };

  const generateTableTwoRowJSX = (item, qty, description, price) => {
    return (
      <tr key={Math.floor(Math.random() * 100000)}>
        <td>{item}</td>
        <td>{qty}</td>
        <td>{description}</td>
        <td>{price}</td>
      </tr>
    );
  };

  //   PAGE FOUR: VOLUNTEERS
  const [volunteersYouHaveArray, setVolunteersYouHaveArray] = useState([
    {
      position: "General",
      qty: 10,
      certification: "None",
      description: "Pick up trash",
    },
  ]);
  const [volunteersYouNeedArray, setVolunteersYouNeedArray] = useState([
    {
      position: "Driver",
      qty: 1,
      certification: "License Class 5",
      description: "To drive",
    },
  ]);

  const [volunteerPosition, setVolunteerPosition] = useState("");
  const [volunteerQty, setVolunteerQty] = useState("");
  const [volunteerCertification, setVolunteerCertification] = useState("");
  const [volunteerDescription, setVolunteerDescription] = useState("");

  const [volunteerNeedPosition, setVolunteerNeedPosition] = useState("");
  const [volunteerNeedQty, setVolunteerNeedQty] = useState("");
  const [volunteerNeedCertification, setVolunteerNeedCertification] =
    useState("");
  const [volunteerNeedDescription, setVolunteerNeedDescription] = useState("");

  const addToVolunteersYouHaveArray = (
    position,
    qty,
    certification,
    description
  ) => {
    setVolunteersYouHaveArray([
      ...volunteersYouHaveArray,
      {
        position,
        qty,
        certification,
        description,
      },
    ]);

    setVolunteerPosition("");
    setVolunteerQty("");
    setVolunteerCertification("");
    setVolunteerDescription("");
  };

  const addToVolunteersYouNeedArray = (
    position,
    qty,
    certification,
    description
  ) => {
    setVolunteersYouNeedArray([
      ...volunteersYouNeedArray,
      {
        position,
        qty,
        certification,
        description,
      },
    ]);

    setVolunteerNeedPosition("");
    setVolunteerNeedQty("");
    setVolunteerNeedCertification("");
    setVolunteerNeedDescription("");
  };

  useEffect(() => {
    console.log("volunteers you have:", volunteersYouHaveArray);
  }, [volunteersYouHaveArray]);

  const generateVolunteersTableRowJSX = (
    position,
    qty,
    certification,
    description
  ) => (
    <tr key={Math.floor(Math.random() * 100000)}>
      <td>{position}</td>
      <td>{qty}</td>
      <td>{certification}</td>
      <td>{description}</td>
    </tr>
  );

  //   PAGE 5: ADDITIONAL HELP WANTED
  const [showSpecificHelp, setShowSpecificHelp] = useState(false);
  const [issue, setIssue] = useState("");
  const [issuesArray, setIssuesArray] = useState([]);
  const addIssueToIssuesArray = () => {
    // add to arary
    setIssuesArray([
      ...issuesArray,
      {
        issue,
        status: "pending",
        suggestion: "",
      },
    ]);

    // reset
    setIssue("");
  };

  useEffect(() => {
    console.log("issues array", issuesArray);
  }, [issuesArray]);

  //   CREATE PROJECT

  const [project, setProject] = useState("");

  const handleCreateProject = async (e) => {
    e.preventDefault();
    console.log(
      "Project Token:",
      auth.user,
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
      issuesArray
    );

    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
        userAssigned: auth.user,
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
      });

      const response = await axios.post(CREATEPROJECT_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Response Data", response, response.data.project);
      setProjectSuccess(true);
      setProject(response.data.project);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="">
        {showSelect ? (
          <>
            <h1 className="mb-2">Select Either</h1>
            <div className="select-either">
              <button
                className="btn-big"
                type="button"
                onClick={() => {
                  setShowSelect(false);
                  setShowPageOne(true);
                }}
              >
                <img src={plusPurple} alt="plus" className="btn-big-icon" />
                Create New
              </button>
              <p>Or</p>
              <button className="btn-big" type="button" disabled>
                <img src={copyPurple} alt="plus" className="btn-big-icon" />
                Start From Previous Project
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {showPageOne ? (
          <>
            <h1 className="mb-2p5">Project Details</h1>
            <div className="create-project-row">
              <div className="create-project-col">
                <div className="label-col-container">
                  <label className="create-project__label" htmlFor="title">
                    Project Name
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label className="create-project__label" htmlFor="date">
                    Date
                  </label>
                  <input
                    className="create-project__input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label className="create-project__label" htmlFor="time">
                    Time
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="label-col-container">
                <div className="label-col-container">
                  <label className="create-project__label" htmlFor="type">
                    Project Type
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label
                    className="create-project__label"
                    htmlFor="description"
                  >
                    Project Description
                  </label>
                  <textarea
                    type="textarea"
                    className="create-project__input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label className="create-project__label" htmlFor="size">
                    Project Size (# of ppl in total)
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label className="create-project__label" htmlFor="keywords">
                    Keywords (add a comma between each)
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="btn-container btn-container--left">
              <button
                className="btn-purple btn-purple--medium"
                onClick={() => {
                  setShowPageOne(false);
                  setShowPageTwo(true);
                }}
              >
                Next
              </button>
              <p className="muted">Save as draft</p>
              <button
                className="btn-cta"
                type="submit"
                onClick={(e) => {
                  setShowPageFive(false);
                  setProjectSuccess(true);
                  handleCreateProject(e);
                }}
              >
                Create Project
              </button>
            </div>
          </>
        ) : (
          " "
        )}

        {showPageTwo ? (
          <>
            <h1 className="mb-1">Funding </h1>
            <h5 className="mb-2p5">Select reason for needing funding:</h5>
            <div className="btn-container mb-2" type="button">
              <button className="btn-big" type="button" disabled>
                <img src={plusPurple} alt="plus" className="btn-big-icon" />
                Equipment
              </button>
              <p>Or</p>
              <button type="button" className="btn-big" disabled>
                <img src={plusPurple} alt="plus" className="btn-big-icon" />
                None Required
              </button>
              <p>Or</p>
              <button
                className="btn-big"
                type="button"
                onClick={() => showOther(true)}
              >
                <img src={plusPurple} alt="plus" className="btn-big-icon" />
                Other
              </button>
            </div>

            {other ? (
              <div className="create-project-col">
                <div className="label-col-container">
                  <label
                    className="create-project__label"
                    htmlFor="donationAmount"
                  >
                    Amount Needed
                  </label>
                  <input
                    className="create-project__input"
                    placeholder="$"
                    type="text"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label
                    className="create-project__label"
                    htmlFor="donationReason"
                  >
                    Describe reason
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    value={donationReason}
                    onChange={(e) => setDonationReason(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="btn-container btn-container--left">
              <button
                className="btn-purple btn-purple--medium"
                onClick={() => {
                  setShowPageTwo(false);
                  setShowPageThree(true);
                }}
              >
                Next
              </button>
              <h5 className="muted">Save as draft</h5>
            </div>
          </>
        ) : (
          " "
        )}

        {showPageThree ? (
          <>
            <h1 className="mb-1">Equipment </h1>
            <h5 className="mb-2p5">
              This section includes any tools, equipment, food, etc. that you
              will need for your event.
            </h5>
            <h6 className="c-black mb-1">Things You Already Have</h6>
            <table className="table-white">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {itemsYouHaveArray?.map((item, index) =>
                  generateTableRowJSX(item.name, item.qty, item.description)
                )}
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="item"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="quantity"
                      value={itemQty}
                      onChange={(e) => setItemQty(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="description"
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn-add-item mb-2"
              type="button"
              onClick={() => {
                addItemToArray(itemName, itemQty, itemDescription, "have");
              }}
            >
              Add Item{" "}
              <span style={{ fontWeight: "500", fontSize: "1.1rem" }}> +</span>
            </button>

            <h6 className="c-black mb-1">Things You Need </h6>
            <table className="table-white">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Est. Cost Per Quantity</th>
                </tr>
              </thead>
              <tbody>
                {itemsYouNeedArray?.map((item, index) =>
                  generateTableTwoRowJSX(
                    item.name,
                    item.qty,
                    item.description,
                    item.price
                  )
                )}
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="item"
                      value={itemNeedName}
                      onChange={(e) => setItemNeedName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="quantity"
                      value={itemNeedQty}
                      onChange={(e) => setItemNeedQty(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="description"
                      value={itemNeedDescription}
                      onChange={(e) => setItemNeedDescription(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="description"
                      value={itemNeedPrice}
                      onChange={(e) => setItemNeedPrice(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn-add-item mb-2"
              type="button"
              onClick={() => {
                addItemToArray(
                  itemNeedName,
                  itemNeedQty,
                  itemNeedDescription,
                  "need",
                  itemNeedPrice
                );
              }}
            >
              Add Item{" "}
              <span style={{ fontWeight: "500", fontSize: "1.1rem" }}> +</span>
            </button>

            <p>Or</p>

            <button type="button" className="btn-none-req mb-2" disabled>
              None Required
            </button>

            <div className="btn-container btn-container--left">
              <button
                className="btn-purple btn-purple--medium"
                onClick={() => {
                  setShowPageThree(false);
                  setShowPageFour(true);
                }}
              >
                Next
              </button>
              <p className="muted">Save as draft</p>
            </div>
          </>
        ) : (
          " "
        )}

        {showPageFour ? (
          <>
            <h1 className="mb-1">Volunteers</h1>
            <h5 className="mb-2p5">
              This section includes any general and special volunteers you need
              before, after or during the event.
            </h5>
            <h6 className="c-black mb-1">Volunteers You Already Have</h6>
            <table className="table-white">
              <thead>
                <tr>
                  <th>Position</th>
                  <th># of People</th>
                  <th>Certification</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {volunteersYouHaveArray?.map((item, index) =>
                  generateVolunteersTableRowJSX(
                    item.position,
                    item.qty,
                    item.certification,
                    item.description
                  )
                )}
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="position"
                      value={volunteerPosition}
                      onChange={(e) => setVolunteerPosition(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="qty"
                      value={volunteerQty}
                      onChange={(e) => setVolunteerQty(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="certification"
                      value={volunteerCertification}
                      onChange={(e) =>
                        setVolunteerCertification(e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="description"
                      value={volunteerDescription}
                      onChange={(e) => setVolunteerDescription(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn-add-item mb-2"
              type="button"
              onClick={() => {
                addToVolunteersYouHaveArray(
                  volunteerPosition,
                  volunteerQty,
                  volunteerCertification,
                  volunteerDescription
                );
              }}
            >
              Add Volunteer{" "}
              <span style={{ fontWeight: "500", fontSize: "1.1rem" }}> +</span>
            </button>

            <h6 className="c-black mb-1">Volunteers You Need</h6>
            <table className="table-white">
              <thead>
                <tr>
                  <th>Position</th>
                  <th># of People</th>
                  <th>Certification</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {volunteersYouNeedArray?.map((item, index) =>
                  generateVolunteersTableRowJSX(
                    item.position,
                    item.qty,
                    item.certification,
                    item.description
                  )
                )}
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="position"
                      value={volunteerNeedPosition}
                      onChange={(e) => setVolunteerNeedPosition(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="qty"
                      value={volunteerNeedQty}
                      onChange={(e) => setVolunteerNeedQty(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="certification"
                      value={volunteerNeedCertification}
                      onChange={(e) =>
                        setVolunteerNeedCertification(e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="description"
                      value={volunteerNeedDescription}
                      onChange={(e) =>
                        setVolunteerNeedDescription(e.target.value)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn-add-item mb-2"
              type="button"
              onClick={() => {
                addToVolunteersYouNeedArray(
                  volunteerNeedPosition,
                  volunteerNeedQty,
                  volunteerNeedCertification,
                  volunteerNeedDescription
                );
              }}
            >
              Add Volunteer{" "}
              <span style={{ fontWeight: "500", fontSize: "1.1rem" }}> +</span>
            </button>

            <div className="btn-container btn-container--left">
              <button
                className="btn-purple btn-purple--medium"
                onClick={() => {
                  setShowPageFour(false);
                  setShowPageFive(true);
                }}
              >
                Next
              </button>
              <p className="muted">Save as draft</p>
            </div>
          </>
        ) : (
          ""
        )}

        {showPageFive ? (
          <>
            <h1 className="mb-1">Help Wanted</h1>
            <h5 className="mb-2p5">
              Do you have any event-related issue that you don’t know how to
              solve on your own? The Humankynd community can help!
            </h5>

            <div className="btn-container btn-container--left mb-2">
              <button
                className="btn-big"
                type="button"
                onClick={() => setShowSpecificHelp(true)}
              >
                <img src={plusPurple} alt="plus" className="btn-big-icon" />
                Specific Help
              </button>
              <p>Or</p>
              <button className="btn-big">
                <img src={copyPurple} alt="copy" className="btn-big-icon" />
                None Required
              </button>
            </div>

            {showSpecificHelp ? (
              <>
                <div className="label-col-container">
                  <label className="create-project__label" htmlFor="issue">
                    Issue Name
                  </label>
                  <input
                    className="create-project__input"
                    type="issue"
                    onChange={(e) => setIssue(e.target.value)}
                    value={issue}
                  />
                </div>

                <button
                  type="button"
                  className="btn-add-item mb-2"
                  onClick={addIssueToIssuesArray}
                >
                  Add Issue{" "}
                  <span style={{ fontWeight: "500", fontSize: "1.1rem" }}>
                    {" "}
                    +
                  </span>
                </button>
              </>
            ) : (
              " "
            )}
            <div className="btn-container btn-container--left">
              <button
                className="btn-purple btn-purple--medium btn-purple--create"
                type="submit"
                onClick={(e) => {
                  setShowPageFive(false);
                  setProjectSuccess(true);
                  handleCreateProject(e);
                }}
              >
                Create Project
              </button>
              <p className="muted">Save as draft</p>
            </div>
          </>
        ) : (
          ""
        )}
      </form>

      {projectSuccess ? (
        <>
          <h4>Your project, {project.title} was created!</h4>
          <p>Go to your dashboard to view the project.</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateProjectForm;
