// import Project from './project';
const Storage = (() => {
  const state = {
    projects: [],
  };

  const newProject = () => {
    state.projects.push({});
  };

  const newTodo = (projectIndex) => {
    state.projects[projectIndex].todos.push({});
  };

  const getProjects = () => state.projects;

  const setProjects = (array) => {
    state.projects = array;
  };

  const getStorageProjectsLength = () => state.projects.length;

  const setStorageProjectName = (index, value) => {
    state.projects[index].name = value;
  };

  const getStorageProjectName = (index) => state.projects[index].name;

  const setStorageProjectTodos = (index, array) => {
    state.projects[index].todos = array;
  };

  const getStorageProjectTodos = (index) => state.projects[index].todos;

  const deleteProjectFromStorage = (index) => {
    state.projects.splice(index, 1);
  };

  const getStorageProjectTodo = (pIndex, tIndex) => state.projects[pIndex].todos[tIndex];

  const setStorageProjectTodoProps = (todo, prop, value) => {
    todo[prop] = value;
  };

  const getTodoLength = (projectIndex) => state.projects[projectIndex].todos.length;

  const getProjectLastTodo = (pIndex) => state.projects[pIndex].todos[getTodoLength(pIndex) - 1];

  const deleteTodoFromStorage = (projectIndex, todoIndex) => {
    state.projects[projectIndex].todos.splice(todoIndex, 1);
  };


  return {
    newProject,
    newTodo,
    getProjects,
    setProjects,
    getStorageProjectsLength,
    setStorageProjectName,
    getStorageProjectName,
    setStorageProjectTodos,
    getStorageProjectTodos,
    deleteProjectFromStorage,
    getStorageProjectTodo,
    setStorageProjectTodoProps,
    getProjectLastTodo,
    deleteTodoFromStorage,
  };
})();

export default Storage;