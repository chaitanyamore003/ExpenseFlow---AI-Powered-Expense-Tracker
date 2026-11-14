const express = require("express");
require("dotenv").config();

const db = require("./utils/database");
const userRouter = require("./routes/user.routes");
const expenseRouter = require("./routes/expense.routes");
const paymentRouter = require("./routes/payment.routes");
const premiumRouter = require("./routes/premium.routes");
const passwordRouter = require("./routes/password.routes");
const errorHandler = require("./middlewares/errorHandler");

const cors = require("cors");
const morgan = require("morgan");

require("./models/associations");

const app = express();

// Middlewares

const allowedOrigins = [
  "http://localhost:3500",
  "http://localhost:3000",
  "https://frontend-seven-dusky-4x47zr7zuo.vercel.app",
  "https://frontend-chaitanya-more-s-projects.vercel.app",
  "https://frontend-git-main-chaitanya-more-s-projects.vercel.app",
  "https://frontend-1xeom77m9-chaitanya-more-s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/premium", premiumRouter);
app.use("/api/password", passwordRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// Database synchronization
db.sync({ force: false })
  .then(() => {
    console.log("Database synchronization successful");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("Database synchronization failed:", err);
  });

app.use(errorHandler);
