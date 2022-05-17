const url = 'api/v1/stripe'

export default {
  payWithStripe: (token, cart) => {
    return fetch(`${url}/create-payment-intent`, {
      method: 'POST',
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(res => res.json())
      .then(data => data)
  }
}