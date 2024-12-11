const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;

const notesRoutes =require('./router/router')

app.use('/api/notes',notesRoutes)






mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("mongoose connected"))
  .catch((err)=>console.log(err)
  )


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
