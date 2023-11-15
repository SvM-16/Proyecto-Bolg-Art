import { createContext, useContext, useState, useEffect} from 'react'
import {getCarritoArteRequest, createCarritoArteRequest, putCarritoRequest} from '../api/carrito.js'
import { Toaster, toast } from 'sonner';
import {AiOutlineShoppingCart, AiFillDelete} from 'react-icons/ai';

const CarritoContext = createContext()

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if(!context)
    {
        throw new Error ('useCarrito must be used within a CarritoProvider')
    }
    return context
}

export function CarritoProvider({ children }){
    const [carrito,setCarrito] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [isActualizarCarrito, setIsActualizarCarrito] = useState(false)

    const showToast = (title, description, type) => {
        toast[type](description, {
          title: title,
          description: description,
          icon: icon
        });
      };

      const showCarrito = (title, description, type) => {
        toast[type](description, {
          title: title,
          description: description,
          icon: <AiOutlineShoppingCart style={{color: "green", fontSize: "30px"}}/>
        });
      };

      const showEliminar = (title, description, type) => {
        toast[type](description, {
          title: title,
          description: description,
          icon: <AiFillDelete style={{color: "red", fontSize: "30px"}}/>
        });
      };

      useEffect(() => {
        const arteDate = async () => {
            try {
                const res = await getCarritoArteRequest();
                if(Array.isArray(res.data.arteCarrito)){
                    setCarrito(res.data.arteCarrito);
                    console.log(res)
                }else{
                    console.log('arteCarrito no es un array valido en la respuesta:', res.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        arteDate();
      }, [])

      useEffect(() => {
        const carritoFiltrado = carrito.filter((carritos)=> carritos.Cantidad > 0);

        if(carritoFiltrado.length !== carrito.length){
            setCarrito(carritoFiltrado);
            calcularPresioTotal(carritoFiltrado)
        }
      },[carrito]);

      const agregarCarrito = async(carritos) => {
        try {
            const res = await createCarritoArteRequest(carritos);
            console.log(res);
            showCarrito("Agregado al carrito","","")
            const actualizarCarritoResponse = await getCarritoArteRequest();
            if(Array.isArray(actualizarCarritoResponse.data.arteCarrito)){
                const actualizarCarrito = actualizarCarritoResponse.data.arteCarrito;
                setCarrito(actualizarCarrito);
                calcularPresioTotal(actualizarCarrito);
            }else{
                console.log('arteCarrito no es un arrsy valido en la respuesta:',actualizarCarritoResponse.data)
            }
        } catch (error) {
            console.log(error)
            showToast("Error de Agregar","Hubo un error al agregar","error");
        }
      }

      const updateCarrito = async(arteId, query, body) => {
        if(isActualizarCarrito){
            return;
        }
        try {
            setIsActualizarCarrito(true);
            const res = await putCarritoRequest(arteId, query, body);
            if(res.data && res.data.msg === 'El producto fue actualizado')
            {
            console.log('error')
            }else{
                const body = {
                    Cantidad: query === 'add' ? 1 : -1
                };
            const actualizarCarrito = carrito.map((carritos) => {
                if(carritos._id === arteId){
                    return{...carritos,
                           Cantidad: carritos.Cantidad + body.Cantidad
                    };
                }
                return carritos;
            });
            setCarrito(actualizarCarrito);
            calcularPresioTotal(actualizarCarrito);
            }
        } catch (error) {
            console.error('Error al actualizar el carrito', error);
        }finally{
            setIsActualizarCarrito(false)
        }
      }

    return(
        <CarritoContext.Provider value={{
            carrito,
            precioTotal,
            updateCarrito,
            agregarCarrito
        }}>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </CarritoContext.Provider>
    )
}