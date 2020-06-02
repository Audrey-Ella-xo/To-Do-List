import Todo from './todo';
const Project = () => {
  const state = {
      todos: []
  };
  const setName = (name) => {
      state.name = name;
  }
  const getName = () => {
      return state.name;
  }
  const newTodo = () => {
      return Todo();
  }
  const newProjectTodo = () => {
      state.todos.push(newTodo());
  }
  // reset all todos
  const resetTodos = () => {
    state.todos = [];
  }
  
  // reset a specific todo
  const resetTodo = (index) => {
      state.todos[index] = '';
  }
  
  const getTodos = () => {
      return state.todos;
  }
  const getTodosLength = () => {
      return state.todos.length;
  }
  const getLastTodo = () => {
      return state.todos[getTodosLength() - 1];
  }
  return {
    setName,
    getName,
    newProjectTodo,
    resetTodos,
    resetTodo,
    getTodos,
    getLastTodo
  }
}
export default Project;