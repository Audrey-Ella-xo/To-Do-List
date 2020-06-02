import Project from './project';

const dom = (() => {
  const state = {
      projects: []
  };

  const bodySelector = document.querySelector('body');

  const newProject = () => {
      this.state.projects.push(Project());
  }

  const createContentDiv = () => {
      const div = document.createElement('div');
      div.setAttribute('id', 'content');
      bodySelector.appendChild(div);
  }

  return {
    createContentDiv
  }
})();

dom.createContentDiv();