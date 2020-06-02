const Todo = () => {
    const state = {};
   
    const setTitle = (title) => {
        state.title = title;
 }

 const getTitle = () => {
    return state.title;
}

const setDescription = (description) => {
    state.description = description;
 }

 const getDescription = () => {
    return state.description;
}

const setDate = (date) => {
    state.date = date;
 }

 const getDate = () => {
    return state.date;
}

const setPriority = (priority) => {
    state.priority = priority;
 }

 const getPriority = () => {
    return state.priority;
}

const setNotes = (notes) => {
    state.notes = notes;
 }

 const getNotes = () => {
    return state.notes;
}

const setChecklist = (checklist) => {
    state.checklist = checklist;
}

const getChecklist = () => {
    return state.checklist;
 }

 return {
 state,
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