import Project from './project';
const dom = (() => {
  const state = {
      projects: []
  };

  // The following selectors are dynamically generated (not affected by event listening):
  //   contentDiv: the parent of all dynamically generated data
  //   addProjectInput: input field used to create a new project
  //   addProjectButton: validate creation of project
  //   projectForm: select the project form
  //   projectName: renders the name of created project
  //   todoes: will be a 2 dimensional array where rows represent todos that are from the same project
  const selectors = {
    body: document.querySelector('body'),
    projects: [],
    todos: []
  };
// generate an instance of project using the factory function Project
const newProject = () => {
    state.projects.push(Project());
}
// create div the contains all dynamically generated data
const createContentDiv = () => {
    selectors.contentDiv = document.createElement('div');
    selectors.contentDiv.setAttribute('id', 'content');
    selectors.body.appendChild(selectors.contentDiv);
}
// push to new selector array the new created section that will contain project data
const setNewProjectDiv = () => {
    selectors.projects.push(document.createElement('section'));
    // pushing an empty array that will contain todos related to this project
    selectors.todos.push([]);
}
// create the section that contains project related data
const createProjectDiv = (index) => {
   selectors.projects[index].setAttribute('id', `0${index + 1}`);
   selectors.projects[index].setAttribute('class', 'project');
   selectors.contentDiv.appendChild(selectors.projects[index]);
}
// getters for project object and its html element
const getNewProjectDiv = () => {
    return selectors.projects[selectors.projects.length - 1];
}
const getNewProjectState = () => {
  return state.projects[state.projects.length - 1];
}
// generate input and add button for project creation
const createInputField = () => {
    selectors.addProjectInput = document.createElement('input');
    selectors.addProjectInput.setAttribute('type', 'text');
    selectors.addProjectInput.setAttribute('id', `add-project-input`);
    return selectors.addProjectInput;
}
const createAddButton = () => {
    selectors.addProjectButton = document.createElement('button');
    selectors.addProjectButton.appendChild(document.createTextNode('New Project'));
    selectors.addProjectButton.setAttribute('id', `add-project-button`);
    return selectors.addProjectButton;
}
// appending newly created elements inside project section
const createProjectForm = () => {
  selectors.projectForm = document.createElement('section');
  selectors.projectForm.setAttribute('id', 'project-form');
  selectors.projectForm.appendChild(createInputField());
  selectors.projectForm.appendChild(createAddButton());
  selectors.contentDiv.appendChild(selectors.projectForm);
}
// input validation
const validateProjectInput = () => {
    if (selectors.addProjectInput.value === ''){
      selectors.addProjectInput.placeholder = "Project Name shouldn't be empty";
      selectors.addProjectInput.style.borderColor = 'red';
      return false;
    }
    return true;
}
// generate project title and remove button after project creation
const createProjectNameElement = (name) => {
  selectors.projectName = document.createElement('h3');
  selectors.projectName.appendChild(document.createTextNode(name));
  selectors.projectName.setAttribute('id', `project-${selectors.projects.length}`);
  return selectors.projectName;
}
const createRemoveButton = () => {
  const removeProjectButton = document.createElement('button');
  removeProjectButton.setAttribute('id', `${selectors.projects.length}`);
  removeProjectButton.appendChild(document.createTextNode('Delete'));
  // For event listening remove btns
  removeProjectButton.setAttribute('class', 'remove-project-btns');
  return removeProjectButton;
}
// render the created project
const renderProjectDiv = (projectDiv, name) => {
  projectDiv.appendChild(createProjectNameElement(name));
  projectDiv.appendChild(createRemoveButton());
}
// add button click event Listner method
const createProjectMacro = (e) => {
  e.preventDefault;
  newProject();
  if (validateProjectInput()){
    setNewProjectDiv();
    createProjectDiv(selectors.projects.length - 1);
    getNewProjectState().setName(selectors.addProjectInput.value);
    renderProjectDiv(getNewProjectDiv(), selectors.addProjectInput.value);
    // reset input field
    selectors.addProjectInput.value = '';
  }
}
const createProjectEvent = () => {
  selectors.addProjectButton.addEventListener('click', createProjectMacro);
}
const reRenderProjects = () => {
  // selectors.projects.forEach( projectElement => {
  //     projectElement.remove();
  // });
  state.projects.forEach( (project, i) => {
      createProjectDiv(i);
      // renderProjectDiv(selectors.projects[i], project.getName());
  } );
}
// event.target.id fails to update value after dynamically
// removing a section and re-rendring since the event.target.id 
// will still returns old value this why rather than deleting project objects
// we will empty them so when we use local storage we will filter them using
// an 'if' statement
const removeProjectMacro = (e) => {
  if (e.target && e.target.className === 'remove-project-btns'){
    e.preventDefault();
    // project object name property will be an empty string
    state.projects[parseInt(e.target.id, 10) - 1].setName('');
    // we will reset todos associated to this project
    state.projects[parseInt(e.target.id, 10) - 1].resetTodos();
    selectors.projects[parseInt(e.target.id, 10) - 1].remove();
  }
}
const removeProjectEvent = () => {
  document.addEventListener('click', removeProjectMacro);
}
// used to automatically fill form's date into today's date
const dateNow = () => {
  const date = new Date();
  return(`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`)
}
const todoFormInputGenerator = (container, title, type) => {
  const label = document.createElement('label');
  label.appendChild(document.createTextNode(title));
  const input = document.createElement('input');
  input.setAttribute('type', type);
  if (type === 'date'){
    input.setAttribute('value', dateNow());
  }
  container.appendChild(label);
  container.appendChild(input);
  // getting input element inside the new todos selector
  container[title] = input;
}
const todoFormSelectGenerator = (container) => {
  const label = document.createElement('label');
  label.appendChild(document.createTextNode('Priority:'));
  const priority = document.createElement('select');
  const option1 = document.createElement('option');
  option1.appendChild(document.createTextNode('High'));
  option1.setAttribute('value', 'high');
  const option2 = document.createElement('option');
  option2.appendChild(document.createTextNode('Medium'));
  option2.setAttribute('value', 'medium');
  const option3 = document.createElement('option');
  option3.appendChild(document.createTextNode('Low'));
  option3.setAttribute('value', 'low');
  priority.appendChild(option1);
  priority.appendChild(option2);
  priority.appendChild(option3);
  container.appendChild(label);
  container.appendChild(priority);
  // getting select element inside the new todos selector
  container.priority = priority;
}
const todoFormSubmitGenerator = (container) => {
  const submit = document.createElement('button');
  // adding class for event listening
  submit.setAttribute('class', 'add-todo');
  submit.appendChild(document.createTextNode('Submit'));
  container.appendChild(submit);
}
const createTodoForm = (container) => {
  // todo title
  todoFormInputGenerator(container, 'Title', 'text');
  // todo description
  todoFormInputGenerator(container, 'Description', 'text');
  // todo date
  todoFormInputGenerator(container, 'Date', 'date');
  // todo Priority
  todoFormSelectGenerator(container);
  // todo note
  todoFormInputGenerator(container, 'Note', 'text');
  // todo checkbox
  todoFormInputGenerator(container, 'Done', 'checkbox');
  // submit button
  todoFormSubmitGenerator(container);
}
const appendTodoForm = (container) => {
  // append html elements inside the new created section element
  createTodoForm(container);
  return container;
}
const createTodoFormMacro = (e) => {
  if (e.target && e.target.className === 'project'){
    // condition to render only one form at once for each project
    if (e.target.lastChild.className !== 'todo-form'){
      e.preventDefault();
      // creating a new section
      const formSection = document.createElement('section');
      formSection.setAttribute('class', 'todo-form');
      // append the section that contains todo form inside the project section
      e.target.appendChild(appendTodoForm(formSection));
    }
  }
}
const createTodoFormEvent = () => {
  document.addEventListener('click', createTodoFormMacro);
}
// validation of todo from input
const validateTodoFromInput = (todoFormElement, todosInputs) => {
  let errors = 0;
  todosInputs.forEach( input => {
    if (todoFormElement[input].value === '') {
      todoFormElement[input].style.borderColor = 'red';
      todoFormElement[input].placeholder = 'Please Fill out this field';
      errors += 1;
    }
  } );
  return errors === 0 ? true : false;
}
// soring input values inside todo object 
const storeInputValuesInsideTodoObject = (todoObject, todoFormElement, todosInputs) => {
  todosInputs.forEach( (input, index) => {
    // calling all setters of Todo factory to store input data
    if (input !== 'Done'){
      todoObject.todoSetters[index](todoFormElement[input].value);
    }
    else {
      // checkbox case
      todoObject.todoSetters[index](todoFormElement[input].checked);
    }
  });
}
const closeTodoForm = (todoFormElement) => {
  todoFormElement.remove();
}
const appendTodoValues = (todosInputs, todoObject, todoSection) => {
  todosInputs.forEach( (input, index) => {
    const p = document.createElement('p');
    p.setAttribute('class', input);
    // calling all getters of Todo factory to get stored input data
    p.appendChild(document.createTextNode(todoObject.todoGetters[index]()));
    // append created element inside todo section
    todoSection.appendChild(p);
  });
}
const appendTodoBtn = (type, className, todoSection) => {
  const button = document.createElement('button');
  button.appendChild(document.createTextNode(type));
  button.setAttribute('class', className);
  todoSection.appendChild(button);
}

const appendElementsInsideTodo = (todosInputs, todoObject, todoSection) => {
  //   appending todo data inside section
  appendTodoValues(todosInputs, todoObject, todoSection);
  //   appending edit and remove buttons
  appendTodoBtn('Edit' ,'edit-todo', todoSection);
  appendTodoBtn('Delete', 'delete-todo', todoSection);
}

// 
const renderTodoSection = (projectElement, todosInputs, todoObject) => {
  // render new todo section that contains filled data
  //   creating a new section
  const todoSection = document.createElement('section');
  const projectTodos = selectors.todos[parseInt(projectElement.id, 10) - 1];
  todoSection.setAttribute('class', 'todo');
  todoSection.setAttribute('id', `${projectElement.id}-${(projectTodos.length + 1)}`);
  // append all html elements ralated to todo inside todo section
  appendElementsInsideTodo(todosInputs, todoObject, todoSection);
  //   pushing todo section to todo selector at the related project row
  projectTodos.push(todoSection);
  //   appending todo section inside project section
  projectElement.appendChild(todoSection);
}

const rerenderTodoSection = (projectElement, todosInputs, todoObject, todoSection) => {
  // select array that contains all todos html elements related to the project that had event dispatched
  const projectTodos = selectors.todos[parseInt(projectElement.id, 10) - 1];
  // append all html elements ralated to todo inside todo section
  appendElementsInsideTodo(todosInputs, todoObject, todoSection);
  //   appending todo section inside project section
  projectElement.appendChild(todoSection);
}

const createTodoMacro = (e) => {
  if (e.target && e.target.className === 'add-todo') {
    e.preventDefault();
    const todosInputs = ['Title', 'Description', 'Date', 'priority', 'Note', 'Done'];
    if (validateTodoFromInput(e.target.parentNode, todosInputs)) {
      // selecting the project section
      const project = e.target.parentNode.parentNode;
      // selecting the todo section in case of edit or form in case of new todo
      const todoSection = e.target.parentNode;
      // declare todoInstance for later use
      let todoInstance;
      // we check that the form is for creating a new instance or updating an existing one
      if (todoSection.id){
        // remove form from dom first
        deleteTodoRendredElements(todoSection);
        // getting index of todo
        const todosIndex = todoSection.id.match(/\d+$/)[0];
        // getting project's todo object
        todoInstance = state.projects[parseInt(project.id, 10) - 1].getTodos()[parseInt(todosIndex, 10) -1];
        // updating input values inside todo instance
        storeInputValuesInsideTodoObject(todoInstance, todoSection, todosInputs);
        // re-render updated todo
        rerenderTodoSection(project, todosInputs, todoInstance, todoSection);

      }
      else {
        // creating a new todo instance of the chosen project
        state.projects[parseInt(project.id, 10) - 1].newProjectTodo();
        // getting the new created todo object
        todoInstance = state.projects[parseInt(project.id, 10) - 1].getLastTodo();
        // storing input values inside todo instance
        storeInputValuesInsideTodoObject(todoInstance, todoSection, todosInputs);
        // render created todo
        renderTodoSection(project, todosInputs, todoInstance);
        // remove form from dom
        closeTodoForm(todoSection);
      }
    }
  }
}
const createTodoEvent = () => {
  document.addEventListener('click', createTodoMacro);
}
const deleteTodoRendredElements = (todo) => {
  todo.textContent = '';
}

const editTodoMacro = (e) => {
  if (e.target && e.target.className === 'edit-todo'){
    e.preventDefault();
    // selecting the project section
    const project = e.target.parentNode.parentNode;
    // selecting the todo section
    const todo = e.target.parentNode;
    // remove rendred data
    deleteTodoRendredElements(todo);
      // re-render todo form
      createTodoForm(todo);
    }
  }
  const editTodoEvent = () => {
    document.addEventListener('click', editTodoMacro);
  }
  const removeTodoMacro = (e) => {
    if (e.target && e.target.className === 'delete-todo'){
      e.preventDefault();
      // selecting the project section
      const project = e.target.parentNode.parentNode;
      // selecting the todo section
      const todo = e.target.parentNode;
      // getting index for selectors todos array
      const todosIndex = todo.id.match(/\d+$/)[0];
      // reset todo instance
      state.projects[parseInt(project.id, 10) - 1].resetTodo(parseInt(todosIndex, 10) - 1);
      selectors.todos[parseInt(project.id, 10) - 1][parseInt(todosIndex, 10) - 1].remove();
    }
  }

  const removeTodoEvent = () => {
    document.addEventListener('click', removeTodoMacro);
  }


  const runApp = () => {
    createContentDiv();
    createProjectForm();
    createProjectEvent();
    removeProjectEvent();
    createTodoFormEvent();
    createTodoEvent();
    editTodoEvent();
    removeTodoEvent();
  }

  return { runApp }
})();

dom.runApp();