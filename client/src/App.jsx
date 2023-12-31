import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ObrasPublicPage from "./pages/ObrasPublicPage"
import ObrasFormPage from "./pages/ObrasFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"

import { AuthProvider } from "./context/AuthContext.jsx";
import { ArteProvider } from "./context/TaskContext.jsx";
import  {CarritoProvider} from "./context/CarritoContext"
import NavBar from "./components/NavBar"
import ContactPage from "./pages/ContactPage"

function App ()
{
  return (
    <>
      <AuthProvider>
        <ArteProvider >
          <CarritoProvider>
          <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/login" element={ <LoginPage /> } />
              <Route path="/registrate" element={ <RegisterPage /> } />
              <Route path="/obrasPublic" element={ <ObrasPublicPage /> } />
              <Route path="/contact" element={ <ContactPage /> } />


              <Route element={ <ProtectedRoute /> }>
                <Route path="/formulario" element={ <ObrasFormPage /> } />
                <Route path="/obrasPublic/:id" element={ <ObrasFormPage /> } />
                <Route path="/profile" element={ <ProfilePage /> } />
              </Route>
            </Routes>
          </BrowserRouter>
          </CarritoProvider>
        </ArteProvider>
      </AuthProvider>

    </>
  )
}

export default App