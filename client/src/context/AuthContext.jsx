import { createContext, useState, useContext, useEffect } from "react";

import { loginRequest, logoutRequest , registerRequest, verifyTokenRequest, editProfileRequest, profileRequest} from "../api/auth";
import Cookies from 'js-cookie'
import { Toaster,  toast } from 'sonner';

export const AuthContext = createContext()

export const useAuth = () => 
{
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
  };


export const AuthProvider = ( { children } ) =>
{
    const [ user, setUser ] = useState( null )
    const [ isAuthenticathed, setIsAuthenticathed ] = useState( false )
    const [ errors, setErrors ] = useState( [] )
    const [ loading, setLoading ] = useState( true )

    const showToast = (title, description, type) => {
        toast[type](description, {
          title: title,
          description: description
        });
      };

    const signup = async ( user ) =>
    {
        try
        {
        const res = await registerRequest( user )
            console.log( res );
            setUser( res.data );
            showToast("Te has resgistrado", "", "success");
            setIsAuthenticathed( true );
        } catch ( error )
        {
            setErrors( error.response.data )
            console.log( error )
        }
    }

    const signin = async ( user ) =>
    {
        try
        {
        const res = await loginRequest( user )
            console.log( res.data );
            setIsAuthenticathed( true );
            showToast("Has iniciado seccion", "", "success");
            setUser( res.data )
        } catch ( error )
        {
            console.log( error )
            if ( Array.isArray( error.response.data ) )
            {
                setErrors( error.response.data )
            }
            setErrors( [ error.response.data.message ] )

        }
    }

    const logOut = async () => {
        try {
            await logoutRequest();
            setIsAuthenticathed(false);
            showToast("Has cerrado seccion","", "success");
            setUser(null);
        } catch (error) {
            console.error("error durin logout", error)
        }
    }
    
    const perfil = async(id) => {
        try {
        const res = await profileRequest(id);
            setUser(res.data);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const editImagenProfile = async(formDate) => {
        try {
        const res = await editProfileRequest(user.id ,formDate);
        const nuevaImgProfile = res.data.nuevaUrl;
            setUser({...user, imagenProfile:nuevaImgProfile});
            showToast("Se a actualizado tu foto de perfil ","","success")
        } catch (error) {
            console.log(error)
            showToast("Error al editar el perfil","Hubo un error durante la editacion","error")
        }
    }

    useEffect( () =>
    {
        if ( errors.length > 0 )
        {
            const timer = setTimeout( () =>
            {
                setErrors( [] )
            }, 5000 );
            return () => clearTimeout( timer );
        }
    }, [ errors ] )

    useEffect( () =>
    {
        async function checkLogin ()
        {
            const cookies = Cookies.get()

            if ( !cookies.token )
            {
                setIsAuthenticathed( false )
                setLoading(false)
                return setUser( null )
            }
            try
            {
                const res = await verifyTokenRequest( cookies.token )
                console.log( res )
                if ( !res.data )
                {
                    setIsAuthenticathed( false )
                    setLoading( false )
                    return 
                }
                setIsAuthenticathed( true )
                setUser( res.data )
                setLoading(false)

            } catch ( error )
            {
                setIsAuthenticathed( false )
                setUser( null )
                setLoading(false)
            }
        }
        checkLogin()
    }, [] )


    return (
        <AuthContext.Provider value={ {
            signup,
            perfil,
            signin,
            logOut,
            user,
            isAuthenticathed,
            editImagenProfile,
            errors,
            loading,
            
        } }>
            <Toaster position="top-right" reverseOrder={false} />
            { children }
        </AuthContext.Provider>
    )
}