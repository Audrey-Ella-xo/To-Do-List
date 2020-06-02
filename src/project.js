import Todo from './todo';

const Project = () => {
 state = {
 todos: []
 };

 const newTodo = () => {
 return Todo();
 }

 const newProjectTodo = () => {
 this.state.todos.push(newTodo());
 }

 return {
 state,
 newProjectTodo
 }
}

export default Project;