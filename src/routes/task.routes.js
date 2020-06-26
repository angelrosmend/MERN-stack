const express =  require('express');
const router = express.Router();

const Task = require('../models/task');


//Consulting tasks (GET)
router.get('/', async (req, res) => {
  const tasks = await Task.find(); //saves fetch in a variable
  console.log(tasks);
  res.json(tasks); //Response to the browser
});

//Consulting specific task
router.get('/:id', async (req, res) => {
 const task = await Task.findById(req.params.id);
 res.json(task)
});

//Route to add new tasks (POST)
router.post('/', async(req, res) => {
  const {title, description} = req.body;
  const task = new Task({title, description});
  await task.save();
  res.json({status: 'Task Saved'})
});

//Updating new task (PUT)
router.put('/:id', async (req, res) => {
 const { title, description } = req.body;
 const newTask = {title, description};
 await Task.findByIdAndUpdate(req.params.id, newTask);
 res.json({status: 'Task updated'})
});

//Deleting new task
router.delete('/:id', async (req, res) => {
  const { title, description } = req.body;
  await Task.findByIdAndRemove(req.params.id);
  res.json({status: 'Task deleted'});
 });



module.exports = router; 