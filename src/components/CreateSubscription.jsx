import React, { useState } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";
import { Label, Button } from "semantic-ui-react";
import axios from "axios";

const CreateSubscription = (props) => {
  const [subscriberStatus, setSubscriberStatus] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));

  const submitPayment = async () => {
    const stripeResponse = await props.stripe.createToken();
    try {
      const paymentStatus = await axios.post(
        "/subscription",
        {
          stripeToken: stripeResponse.token.id,
        },
        { headers: headers }
      );
      if (paymentStatus.status === 200) {
        setSubscriberStatus(true);
        setSubscriptionMessage(paymentStatus.data.message);
      }
    } catch (error) {}
  };

  return (
    <>
      {subscriberStatus ? (
        <h1 id="subscription-message">{subscriptionMessage}</h1>
      ) : (
        <div id="payment-interface">
          <Label htmlFor="cardnumber">Card number</Label>
          <CardNumberElement id="cardnumber" />
          <Label htmlFor="exp-date">Expiry Date</Label>
          <CardExpiryElement id="exp-date" />
          <Label htmlFor="cvc">CVC</Label>
          <CardCVCElement id="cvc" />
          <Button onClick={submitPayment}>Submit</Button>
        </div>
      )}
    </>
  );
};

export default injectStripe(CreateSubscription);
