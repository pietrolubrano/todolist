import { configureStore } from '@reduxjs/toolkit';

import workspacesReducer from '../features/workspaces/workspacesSlice';
import workspaceReducer from '../features/workspace/workspaceSlice';

export const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
    workspace: workspaceReducer
  },
})