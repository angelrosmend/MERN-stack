const express =  require('express');
const router = express.Router();

const Task = require('../models/task');


//Consulting tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find(); //saves fetch in a variable
  console.log(tasks);
  res.json(tasks); //Response to the browser
});

//Route to add tasks
router.post('/', async(req, res) => {
  const {title, description} = req.body;
  const task = new Task({title, description});
  await task.save()
  res.json({status: 'Task Saved'})
});

//
router.put('/:id', async (req, res) => {
 const { title, description } = req.body;
 const newTask = {title, description};
 await Task.findByIdAndUpdate(req.params.id, newTask);
 res.json({status: 'Task uploaded'})
});

module.exports = router; 