const { RESPONSE_SENDER } = require("../utils/RESPONSE_SENDER");
const ProductModle = require("../Models/Product.model");

const Stripe = require("stripe");
const { default: mongoose } = require("mongoose");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log(process.env.STRIPE_SECRET_KEY);

exports.ProductPayment = async (req, res, next) => {
  const { PId } = req.body;

  try {
    // console.log(PId);
    const user = req.user;
    // console.log(user);
    // const currency='usd'
    if (!user || !PId) {
      return RESPONSE_SENDER(res, 401, { message: "ProductPayment" });
    }

    if (!mongoose.Types.ObjectId.isValid(PId)) {
      return RESPONSE_SENDER(res, 401, {
        message: "ProductPayment is Not valid Object Id",
      });
    }

    const Product = await ProductModle.findById(PId);

    if (!Product) {
      return RESPONSE_SENDER(res, 401, {
        message: "ProductPayment Product Not Found",
      });
    }

    const AmountWithDiscount = (Product.Price.MRP * Product.Price.Offer) / 100;
    const paymentOPtion = {
      amount: AmountWithDiscount * 100,
      currency: "usd",
      description: Product.description??'',
      automatic_payment_methods: { enabled: true },
      // payment_method_types: [ 'card', 'link', 'cashapp' ],
      // capture_method: "manual",
      // application_fee_amount: 1000,
      setup_future_usage: "off_session",
      metadata: {
        Name: user.userName,
        ProductName: Product.Product_Name,
        email: user.email,
        Role: user.Role,
        
      },
    };
    const paymentIntent = await stripe.paymentIntents.create(  {
      amount: AmountWithDiscount * 100,
      currency: "usd",
      description: Product.description??'',
      automatic_payment_methods: { enabled: true },
      // payment_method_types: [ 'card', 'link', 'cashapp' ],
      // capture_method: "manual",
      // application_fee_amount: 1000,
      setup_future_usage: "off_session",
      metadata: {
        Name: user.userName,
        ProductName: Product.Product_Name,
        email: user.email,
        Role: user.Role,
        
      },
    } );
    res.json({
      clientSecret: paymentIntent.client_secret,
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
      PaymentDetails:paymentOPtion
    });
    //   console.log(paymentIntent);
  } catch (error) {
    console.log(error);
return    RESPONSE_SENDER(res,401,{})
  }
};
