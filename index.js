const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)


app.get("/getUser", (req, res) => {
    UserModel.find({}).then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user);
    await newUser.save()
    res.json(user)
    
})

app.delete("/deleteUser/:_id", async (req, res) => {
  const id = req.params._id;

  try {
    const removedUser = await UserModel.findByIdAndRemove(id);
    if (removedUser) {
      res.status(200).send("Usuario eliminado correctamente");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el usuario: " + error.message);
  }
});


app.listen(process.env.PORT || 4000, () => {
    console.log("Server is running")
})

// Password: RtRCdty3xmLM5lTH