import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api';

const initialState = {
    list: []
}

export const getWorkspaces = createAsyncThunk(
    'workspaces/getWorkspaces',
    async () => {
    return api(`workspaces`)
        .then( res => res.data )
        .catch( err => err.json() )
})

export const workspacesSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers: {
        setWorkspaces: (state, { payload }) => {
            state.list = payload
        },
    },
    extraReducers: {
        [getWorkspaces.pending]: (state, action) => {
            state.status = 'pending'
        },
        [getWorkspaces.fulfilled]: (state, { payload }) => {
            state.status = 'fulfilled'
            state.list = payload
        },
        [getWorkspaces.rejected]: (state, action) => {
            state.status = 'rejected'
        },
      }
})
  
export const { setWorkspaces } = workspacesSlice.actions

export const selectWorkspaces = (state) => state.workspaces

export default workspacesSlice.reducer