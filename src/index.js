import Storage from './storage';
import './style.css';

const dom = (() => {
  // The following selectors are dynamically generated (not affected by event listening):
  //   contentDiv: the parent of all dynamically generated data
  //   addProjectInput: input field used to create a new project
  //   addProjectButton: validate creation of project
  //   projectForm: select the project form
  //   projectName: renders the name of created project
  //   todos: will be a 2 dimensional array where rows represent todos from the same project
  const selectors = {
    body: document.querySelector('body'),
    projects: [],
    todos: [],
  };

  // create div the contains all dynamically generated data
  const createContentDiv = () => {
    selectors.contentDiv = document.createElement('div');
    selectors.contentDiv.setAttribute('id', 'content');
    selectors.body.appendChild(selectors.contentDiv);
  };

  // push to projects selector array the new created section that will contain project data
  const setNewProjectDiv = () => {
    selectors.projects.push(document.createElement('section'));
    // pushing an empty array that will contain todos related to this project
    selectors.todos.push([]);
  };

  // create the section that contains project related data
  const createProjectDiv = (index) => {
    selectors.projects[index].setAttribute('id', `0${index + 1}`);
    selectors.projects[index].setAttribute('class', 'project');
    selectors.contentDiv.appendChild(selectors.projects[index]);
  };

  // get last project section
  const getNewProjectDiv = () => selectors.projects[selectors.projects.length - 1];

  // generate input and add button for project creation
  const createInputField = () => {
    selectors.addProjectInput = document.createElement('input');
    selectors.addProjectInput.setAttribute('type', 'text');
    selectors.addProjectInput.setAttribute('id', 'add-project-input');
    return selectors.addProjectInput;
  };

  const createAddButton = () => {
    selectors.addProjectButton = document.createElement('button');
    selectors.addProjectButton.appendChild(document.createTextNode('New Project'));
    selectors.addProjectButton.setAttribute('id', 'add-project-button');
    return selectors.addProjectButton;
  };

  // appending newly created elements inside project section
  const createProjectForm = () => {
    selectors.projectForm = document.createElement('section');
    selectors.projectForm.setAttribute('id', 'project-form');
    selectors.projectForm.appendChild(createInputField());
    selectors.projectForm.appendChild(createAddButton());
    selectors.contentDiv.appendChild(selectors.projectForm);
  };

  // input validation
  const validateProjectInput = () => {
    if (selectors.addProjectInput.value === '') {
      selectors.addProjectInput.placeholder = "Project Name shouldn't be empty";
      selectors.addProjectInput.style.borderColor = 'red';
      return false;
    }
    return true;
  };

  // generate element that contains forms data and add-todo/remove buttons after project creation
  const createProjectNameElement = (name) => {
    selectors.projectName = document.createElement('h3');
    selectors.projectName.appendChild(document.createTextNode(name));
    selectors.projectName.setAttribute('id', `project-${selectors.projects.length}`);
    return selectors.projectName;
  };

  const createRemoveButton = () => {
    const removeProjectButton = document.createElement('button');
    removeProjectButton.setAttribute('id', `${selectors.projects.length}`);
    removeProjectButton.appendChild(document.createTextNode('Delete'));
    // For event listening remove btns
    removeProjectButton.setAttribute('class', 'remove-project-btns');
    return removeProjectButton;
  };

  const createAddTodoButton = () => {
    const addTodoButton = document.createElement('button');
    addTodoButton.appendChild(document.createTextNode('New Todo'));
    addTodoButton.setAttribute('class', 'add-todo-btn');
    return addTodoButton;
  };

  // append created html elements inside project Section
  const appendElementsInsideProject = (projectDiv, name) => {
    projectDiv.appendChild(createProjectNameElement(name));
    projectDiv.appendChild(createAddTodoButton());
    projectDiv.appendChild(createRemoveButton());
  };

  // store input value inside storage object
  const setProjectStorage = (index, value) => {
    Storage.setStorageProjectName(index, value);
    Storage.setStorageProjectTodos(index, []);
  };

  const refreshProjects = () => {
    selectors.projects.forEach(projectElement => {
      projectElement.remove();
    });
    selectors.projects = [];
  };

  const appendTodoValues = (todosInputs, todoObject, todoSection) => {
    todosInputs.forEach(input => {
      const p = document.createElement('p');
      p.setAttribute('class', input);
      // calling todo from localStorage
      p.appendChild(document.createTextNode(todoObject[input.toLowerCase()]));
      // append created element inside todo section
      todoSection.appendChild(p);
    });
  };

  const appendTodoBtn = (type, className, todoSection) => {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(type));
    button.setAttribute('class', className);
    todoSection.appendChild(button);
  };

  const appendElementsInsideTodo = (todosInputs, todoObject, todoSection) => {
    //   appending todo data inside section
    appendTodoValues(todosInputs, todoObject, todoSection);
    //   appending edit and remove buttons
    appendTodoBtn('Edit', 'edit-todo', todoSection);
    appendTodoBtn('Delete', 'delete-todo', todoSection);
  };

  //
  const renderTodosSection = (projectElement, todosInputs, todosObject) => {
    // render todos section that contains filled data
    todosObject.forEach(todoObject => {
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
    });
  };

  // render both projects and todos
  const renderProjectsAndTodos = (projects, todosInputs) => {
    projects.forEach((project, index) => {
      setNewProjectDiv();
      createProjectDiv(index);
      appendElementsInsideProject(getNewProjectDiv(), project.name);
      if (project.todos !== null || project.todos !== []) {
        renderTodosSection(getNewProjectDiv(), todosInputs, project.todos);
      }
    });
  };

  // add button click event Listner method
  const createProjectMacro = (e) => {
    e.preventDefault();
    if (validateProjectInput()) {
      const todosInputs = ['Title', 'Description', 'Date', 'priority', 'Note', 'Done'];
      Storage.newProject();
      setProjectStorage(Storage.getStorageProjectsLength() - 1, selectors.addProjectInput.value);
      // update localStorage
      localStorage.setItem('projects', JSON.stringify(Storage.getProjects()));
      refreshProjects();
      renderProjectsAndTodos(JSON.parse(localStorage.getItem('projects')), todosInputs);
      // reset input field
      selectors.addProjectInput.value = '';
    }
  };

  const createProjectEvent = () => {
    selectors.addProjectButton.addEventListener('click', createProjectMacro);
  };

  // remove button click event Listner method
  const removeProjectMacro = (e) => {
    if (e.target && e.target.className === 'remove-project-btns') {
      e.preventDefault();
      const todosInputs = ['Title', 'Description', 'Date', 'priority', 'Note', 'Done'];
      // delete project from storage
      Storage.deleteProjectFromStorage(parseInt(e.target.id, 10) - 1);
      // update localStorage
      localStorage.setItem('projects', JSON.stringify(Storage.getProjects()));
      refreshProjects();
      renderProjectsAndTodos(JSON.parse(localStorage.getItem('projects')), todosInputs);
    }
  };

  const removeProjectEvent = () => {
    document.addEventListener('click', removeProjectMacro);
  };

  // used to automatically fill form's date into today's date
  const dateNow = () => {
    const date = new Date();
    return (`${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`);
  };

  // input tag generator with label
  const todoFormInputGenerator = (container, title, type, value) => {
    const label = document.createElement('label');
    label.appendChild(document.createTextNode(title));
    const input = document.createElement('input');
    input.setAttribute('type', type);
    if (type === 'date') {
      input.setAttribute('value', dateNow());
    } else if (type === 'checkbox') {
      input.checked = value;
    } else {
      input.setAttribute('value', value);
    }
    container.appendChild(label);
    container.appendChild(input);
    // getting input element inside the new todos selector
    container[title] = input;
  };

  // select tag generator with label
  const todoFormSelectGenerator = (container, value) => {
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
    priority.selectedIndex = value;
    container.appendChild(label);
    container.appendChild(priority);
    // getting select element inside the new todos selector
    container.priority = priority;
  };

  // submit button generator
  const todoFormSubmitGenerator = (container) => {
    const submit = document.createElement('button');
    // adding class for event listening
    submit.setAttribute('class', 'add-todo');
    submit.appendChild(document.createTextNode('Submit'));
    container.appendChild(submit);
  };

  // generate from using previous methods
  const createTodoForm = (container) => {
    // todo title
    todoFormInputGenerator(container, 'Title', 'text', '');
    // todo description
    todoFormInputGenerator(container, 'Description', 'text', '');
    // todo date
    todoFormInputGenerator(container, 'Date', 'date', '');
    // todo Priority
    todoFormSelectGenerator(container, 1);
    // todo note
    todoFormInputGenerator(container, 'Note', 'text', '');
    // todo checkbox
    todoFormInputGenerator(container, 'Done', 'checkbox', '');
    // submit button
    todoFormSubmitGenerator(container);
  };

  // append the created form inside a form section
  const appendTodoForm = (container) => {
    // append html elements inside the new created section element
    createTodoForm(container);
    return container;
  };

  // add todo button click event Listner method
  const createTodoFormMacro = (e) => {
    if (e.target && e.target.className === 'add-todo-btn') {
      // condition to render only one form at once for each project
      if (e.target.parentNode.lastChild.className !== 'todo-form') {
        e.preventDefault();
        // creating a new section
        const formSection = document.createElement('section');
        formSection.setAttribute('class', 'todo-form');
        // append the section that contains todo form inside the project section
        e.target.parentNode.appendChild(appendTodoForm(formSection));
      }
    }
  };

  const createTodoFormEvent = () => {
    document.addEventListener('click', createTodoFormMacro);
  };

  // validation of todo from input
  const validateTodoFromInput = (todoFormElement, todosInputs) => {
    let errors = 0;
    todosInputs.forEach(input => {
      if (todoFormElement[input].value === '') {
        todoFormElement[input].style.borderColor = 'red';
        todoFormElement[input].placeholder = 'Please Fill out this field';
        errors += 1;
      }
    });
    return errors === 0;
  };

  // soring input values inside todo object of storage
  const storeInputValuesInsideTodoObject = (storageTodoObject, todoFormElement, todosInputs) => {
    todosInputs.forEach(input => {
      // storing values inside storage object
      const property = input.toLowerCase();
      if (input !== 'Done') {
        // eslint-disable-next-line max-len
        Storage.setStorageProjectTodoProps(storageTodoObject, property, todoFormElement[input].value);
      } else {
        // checkbox case
        // eslint-disable-next-line max-len
        Storage.setStorageProjectTodoProps(storageTodoObject, property, todoFormElement[input].checked);
      }
    });
  };

  const closeTodoForm = (todoFormElement) => {
    todoFormElement.remove();
  };

  const refreshTodos = (projectElement) => {
    let index = 0;
    while (index < projectElement.childNodes.length) {
      if (projectElement.childNodes[index].className === 'todo') {
        projectElement.childNodes[index].remove();
      } else {
        index += 1;
      }
    }
    selectors.todos[parseInt(projectElement.id, 10) - 1] = [];
  };

  const rerenderTodoSection = (projectElement, todosInputs, todoObject, todoSection) => {
    // append all html elements ralated to todo inside todo section
    appendElementsInsideTodo(todosInputs, todoObject, todoSection);
    //   appending todo section inside project section
    projectElement.appendChild(todoSection);
  };

  const deleteTodoRendredElements = (todo) => {
    todo.textContent = '';
  };

  const createTodoMacro = (e) => {
    if (e.target && e.target.className === 'add-todo') {
      e.preventDefault();
      const todosInputs = ['Title', 'Description', 'Date', 'priority', 'Note', 'Done'];
      if (validateTodoFromInput(e.target.parentNode, todosInputs)) {
        // selecting the project section
        const project = e.target.parentNode.parentNode;
        // selecting the todo section in case of edit or form in case of new todo
        const todoSection = e.target.parentNode;
        // declare storage todoInstance for localstorage
        let storageTodoInstance;
        // we check that the form is for creating a new instance or updating an existing one
        if (todoSection.id) {
          // remove form from dom first
          deleteTodoRendredElements(todoSection);
          // getting index of todo
          const todosIndex = todoSection.id.match(/\d+$/)[0];
          // getting project's todo object
          // eslint-disable-next-line max-len
          storageTodoInstance = Storage.getStorageProjectTodo(parseInt(project.id, 10) - 1, parseInt(todosIndex, 10) - 1);
          // updating input values inside todo instance
          storeInputValuesInsideTodoObject(storageTodoInstance, todoSection, todosInputs);
          // update localStorage
          localStorage.setItem('projects', JSON.stringify(Storage.getProjects()));
          // getting edited todo from updated local storage
          const todoLocalStorage = JSON.parse(localStorage.getItem('projects'))[parseInt(project.id, 10) - 1].todos[parseInt(todosIndex, 10) - 1];
          // re-render updated todo
          rerenderTodoSection(project, todosInputs, todoLocalStorage, todoSection);
        } else {
          // creating a new todo instance of the chosen project
          Storage.newTodo(parseInt(project.id, 10) - 1);
          // getting the new created todo object
          storageTodoInstance = Storage.getProjectLastTodo(parseInt(project.id, 10) - 1);
          // storing input values inside todo instance
          storeInputValuesInsideTodoObject(storageTodoInstance, todoSection, todosInputs);
          // update localStorage
          localStorage.setItem('projects', JSON.stringify(Storage.getProjects()));
          // getting updated localStorage todos of the specific project
          const todosLocalStorage = JSON.parse(localStorage.getItem('projects'))[parseInt(project.id, 10) - 1].todos;
          // refresh todos
          refreshTodos(project);
          // render todos
          renderTodosSection(project, todosInputs, todosLocalStorage);
          // remove form from dom
          closeTodoForm(todoSection);
        }
      }
    }
  };

  const createTodoEvent = () => {
    document.addEventListener('click', createTodoMacro);
  };

  const refillEditTodoForm = (container, todoObject) => {
    Object.entries(todoObject).forEach(propsVal => {
      if (propsVal[0] === 'title' || propsVal[0] === 'description' || propsVal[0] === 'note') {
        todoFormInputGenerator(container, propsVal[0].charAt(0).toUpperCase() + propsVal[0].slice(1), 'text', propsVal[1]);
      } else if (propsVal[0] === 'date') {
        todoFormInputGenerator(container, propsVal[0].charAt(0).toUpperCase() + propsVal[0].slice(1), 'date', propsVal[1]);
      } else if (propsVal[0] === 'done') {
        todoFormInputGenerator(container, propsVal[0].charAt(0).toUpperCase() + propsVal[0].slice(1), 'checkbox', propsVal[1]);
      } else if (propsVal[1] === 'high') {
        todoFormSelectGenerator(container, 0);
      } else if (propsVal[1] === 'medium') {
        todoFormSelectGenerator(container, 1);
      } else {
        todoFormSelectGenerator(container, 2);
      }
    });
  };

  const editTodoMacro = (e) => {
    if (e.target && e.target.className === 'edit-todo') {
      e.preventDefault();
      // selecting the project
      const project = e.target.parentNode.parentNode;
      // selecting the todo section
      const todo = e.target.parentNode;
      // remove rendred data
      deleteTodoRendredElements(todo);
      // getting index for selectors todos array
      const todosIndex = todo.id.match(/\d+$/)[0];
      // getting values of todo object
      // eslint-disable-next-line max-len
      const todoObject = Storage.getStorageProjectTodo(parseInt(project.id, 10) - 1, parseInt(todosIndex, 10) - 1);
      // refill&render todo form fields with previous todo data
      refillEditTodoForm(todo, todoObject);
      // render submit button
      todoFormSubmitGenerator(todo);
    }
  };

  const editTodoEvent = () => {
    document.addEventListener('click', editTodoMacro);
  };

  const removeTodoMacro = (e) => {
    if (e.target && e.target.className === 'delete-todo') {
      e.preventDefault();
      const todosInputs = ['Title', 'Description', 'Date', 'priority', 'Note', 'Done'];
      // selecting the project
      const project = e.target.parentNode.parentNode;
      // selecting the todo section
      const todo = e.target.parentNode;
      // refresh todos
      refreshTodos(project);
      // getting index for selectors todos array
      const todosIndex = todo.id.match(/\d+$/)[0];
      // delete todo instance
      Storage.deleteTodoFromStorage(parseInt(project.id, 10) - 1, parseInt(todosIndex, 10) - 1);
      // update localStorage
      localStorage.setItem('projects', JSON.stringify(Storage.getProjects()));
      // getting todos of that specific project from localStorage
      const todosLocalStorage = JSON.parse(localStorage.getItem('projects'))[parseInt(project.id, 10) - 1].todos;
      // render todos
      renderTodosSection(project, todosInputs, todosLocalStorage);
    }
  };

  const removeTodoEvent = () => {
    document.addEventListener('click', removeTodoMacro);
  };

  // render local storage data at page load
  const renderLocalStorageDataMacro = (e) => {
    e.preventDefault();
    const todosInputs = ['Title', 'Description', 'Date', 'priority', 'Note', 'Done'];
    let projects = JSON.parse(localStorage.getItem('projects'));
    if (projects === null || projects.length === 0 || (projects.length === 1 && projects[0].name === 'Default' && projects[0].todos.length === 0)) {
      // create default project
      Storage.newProject();
      setProjectStorage(Storage.getStorageProjectsLength() - 1, 'Default');
      // update localStorage
      localStorage.setItem('projects', JSON.stringify(Storage.getProjects()));
      // getting new value
      projects = JSON.parse(localStorage.getItem('projects'));
    } else {
      // filling storage object with localStorage data
      Storage.setProjects(JSON.parse(localStorage.getItem('projects')));
    }
    renderProjectsAndTodos(projects, todosInputs);
  };

  const renderLocalStorageDataEvent = () => {
    document.addEventListener('DOMContentLoaded', renderLocalStorageDataMacro);
  };

  const runApp = () => {
    createContentDiv();
    createProjectForm();
    renderLocalStorageDataEvent();
    createProjectEvent();
    removeProjectEvent();
    createTodoFormEvent();
    createTodoEvent();
    editTodoEvent();
    removeTodoEvent();
  };

  return { runApp };
})();

dom.runApp();