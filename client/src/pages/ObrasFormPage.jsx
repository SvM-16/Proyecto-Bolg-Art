import '../css/obrasForm.css';
import { useForm } from 'react-hook-form';
import { useTasks } from "../context/TaskContext";
import { useNavigate } from 'react-router-dom';
import {BsCloudDownload} from 'react-icons/bs'

const ObraFormPage = () => {
    
    const { register, handleSubmit } = useForm();
    const { createArte } = useTasks();
    const navigate = useNavigate();

    const onSubmited = async (data) => {
        try {
            const formData = new FormData();
            formData.append('nombre', data.nombre);
            formData.append('descripcion', data.descripcion);
            formData.append('precio', data.precio);
            formData.append('file', data.file[0]);

            await createArte(formData); // Espera a que se resuelva la Promesa
            console.log('obra created', data);
            navigate('/obrasPublic');
        } catch (error) {
            console.error('error al crear la obra', error);
        }
    };

    return (
        <>
            <div className='FormularioObras'>
                <div className='flex flex-col'>
                    <p className="title1">Registro de Obra</p>
                    <div className='card2'>
                        <form onSubmit={handleSubmit(onSubmited)} encType="multipart/form-data" className="form3">
                            <label>
                                <input className="input1" type="text" {...register('nombre')} placeholder="" required />
                                <span className='letra'>Nombre</span>
                            </label>
                            <div className="group">
                                <textarea placeholder="‎" type="text" {...register('descripcion')} id="description" name="descripcion" rows="5" required></textarea>
                                <label htmlFor="description">Descripcion</label>
                            </div>
                            <label>
                                <input className="input1" type="number" {...register('precio')} placeholder="" required />
                                <span className='letra'>Precio</span>
                            </label>
                            <div>
                                <button className="boton1">Montar</button>
                            </div>
                        </form>
                        <div className='imagenUrl  bg-[#ffffff49] relative'>
                            <label htmlFor='imagenInput' {...register('file')} className='imagenUrl text-[1.4rem] cursor-pointer '>
                            <input type='file' id='imagenInput' name='imagen' className=' hidden' />
                            <BsCloudDownload id='icon' className='icono absolute' />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ObraFormPage;