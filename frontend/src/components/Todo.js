import React from 'react'

const Todo = (props)=>{
    const markComplete = {
            textDecoration: props.todo.completed ? 'line-through' : 'none',
            color: props.todo.completed ? '#f4f4f4' : '#333'
        }
    return(
        <ul className="list-group">
            <li className="list-group-item mt-2 d-flex list"  >
                <p style={markComplete} onClick={props.handleCompleted.bind(this,props.todo)}> 
                    {props.todo.title}
                </p>
                <div className="ml-auto">
                    <button onClick={props.handleDelete.bind(this,props.todo.id)}
                    className={props.todo.completed ? 'btn btn-complete mr-2' :'btn btn-danger mr-2'}>Delete</button>
                    <button onClick={props.handleEdit.bind(this,props.todo)}
                    className={props.todo.completed ? 'btn btn-complete mr-2' :'btn btn-info mr-2'}
                    >Edit</button>
                </div>
                
            </li>
           
        </ul>
    )
}
export default Todo
