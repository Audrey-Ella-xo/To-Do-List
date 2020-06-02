import Project from './project';
const dom = (() => {
 const state = {
 projects: []
 };
 // The following selectors are dynamically generated:
 // contentDiv: the parent of all dynamically generated data
 // addProjectInput: input field used to create a new project
 // addProjectButton: validate creation of project
 // projectName: renders the name of created project
 // removeProjectBtns: delete created projects
 const selectors = {
 body: document.querySelector('body'),
 projects: []
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
 }

 // create the section that contains project related data
 const createProjectDiv = (index) => {
    selectors.projects[index].setAttribute('id', `${index + 1}`);
   // selectors.projects[index - 1].setAttribute('class', 'project');
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
    const validateInput = () => {
    if (selectors.addProjectInput.value === ''){
    selectors.addProjectInput.placeholder = "Project Name shouldn't be empty";
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
        if (validateInput()){
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
    // projectElement.remove();
    // });
    state.projects.forEach( (project, i) => {
    createProjectDiv(i);
    // renderProjectDiv(selectors.projects[i], project.getName());
    } );
    }
   
    // const removeProjectMacro = (e) => {
    // if (e.target && e.target.className === 'remove-project-btns'){
    // e.preventDefault;
    // console.log('deleted:', state.projects[parseInt(e.target.id, 10) - 1].getName());
    // console.log('id', parseInt(e.target.id, 10));
    // console.log('element', e.target.value);
    // state.projects.splice(parseInt(e.target.id, 10) - 1, 1);
    // console.log('left:');
    // state.projects.forEach( test => {
    // console.log(test.getName());
    // } );
    // selectors.projects[parseInt(e.target.id, 10) - 1].childNodes.forEach( node => {
    // node.remove();
    // });
    // selectors.projects[parseInt(e.target.id, 10) - 1].remove();
    // selectors.projects.splice(parseInt(e.target.id, 10) - 1, 1);
    // reRenderProjects();
    // }
    // }
   
    const removeProjectMacro = (e) => {
    if (e.target && e.target.className === 'remove-project-btns'){
    e.preventDefault;
    state.projects[parseInt(e.target.id, 10) - 1].setName('');
 selectors.projects[parseInt(e.target.id, 10) - 1].remove();
}
}

const removeProjectEvent = () => {
document.addEventListener('click', removeProjectMacro);
}
return {
createContentDiv,
createProjectForm,
createProjectEvent,
removeProjectEvent
}
})();
dom.createContentDiv();
dom.createProjectForm();
dom.createProjectEvent();
dom.removeProjectEvent();