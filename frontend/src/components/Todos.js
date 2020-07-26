import React, { Component } from 'react'
import Todo from './Todo'

export class Todos extends Component {
    state={
        activeItem:{
            id:null,
            title:'',
            completed:false
        }
       
    }

    handleTitle = (e)=>{
       this.setState({
           activeItem:{
               ...this.state.activeItem,
               [e.target.id]: e.target.value
           }
           
       })
       console.log(this.state.activeItem.title)
    }
    
    handleOnSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.activeItem)
        this.props.handleAddTodo(this.state.activeItem)
        this.props.handleEditTodo(this.state.activeItem)
        // this.props.handleCompleted(this.state.activeItem)

        this.setState({
            activeItem:{
                id:null,
                title:'',
                completed:false
            }
        })
       
    }
    handleEdit = (todo)=>{
        this.setState({
            activeItem:todo
        })
       
    }

   
    render() {
        const {todos} = this.props
        const todoList = todos.length ? (
            todos.map(todo=>{
                return(
                    <Todo key={todo.id} todo={todo} handleDelete={this.props.handleDelete}
                    handleEdit = {this.handleEdit} handleCompleted = {this.props.handleCompleted}
                    />
                )
            })
        ) : (
            <div>
                <h1 className="text-dark text-center">No Task Yet</h1>
            </div>
        )
        return (
            <div className="">
                 <form onSubmit={this.handleOnSubmit} className="form">
                    <input type="text" id="title" onChange={this.handleTitle} 
                    value={this.state.activeItem.title} className="form-control mb-3"/><br/>
                    <button type="submit" className="btn btn-success">Add</button>
                </form>
                {todoList}
           </div>
        )
    }
}

export default Todos
