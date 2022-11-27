import React from "react";

const DonateMoney = () => {
  return (
    <div className="row">
      <div className="col">
        <div class="donate-section">
          <div class="donate-action">
            <h1>Donate Money</h1>
            <div class="donate-input">
              <div>
                <label htmlFor="name" class="donate-money__label">
                  Donation Amount
                </label>
                <br />
                <input type="text" class="donate-money__input" />
              </div>
              <div>
                <label htmlFor="name" class="donate-money__label">
                  Credit Card Number
                </label>
                <br />
                <input type="text" class="donate-money__input" />
              </div>
              <div>
                <label htmlFor="name" class="donate-money__label">
                  Cardholder
                </label>
                <br />
                <input type="text" class="donate-money__input" />
              </div>
              <div>
                <label htmlFor="name" class="donate-money__label">
                  Expiration Date
                </label>
                <br />
                <input type="date" class="create-profile__input" />
              </div>
              <div>
                <label htmlFor="name" class="donate-money__label">
                  CVV
                </label>
                <br />
                <input type="text" class="donate-money__input" />
              </div>
            </div>
            <button class="btn-cta" type="button">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateMoney;
