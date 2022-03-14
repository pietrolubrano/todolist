import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from './context/auth/AuthContext';

import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import Workspace from "./features/workspace/Workspace";
import Workspaces from './features/workspaces/Workspaces';
import SignInForm from "./context/auth/SignInForm";
import RegisterForm from "./context/auth/RegisterForm";
import ServerErrorsAlert from "./components/ServerErrorsAlert";
import RequireAuth from "./context/auth/RequireAuth";
import NotLoggedUser from "./context/auth/NotLoggedUser";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <MyNavbar />
        <ServerErrorsAlert />

        <Routes>

          <Route path="/" element={
              <Home />
          }/>

          <Route path="/signin" element={
            <NotLoggedUser>
              <SignInForm />
            </NotLoggedUser>
          }/>

          <Route path="/register" element={
            <NotLoggedUser>
              <RegisterForm />
            </NotLoggedUser>
          }/>

          <Route path="/workspaces" element={
            <RequireAuth>
              <Workspaces />
            </RequireAuth>
          }/>

          <Route path="/workspaces/:workspaceName" element={
            <RequireAuth>
              <Workspace />
            </RequireAuth>
          }/>

          <Route path="/workspacetest" element={
            <NotLoggedUser>
              <Workspace test={true}/>
            </NotLoggedUser>
          }/>

          <Route path="*" element={
             'Not found'
          }/>

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
