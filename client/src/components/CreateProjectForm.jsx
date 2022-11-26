import React, { useState } from "react";
import { useEffect } from "react";

const CreateProjectForm = () => {
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

  const [showPageOne, setShowPageOne] = useState(true);
  const [showPageTwo, setShowPageTwo] = useState(false);

  const [showPageThree, setShowPageThree] = useState(false);
  const [showPageFour, setShowPageFour] = useState(false);
  const [showPageFive, setShowPageFive] = useState(false);

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
      </form>
    </div>
  );
};

export default CreateProjectForm;
