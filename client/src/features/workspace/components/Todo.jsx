import { useDispatch } from 'react-redux';

import { toggleTodoStatus, saveWorkspace, deleteTodo } from '../workspaceSlice';

import { Button } from 'react-bootstrap';
import styles from '../Workspace.module.css';

export default function Todo({ todo, index, listIndex, test }){

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(toggleTodoStatus({ status: !todo.isDone, index, listIndex }))
        if(!test){
            dispatch(saveWorkspace())
        }
    }

    const handleDeleteTodo = () => {
        dispatch(deleteTodo({ index, listIndex }))
        if(!test){
            dispatch(saveWorkspace())
        }
    }

    return(
        <div className={`${styles.todo} ${todo.isDone ? styles.todoDone : styles.todoNotDone}`}>

            <Button
                className={`d-flex ${styles.todoButton}`}
                onClick={() => handleClick()}
            >   
                <div className={todo.isDone ? styles.checkDone : styles.checkUnDone}>
                    ▢
                </div>
                <div className={`${styles.todoTitle} ${todo.isDone && styles.todoTitleDone}`}>
                    { todo.title }
                </div>
            </Button>

            <Button
                className={styles.todoDeleteButton}
                onClick={() => handleDeleteTodo()}
            >
                x
            </Button>
        </div>
        
    )
}