import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api';
import { getWorkspaces } from '../workspaces/workspacesSlice';

export const getWorkspace = createAsyncThunk(
    'workspace/getWorkspace',
    async (workspaceName) => {
    return api(`workspace/${workspaceName}`)
        .then( res => res.data )
        .catch( err => err.json() )
})

export const createWorkspace = createAsyncThunk(
    'workspace/createWorkspace',
    async (workspaceName, { dispatch }) => {
    return api.post(`workspace`, { name: workspaceName })
        .then( res => {
            dispatch(getWorkspaces())
            return res.data
        })
        .catch( err => err.json())
})

export const saveWorkspace = createAsyncThunk(
    'workspace/saveWorkspace',
    async ( arg, { getState }) => {
        const { workspace: state } = getState();
        return api.put(`workspace/${state.name}`, { workspaceLists: state.lists })
            .then( res => res.data )
            .catch( err => err.json())
})

const initialState = {
    _id: "",
    name: "",
    lists: [],
    status: ''
}

export const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setWorkspace: (state, { payload }) => {
            const { _id, name, lists } = payload;
            state._id = _id
            state.name = name
            state.lists = lists
        },
        creteNewList: (state, { payload }) => {
            const { name } = payload
            const newList = {
                name: name,
                todos: []
            }
            state.lists.push(newList)
        },
        addToDo: (state, { payload }) => {
            const { title, listIndex } = payload
            const newTodo = {
                isDone: false,
                title: title
            }
            state.lists[listIndex].todos.push(newTodo)
        },
        toggleTodoStatus: (state, { payload }) => {
            const { index: todoIndex, listIndex, status } = payload
            state.lists[listIndex].todos[todoIndex].isDone = status
        },
        deleteList: (state, { payload }) => {
            const { listIndex } = payload
            state.lists.splice(listIndex, 1)
        },
        deleteTodo: (state, { payload }) => {
            const { index: todoIndex, listIndex } = payload
            state.lists[listIndex].todos.splice(todoIndex, 1)
        },
    },
    extraReducers: {
        [getWorkspace.pending]: (state, action) => {
            state.status = 'pending'
        },
        [getWorkspace.fulfilled]: (state, { payload }) => {
            state.status = 'fulfilled'
      
            const { _id, name, lists } = payload

            state._id = _id
            state.name = name
            state.lists = lists

        },
        [getWorkspace.rejected]: (state, action) => {
            state.status = 'rejected'
        },
        [createWorkspace.pending]: (state, action) => {
            /* state.status = 'loading' */
            console.log('CREATE pending')
        },
        [createWorkspace.fulfilled]: (state, { payload }) => {
            console.log('CREATE fullfilled')
        },
        [createWorkspace.rejected]: (state, action) => {
            state.status = 'rejected'
            console.log('CREATE rejected')
        },
      }
})
  
export const { setWorkspace, creteNewList, addToDo, toggleTodoStatus, deleteList, deleteTodo } = workspaceSlice.actions

export const selectWorkspace = (state) => state.workspace

export default workspaceSlice.reducer