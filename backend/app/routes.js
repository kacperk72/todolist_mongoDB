const express = require("express");
const taskModel = require("./models");
const app = express();

app.get("/tasks", async (req, res) => {
  console.log("pobieranie zadań")
  tasks.find().toArray((err, items) => { if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
    }
    res.status(200).json(items)
  })
});

app.get("/progress", async (req, res) => {
  let progress = 0;
  let amountOfTasks = 0;
  tasks.find().toArray((err, items) => { if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
    }
    items.forEach(element => {
      amountOfTasks++;
        if(element.status){
            progress++; 
        }   
    });

    const data = {
      amountOfTasks,
      progress
    }
    res.status(200).json(data)
  })
})

app.get('*', async (req, res) => {
  res.send('Nie znaleziono');
})

app.post("/addTask", async (req, res) => {
  console.log("dodawanie nowego zadania")
  const taskEl = new taskModel({
    id: req.body.id,  
    title: req.body.title,
    status: req.body.status
  }) ;
  tasks.insertOne(taskEl, (err, result) => {if (err) {
      console.error(err)
      res.status(500).json({ err: err })
      return
    }
    res.status(200).json({ added: true })
  })
});

app.delete("/deleteTask/:id", async (req, res) => {
    console.log("usuwanie zadania o id", req.params.id)
    try {
      const result = await tasks.deleteOne({
        id: req.params.id
      })
      res.send(result);
    } catch(err) {
      console.log(err.message);
    }
})

app.patch("/editTaskCheckbox", async (req, res) => {
  console.log("zmiana statusu zadnaia o id", req.body.id)
  try {
    const result = await tasks.updateOne({
      id: req.body.id,
    }, {
      $set: {
        status: req.body.status
      }
    })
    res.send(result);
  } catch(err) {
    console.log(err.message);
  }
})

app.patch("/editTask", async (req, res) => {
  console.log("edytowanie zadnaia o id", req.body.id)
  try {
    const result = await tasks.updateOne({
      id: req.body.id,
    }, {
      $set: {
        title: req.body.title
      }
    })
    res.send(result);
  } catch(err) {
    console.log(err.message);
  }
})
module.exports = app;