import { useDispatch } from 'react-redux';

import { deleteList, saveWorkspace } from '../workspaceSlice';

import NewTodo from './NewTodo';
import Todo from './Todo';

import styles from '../Workspace.module.css'

export default function List ({ list, listIndex }){
    const dispatch = useDispatch()

    const handleDeleteList = () => {
        dispatch(deleteList({ listIndex }))
        dispatch(saveWorkspace())
    }

    return(
        <div className={styles.listContainer}>

            <div className={styles.list}>

                <div className={styles.listName}>
                    <span className='m-0'>{list.name}</span>
                    <button 
                        className={styles.deleteListButton}
                        onClick={() => handleDeleteList()}
                    >
                        x
                    </button>
                </div>

                { list.todos.map( (todo, index) => 
                    <Todo
                        key={index}
                        todo={todo}
                        index={index}
                        listIndex={listIndex}

                    />
                ) }

                <NewTodo listIndex={listIndex}/>
                
            </div>

        </div>
    )
}