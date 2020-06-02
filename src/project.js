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

  // reset all todos properties ralated to a project
  const resetTodos = () => {
      state.todos.forEach( todo => {
        todo.todoSetters.forEach( (setter, index) => {
          index !== (todo.todoSetters.length - 1) ? setter('') : setter(false);
        });
      });
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
      getTodos,
      getTodosLength,
      getLastTodo
  }
}
export default Project;