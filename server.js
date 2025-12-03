const express = require("express");
const stripe = require("stripe")("YOUR_SECRET_KEY");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const order = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "idr",
            product_data: {
              name: "Pembayaran Press On Nails"
            },
            unit_amount: order.total * 100
          },
          quantity: 1
        }
      ],
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel"
    });

    res.json({ url: session.url });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Stripe server berjalan di port 3000"));
