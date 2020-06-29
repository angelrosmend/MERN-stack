import React, { Component } from 'react';

class App extends Component {

 constructor() {
  super()
 
  this.state = {
    id_: '',
    title: '',
    description: '',
    tasks: []
  };
  this.addTask = this.addTask.bind(this);
  this.handleChange = this.handleChange.bind(this)
 }
 
 addTask(e){
   if(this.state._id){
     fetch(`/api/task/${this.state._id}`,
     {
       method: 'PUT',
       body: JSON.stringify(this.state),
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
     })
     .then(res => res.json())
     .then(data => {
      console.log(data)
      M.toast({html: 'Task Updated'});
      this.setState({title: '', description: '',_id: ''});
      this.fetchTask();
     })
   }else{
    fetch('/api/task', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
     console.log(data)
     M.toast({html: 'Task saved'})
     this.setState({title: '', description: ''}); 
     this.fetchTask();
    })
    .catch(err => console.error(err))
   }
  e.preventDefault();
 }

 componentDidMount() {
   this.fetchTask();
 }
 fetchTask() {
   fetch('/api/task')
   .then(res => res.json())
   .then(data =>{
    this.setState({tasks: data});
    console.log(this.state.tasks)
   });
 }

 deleteTask(id){
if (confirm('Are you sure you want to delete this task?')){
  fetch(`/api/task/${id}`, {
    method: 'DELETE',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }
  })
  
  .then(res => res.json())
  .then(data => {
   console.log(data);
   this.fetchTask();
   M.toast({html: 'Task Deleted'});
  })
}
}

editTask(id){
  fetch(`/api/task/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          _id: data._id,
          title: data.title,
          description: data.description
        })
      })
}

 handleChange(e) {
  const { name, value} = e.target;
  this.setState({
    [name]: value
  })
 }


 render() {
  return (
    <div>
     {/*NAVIGATION*/}
     <nav className="light-blue darken-4">
      <div className="container">
       <a className="brand-logo" href="/">MERN STACK</a>
      </div>
     </nav>

     <div className="container">
      <div className="row">
       <div className="col s5">
        <div className="card">
         <div className="card-content">
          <form onSubmit={this.addTask}>
           <div className="row">
            <div className="input-field col s12">
             <input onChange={this.handleChange}
                    name="title" 
                    type="text" 
                    value={this.state.title}
                    placeholder="Task title"/>
            </div>
           </div>
           <div className="row">
            <div className="input-field col s12">
             <textarea onChange={this.handleChange}
                       value={this.state.description}
                       name="description"
                       placeholder="Task description"
                       className="materialize-textarea">
             </textarea>
            </div>
           </div>
           <button type="submit" 
                  className="btn light-blue darken-4">
            Send
           </button>
          </form>
         </div>
        </div>

       </div>
       <div className="col s7">
         <table>
           <thead>
             <tr>
               <th>Title</th>
               <th>Description</th>
             </tr>
           </thead>
           <tbody>
             {
               this.state.tasks.map(task => {
                 return (
                   <tr key={task._id}>
                     <td>{task.title}</td>
                     <td>{task.description}</td>
                     <td>
                       <button className="btn light-blue darken-4"
                               style={{margin: '2px'}}
                               onClick={() => this.deleteTask(task._id)}>
                         <i className="material-icons">delete</i>
                       </button>
                       <button className="btn light-blue darken-4"
                               style={{margin: '2px'}}
                               onClick={() => this.editTask(task._id)}>
                       <i className="material-icons">edit</i>
                       </button>
                     </td>
                   </tr>
                 )
               })
             }
           </tbody>
         </table>
       </div>
      </div> 
     </div>
    </div>
  )
 }
}

export default App