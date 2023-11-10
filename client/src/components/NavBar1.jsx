import { NavLink } from "react-router-dom"
import { LuLogIn } from 'react-icons/Lu'
import { BsFillPersonFill} from 'react-icons/bs'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import '../css/navbar.css'

const NavBar1 = () => {
  return (
    <>
    <div className="principal">
        <div className="container">
            <h1 className="titulo1"><a href="/">Blog Art</a></h1>
            <nav className="navegador" >
                <ul>
                <li><NavLink to='/' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>Inicio</NavLink></li>
                        <li><NavLink to='/ObrasPublic' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>Obras</NavLink></li>
                        <li><NavLink to='/Contact' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>Contactanos</NavLink></li>
                        <li><NavLink to='/Profile' className={({isActive})=> isActive ? "flex items-center text-blue-700" : "flex items-center"  }><div className="perfil"><BsFillPersonFill/></div></NavLink></li>
                        <li><NavLink to='/Carrito' className={({isActive})=> isActive ? "flex items-center text-zinc-600" : "flex items-center"  }><div className="perfil"><AiOutlineShoppingCart/></div></NavLink></li>
                </ul>
            </nav>
        </div>
    </div>
    </>
  )
}

export default NavBar1