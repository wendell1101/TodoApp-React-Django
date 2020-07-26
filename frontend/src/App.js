import React from 'react';
import axios from 'axios'
import Todos from './components/Todos'
import Header from './components/Header'
import Footer from './components/Footer'

import './App.css'
class App extends React.Component{
  state={
    todos:[]
  }
  getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  handleAddTodo = (todo)=>{
    let csrftoken = this.getCookie('csrftoken');
    let todoJSON = JSON.stringify(todo)
   
    let url = 'http://localhost:8000/todo-create/'

    fetch(url,{
      method : 'POST',
      headers:{
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrftoken,
      },
      body: JSON.stringify(todo)
    })
    .then(res=>{
      this.fetchData()
    })
  }

  handleDelete = (id)=>{
    console.log(id)
    let url = `http://localhost:8000/todo-delete/${id}/`
    axios.delete(url)
    .then(res=>{
      this.fetchData()
    })
  }

  handleEditTodo = (todo)=>{
    let csrftoken = this.getCookie('csrftoken');
    let url = `http://localhost:8000/todo-update/${todo.id}/`
    let todoJSON = JSON.stringify(todo) 
    fetch(url,{
      method : 'PUT',
      headers:{
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrftoken,
      },
      body: JSON.stringify({'title':todo.title })
    })
    .then(res=>{
      this.fetchData()
    })
  }

  handleCompleted = (todo)=>{
    let csrftoken = this.getCookie('csrftoken');
    let url = `http://localhost:8000/todo-update/${todo.id}/`
    fetch(url,{
      method : 'PUT',
      headers:{
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrftoken,
      },
      body: JSON.stringify({'completed' : !todo.completed, 'title':todo.title})
    })
    .then(res=>{
      this.fetchData()
    })
  }

  fetchData = ()=>{
    axios.get('http://localhost:8000/todo-list/')
    .then(res=> {
      this.setState({todos:res.data})
    })
  }


  componentDidMount(){
    this.fetchData()
  }
  render(){
    return(
      <div>
         <Header />
         <div className="row justify-content-center " >
            <div className="col-md-5 p-4 todoContainer" >
              <Todos todos={this.state.todos} handleAddTodo = {this.handleAddTodo}
                handleDelete = {this.handleDelete}
                handleEditTodo = {this.handleEditTodo}
                handleCompleted = {this.handleCompleted}
              />
          </div>
          </div>
          <Footer />
      </div>
      
    )
  }
}

export default App;