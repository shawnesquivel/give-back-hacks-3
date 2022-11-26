import React, { useState } from "react";

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

  const [showPageOne, setShowPageOne] = useState(true);
  const [showPageTwo, setShowPageTwo] = useState(false);

  const [showPageThree, setShowPageThree] = useState(false);
  const [showPageFour, setShowPageFour] = useState(false);
  const [showPageFive, setShowPageFive] = useState(false);

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
            <h4>Things you already have</h4>
            <div className="table"></div>
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
