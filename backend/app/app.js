const express = require("express");
const mongo = require("mongodb").MongoClient
const Router = require("./routes");
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let db;

mongo.connect('mongodb://127.0.0.1:27017/ToDoList',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if(err) {
        console.error(err)
        return
    }
    db = client.db('ToDoList');
    tasks = db.collection("Tasks");
  }
);

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});