const express = require("express");
const taskModel = require("./models");
const app = express();


// NIE DZIAŁA NIE WIEM CZEMU, postman wstawia wiec chyba cos nie tak z obiektem
app.post("/addTask", async (req, res) => {
  console.log("dodawanie")
  const taskEl = new taskModel({
    id: req.body.id,  
    title: req.body.title
  }) ;
  console.log(taskEl);
  tasks.insertOne(taskEl, (err, result) => {if (err) {
      console.error(err)
      res.status(500).json({ err: err })
      return
    }
    res.status(200).json({ added: true })
  })
});

app.get("/tasks", async (req, res) => {
  console.log("pobieranie zadań")
  tasks.find().toArray((err, items) => { if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
    }
    res.status(200).json({ trips: items })
  })
});

app.get('*', async (req, res) => {
res.send('Nie znaleziono');
})

module.exports = app;