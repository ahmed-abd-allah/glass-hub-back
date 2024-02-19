const express = require("express");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg");

// // Routes
const mountRoutes = require("./routes");
const bodyParser = require("body-parser");

// express app
const app = express();
app.enable("trust proxy");

// Enable other domains to access your application
app.get("/", (req, res) => {
  res.send("hi this just a test");
});
app.use(cors());
app.options("*", cors());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  app.use(cors(corsOptions));

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(compression());

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 15 minutes
  max: 300,
  message:
    "Too many accounts created from this IP, please try again after an hour",
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

// Apply the rate limiting middleware to all requests
app.use("/api", limiter);

mountRoutes(app);

app.all("*", (req, res, next) => {
  next(`Can't find this route: ${req.originalUrl}`, 400);
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
app.use(cors());
app.options("*", cors());

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
