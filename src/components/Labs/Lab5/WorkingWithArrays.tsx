import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,

  });

  return (
    <div id="wd-working-with-arrays">
     <h3>Creating new Items in an Array</h3>
  <a id="wd-retrieve-completed-todos" className="btn btn-primary"
     href={`${API}/create`}>
    Create Todo
  </a><hr/>
  <h3>Deleting from an Array</h3>
<a id="wd-retrieve-completed-todos" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
   Delete Todo with ID = {todo.id} </a>
<FormControl defaultValue={todo.id} className="w-50" onChange={(e) => setTodo({ ...todo, id: e.target.value })}/><hr/>
<h3>Updating an Item in an Array</h3>
      <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
        Update Todo</a>
      <FormControl defaultValue={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
      <FormControl defaultValue={todo.title} className="w-50 float-start"
             onChange={(e) => setTodo({ ...todo, title: e.target.value }) }/>
      <br /><br /><hr />


      <h3>completed an Item in an Array</h3>
      <a href={`${API}/${todo.id}/completed/true`} className="btn btn-primary float-end">
      completed Todo</a>
      <FormControl defaultValue={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
      
      <br /><br /><hr />



      <h3>Updating an Item'description in an Array</h3>
      <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary float-end">
      Updating an Item'description</a>
      <FormControl defaultValue={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
      <FormControl defaultValue={todo.description} className="w-50 float-start"
             onChange={(e) => setTodo({ ...todo, description: e.target.value }) }/>
      <br /><br /><hr />
    </div>
);}

