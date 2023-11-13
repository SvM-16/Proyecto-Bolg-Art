import '../css/obrasForm.css'
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import {BsCloudDownload} from "react-icons/bs"

const TaskFormPage = () =>
{

  // const { register, handleSubmit } = useForm();

  // const {createTask} = useTasks()

  // const onSubmited = handleSubmit((data) => {
  //   createTask(data)
  // }) 

  return (
    <>
      <div className='FormularioObras'>
                  <div className=''>
                      <p className="title1">Registro de Obra </p>
                      <div className='card2 flex'>
                          <form className="form3">
                              <div className='flex flex-col'>
                              <label>
                                <input className="input1" type="text" placeholder="" required />
                                <span className='letra'>Nombre</span>
                              </label>
                              <div className="group">
                                <textarea placeholder="‎" id="comment" name="comment" rows="5" required></textarea>
                                <label htmlFor="comment">Descripcion</label>
                              </div>
                              <label>
                                <input className="input1" type="text" placeholder="" required />
                                <span className='letra'>Propietario</span>
                              </label>
                              <label>
                                <input className="input1" type="number" placeholder="" required />
                                <span className='letra'>Precio</span>
                              </label>
                              </div>
                              <div>
                                <button className="boton1">Montar</button>
                                <button className="boton3">Continuar</button>
                              </div>
                          </form>
                          <div className='imagenUrl  bg-[#ffffff49] relative'>
                            <label htmlFor='imagenInput' className='imagenUrl text-[1.4rem] cursor-pointer '>
                                <input type='file' id='imagenInput' name='imagen' className=' hidden' />
                                <BsCloudDownload id='icon' className='icono absolute' />
                            </label>
                        </div>
                      </div>
                  </div>
              </div>
    </>
  )
}

export default TaskFormPage