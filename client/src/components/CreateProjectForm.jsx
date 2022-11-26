import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

const CREATEPROJECT_URL = "/api/createproject";

const CreateProjectForm = () => {
  // User Information
  const { auth } = useAuth(AuthContext);

  useEffect(() => {
    console.log(auth);
  }, []);

  // PAGES
  const [showPageOne, setShowPageOne] = useState(true);
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

  const [itemsYouHaveArray, setItemsYouHaveArray] = useState([]);
  const [itemsYouNeedArray, setItemsYouNeedArray] = useState([]);

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
  const [volunteersYouHaveArray, setVolunteersYouHaveArray] = useState([]);
  const [volunteersYouNeedArray, setVolunteersYouNeedArray] = useState([]);

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
    const user = auth?.username;
    console.log(
      "Project Token:",
      auth.user,
      title,
      description,

      keywords
    );

    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
        brandRepAssigned: auth.user,
        title,
        description,
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
        {showPageOne ? (
          <>
            <h1>Details</h1>

            <div className="create-project-row">
              <div className="create-project-col">
                <div className="label-col-container">
                  <label htmlFor="title">Project Name</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label htmlFor="description">Project Description</label>
                  <textarea
                    type="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="label-col-container">
                <div className="label-col-container">
                  <label htmlFor="time">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label htmlFor="type">Project Type</label>
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label htmlFor="size">Project Size (# of ppl in total)</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label htmlFor="keywords">
                    Keywords (add a comma , between each
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="btn-container">
              <p>Save as draft</p>
              <button
                className="btn-cta"
                onClick={() => {
                  setShowPageOne(false);
                  setShowPageTwo(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          " "
        )}

        {showPageTwo ? (
          <>
            <h1>Funding </h1>
            <div className="btn-container">
              <button className="btn-cta">For Equipment or Labor</button>
              <p>Or</p>
              <button className="btn-cta">None Required</button>
              <p>Or</p>
              <button className="btn-cta" onClick={() => showOther(true)}>
                For Equipment or Labor
              </button>
            </div>

            {showOther ? (
              <div className="create-project-col">
                <div className="label-col-container">
                  <label htmlFor="donationAmount">Amount Needed</label>
                  <input
                    type="text"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
                <div className="label-col-container">
                  <label htmlFor="donationReason">Amount Needed</label>
                  <input
                    type="text"
                    value={donationReason}
                    onChange={(e) => setDonationReason(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="btn-container">
              <p>Save as draft</p>
              <button
                className="btn-cta"
                onClick={() => {
                  setShowPageTwo(false);
                  setShowPageThree(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          " "
        )}

        {showPageThree ? (
          <>
            <h1>Equipment </h1>
            <h4>Things You Already Have</h4>
            <table>
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
              className=""
              type="button"
              onClick={() => {
                addItemToArray(itemName, itemQty, itemDescription, "have");
              }}
            >
              Add Item
            </button>

            <h4>Things You Need </h4>
            <table>
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
              className=""
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
              Add Item
            </button>

            <p>or </p>

            <button type="button">None Required</button>

            <div className="btn-container">
              <p>Save as draft</p>
              <button
                className="btn-cta"
                onClick={() => {
                  setShowPageThree(false);
                  setShowPageFour(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          " "
        )}

        {showPageFour ? (
          <>
            <h1>Volunteers</h1>
            <h4>Volunteers You Already Have</h4>
            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>#</th>
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
              className=""
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
              Add Volunteer
            </button>

            <h4>Volunteers You Already Have</h4>
            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>#</th>
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
              className=""
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
              Add Volunteer
            </button>

            <div className="btn-container">
              <p>Save as draft</p>
              <button
                className="btn-cta"
                onClick={() => {
                  setShowPageFour(false);
                  setShowPageFive(true);
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {showPageFive ? (
          <>
            <h1>Help Wanted</h1>
            <h4>Select all the apply</h4>

            <div className="btn-container">
              <button type="button" onClick={() => setShowSpecificHelp(true)}>
                Specific Help
              </button>
              <p>or</p>
              <button>None Required</button>
            </div>

            {showSpecificHelp ? (
              <>
                <div className="label-col-container">
                  <label htmlFor="issue">Issue Name</label>
                  <input
                    type="issue"
                    onChange={(e) => setIssue(e.target.value)}
                    value={issue}
                  />
                </div>

                <button
                  type="button"
                  className="btn-cta"
                  onClick={addIssueToIssuesArray}
                >
                  Add Issue
                </button>
              </>
            ) : (
              " "
            )}
            <div className="btn-container">
              <p>Save as draft</p>
              <button
                className="btn-cta"
                onClick={() => {
                  setShowPageFive(false);
                  setProjectSuccess(true);
                }}
              >
                Create Project
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </form>

      {projectSuccess ? (
        <>
          <h1>successfully created project!</h1>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateProjectForm;
