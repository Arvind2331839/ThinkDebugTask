const express = require("express");
const dotenv = require("dotenv");
const { ConnectDB } = require("./config/database");
const userRouter = require("./routes/userRoutes");
const orgRouter = require("./routes/orgRoute");
const fileRouter = require("./routes/fileRoute");
const auditRouter = require("./routes/auditRoute");
const cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();

const corsOptions = {
   credentials: true,  // Allows the browser to send cookies
};

app.use(cors(corsOptions));

dotenv.config();
app.use(express.json());
app.use(cookieParser());
ConnectDB();

const PORT = process.env.PORT || 7070;

app.use("/api", userRouter);
app.use("/orgApi", orgRouter);
app.use("/fileApi", fileRouter);
app.use("/auditApi", auditRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
