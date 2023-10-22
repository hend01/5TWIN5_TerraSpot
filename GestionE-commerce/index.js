const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
var produitRouter = require("./router/produitRoutes");
var commandeRouter = require("./router/commandeRoutes");
// ------------------ Eureka Config --------------------------------------------
const eurekaHelper = require("./eureka-helper");

//----------------- end -----------------------------------------------------------
var configDb = require("./db.json");

const app = express();

/** middlewares */
app.use(express.json());

//////////////--cors-////////
const corsOptions = {
  origin: [
    "http://localhost:5001",
    "http://localhost:8086",
    "http://localhost:3000",
    "https://api.cloudinary.com",
    "http://localhost:5001",
    "https://api.cloudinary.com/v1_1/dotvzhxdz/image/upload",
  ],
  credentials: true, // Autorise les credentials (cookies, HTTP authentication)
  methods: "GET, PUT, POST, DELETE, OPTIONS", // Autorise toutes les méthodes HTTP
  allowedHeaders:
    "Content-Type, Authorization, Accept, Accept-Language, Cache-Control, X-Requested-With, Origin, If-Modified-Since, Content-Length, Content-Disposition, Content-Encoding, Content-Language, Content-Range, Content-Security-Policy, User-Agent, ETag, application/json, text/plain", // Include additional headers here
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));
////////////

app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
// parse application/json
app.use(bodyParser.json());
/**end Middlewares */

const port = 5000;

/** api routes */

app.use("/produit", produitRouter);
app.use("/commande", commandeRouter);

/** end api routes */

// connect  database
mongoose
  .connect(configDb.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully to MongoDB server");
    // Perform database operations here
  })
  .catch((err) => console.error(err));
/** end db conn */

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});

//eurekaHelper.registerWithEureka('app', port);
