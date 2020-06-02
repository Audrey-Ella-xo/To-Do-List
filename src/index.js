import Project from './project';
const dom = (() => {
  const state = {
      projects: []
  };
  // The following selectors are dynamically generated:
  //   contentDiv: the parent of all dynamically generated data
  //   addProjectInput: input field used to create a new project
  //   addProjectButton: validate creation of project
  //   projectName: renders the name of created project
  //   removeProjectBtns: delete created projects
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
// removing a section and re-rendring the event.target.id will still returns
// old value

// const removeProjectMacro = (e) => {
//   if (e.target && e.target.className === 'remove-project-btns'){
//     e.preventDefault;
//     console.log('deleted:', state.projects[parseInt(e.target.id, 10) - 1].getName());
//     console.log('id', parseInt(e.target.id, 10));
//     console.log('element', e.target.value);
//     state.projects.splice(parseInt(e.target.id, 10) - 1, 1);
//     console.log('left:');
//     state.projects.forEach( test => {
//         console.log(test.getName());
//     } );
//     selectors.projects[parseInt(e.target.id, 10) - 1].childNodes.forEach( node => {
//       node.remove();
//     });
//     selectors.projects[parseInt(e.target.id, 10) - 1].remove();
//     selectors.projects.splice(parseInt(e.target.id, 10) - 1, 1);
//     reRenderProjects();
//   }
// }
const removeProjectMacro = (e) => {
 if (e.target && e.target.className === 'remove-project-btns'){
   e.preventDefault();
   // project object name property will be an empty string
   // check line 141 and the used implementation there
   state.projects[parseInt(e.target.id, 10) - 1].setName('');
   // we will use the same approach for todos related to that project
   state.projects[parseInt(e.target.id, 10) - 1].resetTodos();
   selectors.projects[parseInt(e.target.id, 10) - 1].remove();
 }
}
const removeProjectEvent = () => {
 document.addEventListener('click', removeProjectMacro);
}
const todoFormInputGenerator = (container, title, type) => {
 const label = document.createElement('label');
 label.appendChild(document.createTextNode(title));
 const input = document.createElement('input');
 input.setAttribute('type', type);
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

  // 
  const renderTodoSection = (todoFormElement, projectElement, todosInputs, todoObject) => {
   // render new todo section that contains filled data
   //   creating a new section
   const todoSection = document.createElement('section');
   todoSection.setAttribute('class', 'todo');
   //   appending todo data inside section
   appendTodoValues(todosInputs, todoObject, todoSection);
   //   appending edit and remove buttons
   appendTodoBtn('Edit' ,'edit-todo', todoSection);
   appendTodoBtn('Delete', 'delete-todo', todoSection);
   //   pushing todo section to todo selector at the related project row
   selectors.todos[parseInt(projectElement.id, 10) - 1].push(todoSection);
   //   appending todo section inside project section
   projectElement.appendChild(todoSection);
   // remove form from dom
   closeTodoForm(todoFormElement);
 }

 const createTodoMacro = (e) => {
   if (e.target && e.target.className === 'add-todo') {
     e.preventDefault();
     const todosInputs = ['Title', 'Description', 'Date', 'priority', 'Note', 'Done'];
     if (validateTodoFromInput(e.target.parentNode, todosInputs)) {
       // selecting the project section
       const project = e.target.parentNode.parentNode;
       // creating a new todo instance of the chosen project
       state.projects[parseInt(project.id, 10) - 1].newProjectTodo();
       // storing input values inside the new created todo instance
       storeInputValuesInsideTodoObject(state.projects[parseInt(project.id, 10) - 1].getLastTodo(), e.target.parentNode, todosInputs);
        // close form and render the new created todo
        renderTodoSection(e.target.parentNode, project, todosInputs, state.projects[parseInt(project.id, 10) - 1].getLastTodo());
      }
    }
  }
  const createTodoEvent = () => {
    document.addEventListener('click', createTodoMacro);
  }
  return {
    createContentDiv,
    createProjectForm,
    createProjectEvent,
    removeProjectEvent,
    createTodoFormEvent,
    createTodoEvent
  }
})();
dom.createContentDiv();
dom.createProjectForm();
dom.createProjectEvent();
dom.removeProjectEvent();
dom.createTodoFormEvent();
dom.createTodoEvent();