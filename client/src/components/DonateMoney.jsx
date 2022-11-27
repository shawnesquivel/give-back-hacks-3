import React, { useState } from "react";

const DonateMoney = () => {
  const [donateSuccess, setDonateSuccess] = useState(false);
  return (
    <div className="row">
      <div className="col">
        <div class="donate-section">
          <div class="donate-action">
            <h1>Donate Money</h1>
            <div className="row">
              <div className="col">
                <div className="label-col-container">
                  <label htmlFor="name" class="create-project__label">
                    Credit Card Number
                  </label>
                  <input type="text" class="create-project__input" />
                </div>
                <div className="label-col-container">
                  <label htmlFor="name" class="create-project__label">
                    Expiration Date
                  </label>
                  <input type="date" class="create-project__input" />
                </div>
                <div className="label-col-container">
                  <label htmlFor="name" class="create-project__label">
                    Donation Amount
                  </label>
                  <input type="text" class="create-project__input" />
                </div>
              </div>
              <div className="col">
                <div className="label-col-container">
                  <label htmlFor="name" class="create-project__label">
                    Cardholder
                  </label>

                  <input type="text" class="create-project__input" />
                </div>

                <div className="label-col-container">
                  <label htmlFor="name" class="create-project__label">
                    CVV
                  </label>
                  <input type="text" class="create-project__input" />
                </div>
              </div>
            </div>
          </div>
          <button
            class="btn-cta"
            type="button"
            onClick={() => {
              setDonateSuccess(true);
            }}
          >
            Donate
          </button>
          {donateSuccess ? <h6>Donation Successful!</h6> : ""}
        </div>
      </div>
    </div>
  );
};

export default DonateMoney;
