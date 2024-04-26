const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/taskDB").then(() => {
  console.log("conected")
})

const taskShema = new mongoose.Schema({ title: String, description: String })
const Task = mongoose.model("Task", taskShema)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/api/load-tasks", async (req, res) => {
  try {
    const data = await Task.find()
    res.status(200).json(data)
  } catch (error) {
    console.error("Error retrieving tasks:", error)
    res.status(500).json({ error: "Failed to retrieve tasks" })
  }
})

app.post("/api/post-task", async (req, res) => {
  try {
    const task = req.body
    console.log({ req })
    const result = await tasksCollection.insertOne(task)
    res.status(200).json(result)
  } catch (error) {
    console.error("Error creating task:", error)
    res.status(500).json({ error: "Failed to retrieve tasks" })
  }
})

app.delete("/api/delete-task/:id", async (req, res) => {
  const id = req.params.id
  try {
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) })
    res.status(200).json("test")
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).json({ error: "Failed to retrieve tasks" })
  }
})

app.put("/api/tasks/:id", async (req, res) => {
  const id = req.params.id
  const updatedTask = req.body
  try {
    const result = await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask })
    res.status(200).json(result)
  } catch (error) {
    console.error("Error updating task:", error)
    res.status(500).json({ error: "Failed to retrieve tasks" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
