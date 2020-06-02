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

            return {
                state,
                setName,
                getName,
                newProjectTodo
            }
        }
        export default Project;       