const Todo = () => {
    const state = {};
   
    const setTitle = (title) => {
    this.state.title = title;
    }
   
    const getTitle = () => {
    return this.state.title;
    }
   
    const setDescription = (description) => {
    this.state.description = description;
    }
   
    const getDescription = () => {
    return this.state.description;
    }
   
    const setDate = (date) => {
    this.state.date = date;
    }
   
    const getDate = () => {
    return this.state.date;
    }
   
    const setPriority = (priority) => {
    this.state.priority = priority;
    }
   
    const getPriority = () => {
    return this.state.priority;
    }
   
    const setNotes = (notes) => {
    this.state.notes = notes;
    }
   
    const getNotes = () => {
    return this.state.notes;
    }
   
    const setChecklist = (checklist) => {
    this.state.checklist = checklist;
    }
   
    const getChecklist = () => {
    return this.state.checklist;
    }
   
    return {
    setTitle,
    setDescription,
    setDate,
    setPriority,
    setNotes,
    setChecklist,
    getTitle,
    getDescription,
    getDate,
    getPriority,
    getNotes,
    getChecklist
    }
   }
   
   export default Todo;