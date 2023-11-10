import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ObrasPage from "./pages/ObrasPage"
import ObrasPublicPage from "./pages/ObrasPublicPage"
import ObrasFormPage from "./pages/ObrasFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"

import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import NavBar1 from "./components/NavBar1"
import NavBar from "./components/NavBar"
import ContactPage from "./pages/ContactPage"
import LogoutPage from "./pages/logoutPage"

function App ()
{
  return (
    <>
      <AuthProvider>
        <TaskProvider >
          <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/Login" element={ <LoginPage /> } />
              <Route path="/Registrate" element={ <RegisterPage /> } />
              <Route path="/ObrasPublic" element={ <ObrasPublicPage /> } />
              <Route path="/Contact" element={ <ContactPage /> } />


              <Route element={ <ProtectedRoute /> }>
                <Route path="/obras" element={ <ObrasPage /> } />
                <Route path="/logout" element={ <LogoutPage /> } />
                <Route path="/FormularioObras" element={ <ObrasFormPage /> } />
                <Route path="/ObrasPublic/:id" element={ <ObrasFormPage /> } />
                <Route path="/Profile" element={ <ProfilePage /> } />
              </Route>
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>

    </>
  )
}

export default App