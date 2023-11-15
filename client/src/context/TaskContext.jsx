import { createContext, useContext, useEffect, useState } from "react";
import { getArteRequest, notificacionArte, createArteRequest, updateArteRequest, deleteArteRequest } from "../api/task.js";
import { Toaster, toast } from 'sonner';
import {AiFillDelete} from 'react-icons/ai'
import {IoCreate} from 'react-icons/io5'


const ArteContext = createContext()

export const useTasks = () =>
{
    const context = useContext( ArteContext );

    if ( !context )
    {
        throw new Error( 'useTasks must be used within a TaskProvider' );
    }

    return context
}

export function ArteProvider({ children }){

    const [artes, setArte] = useState([]);
    const [notificacion, setNotificacion] = useState(null)

    const showToast = (title, description, type) => {
        toast[type](description, {
          title: title,
          description: description
        });
      };

      const showEliminar = (title, description, type) => {
        toast[type](description, {
          title: title,
          description: description,
          icon: <AiFillDelete style={{color: "red", fontSize: "30px"}}/>
        });
      };

      const showEditar = (title, description, type) => {
        toast[type](description, {
          title: title,
          description: description,
          icon: <IoCreate style={{fontSize: "1rem"}}/>
        });
      };
    
    useEffect(() => {
        const getArte = async () => {
         try {
            const res = await  getArteRequest();
            setArte(res.data);
            console.log(res);
         } catch (error) {
            console.log(error)
         }
        };

        getArte();
      }, []);

    //   useEffect(() => {
    //     const mostrarNotificacion = async() => {
    //         try {
    //             const res = await notificacionArte();
    //             console.log(res);
    //             setNotificacion(res.data)
    //             if (res.data && res.data.artes && res.data.artes[0] && res.data.artes[0].AvisoUser){
    //                 console.log('AvisoUser es true');
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     };

    //     mostrarNotificacion();
    // }, [])

      const createArte = async(formDate) => {
        try {
            const res = await createArteRequest(formDate);
            console.log(res);
            showToast("Has agregado un arte","","sucess");
        } catch (error) {
            console.log(error);
            showToast("Error de creacion","Hubo un error durante la creacion","error");
        }
      }

      const updateArte = async(id, formDate) => {
        try {
            const res = await updateArteRequest(id, formDate);
            console.log(res);
            showEditar("Arte actualizar","","sucess");
            setArte((prevArte) => {
                const updateArtes = prevArte.map((arte) => {
                    if (arte._id === id) {
                        return {...arte, ...formDate}
                    }
                    return arte;
                });
                return updateArtes;
            })
        } catch (error) {
            console.log(error);
            showToast("Error al editar el arte","Hubo un error durante la editacion","error")
        }
      }

      const deleteArte = async(arteId)=>{
        try {
            const res = await deleteArteRequest(arteId);
            setArte(artes.filter(arte => arte._id !== arteId));
            console.log(res);
            showEliminar("Eliminado","Has eliminado el arte","")
        } catch (error) {
            console.log(error)
            showToast("Error de eliminar","Hubo un error durante la eliminacion","error");
        }
      }

    return (
        <ArteContext.Provider value={ {
            artes,
            createArte,
            updateArte,
            deleteArte,
            notificacion,
            getArteRequest

        } }>
            <Toaster position="top-right" reverseOrder={false} />
            { children }
        </ArteContext.Provider>
    )

}