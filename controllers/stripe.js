const asyncWrapper = require("../middleware/async");
const Vehicle = require('../models/Vehicle.model')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// stripe API
const stripeAPI = asyncWrapper(async (req, res, next) => {    
  console.log('stripeAPI');

  const calculateOrderAmount =  async (callback) => {
      let sum = 0
      for (const item of req.body) {
        const { id, duration, quantity } = item
        await Vehicle.findById({_id: id})
          .then(vehicle => {
            sum += Number(vehicle.price * duration * quantity)
            console.log(sum);
          }) 
      }
      console.log('total: ', sum);
      callback(sum)
  };

  // Create a PaymentIntent with the order amount and currency
  const getPaymentIntent = async (sum) => {
  console.log('total in intent: ', sum);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: sum,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    console.log(paymentIntent);

    res.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  }
  
  calculateOrderAmount(getPaymentIntent)
})

module.exports = stripeAPI 