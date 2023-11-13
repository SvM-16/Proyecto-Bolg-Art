import '../css/obrasForm.css'
import { useForm } from "react-hook-form";
// import { useTasks } from "../context/TaskContext";

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
                  <div className='flex flex-col'>
                      <p className="title1">Registro de Obra </p>
                      <div className='card2'>
                          <form className="form3">
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
                              <div>
                                <button className="boton1">Montar</button>
                                <button className="boton3">Continuar</button>
                              </div>
                                <label htmlFor='imagenInput' className=' text-[1.4rem] cursor-pointer '>
                                    <h1>IMAGEN</h1>
                                    <input type='file' id='imagenInput' name='imagen' className='' />
                                    {/* <BsCloudDownload id='icon' className='text-[120px] absolute' /> */}
                                </label>
                          </form>
                      </div>
                  </div>
              </div>
    </>
  )
}

export default TaskFormPage