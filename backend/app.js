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
const path = require("path");

require("./models/associations");

const app = express();

// Middlewares

// ✅ Updated CORS configuration
const allowedOrigins = [
  "http://localhost:3500", // Local development
  "http://localhost:3000",
  process.env.FRONTEND_URL, // From your Render Environment Variables
  "https://frontend-seven-dusky-4x47zr7zuo.vercel.app",
  "https://frontend-chaitanya-more-s-projects.vercel.app",
  "https://frontend-git-main-chaitanya-more-s-projects.vercel.app",
  "https://frontend-1xeom77m9-chaitanya-more-s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in our allowed list OR if it's a Vercel preview URL
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

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
