require("dotenv").config();
const express = require("express");
const officerRouter = require("./routes/officer");
const managerRouter = require("./routes/manager");
const fileRouter = require("./routes/file");
const documentRouter = require("./routes/document");
const resultRouter = require("./routes/document_result");
const principalRouter = require("./routes/principal");
const dashboardRouter = require("./routes/dashboard");
const stageRouter = require("./routes/stage");
const professionUnitRouter=require("./routes/profession_unit");
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded());

app.use("/document", documentRouter);
app.use("/officer", officerRouter);
app.use("/manager", managerRouter);
app.use("/file", fileRouter);
app.use("/documentResult", resultRouter);
app.use("/principal", principalRouter);
app.use("/dashboard", dashboardRouter);
app.use("/stages", stageRouter);
app.use("/professionUnit", professionUnitRouter);


app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`connected ${PORT}`);
});
