import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JmZ8vKe5XlafNv8aPjjC8bOMcd9jfVVN4iywNoPwCeVWTdSQYmNTQtTSsyjqM1XiEeaoMP3OPJ4LBKiMMpViFCR00lSQRWNDF";

  const onToken = ({ token }) => {
    console.log(token);
    alert("payment done");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN clt ltd"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default StripeCheckoutButton