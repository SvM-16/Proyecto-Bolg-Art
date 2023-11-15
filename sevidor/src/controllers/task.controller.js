import Task from "../models/task.model.js"

export const getArte = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        const tasks = await Task.find({
            user: req.user.id
        }).populate("user");
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el Arte" });
    }
}


export const getArteId = async ( req, res ) =>
{
    try {
    const task = await Task.findById( req.params.id ).populate( "user" )
    
    if ( !task ) return res.status( 404 ).json( { message: "Task not Found" } )
    res.status( 200 ).json( task )
    } catch (error) {
        res.status( 500 ).json( { message: "Error al encontrar el producto" } )
    }
}

export const createArte = async ( req, res ) =>
{

    try
    {

        const { nombre, descripcion, precio, date } = req.body

        const Urlimagen = req.file ? req.file.filename : '';

        const newTask = new Task( {
            nombre,
            descripcion,
            Urlimagen,
            propietario,
            precio,
            user: req.user.id
        } )

        const savedArte = await newTask.save()
        res.status( 200 ).json( savedArte )
    } catch ( error )
    {
        res.status( 500 ).json( { message: error.message } )
    }

}

export const deleteArte = async ( req, res ) =>
{
    try {
    const task = await Task.findByIdAndDelete( req.params.id )
    
    if ( !task ) return res.status( 404 ).json( { message: "Task not found" } )
    return res.sendStatus( 204 )
    } catch (error) {
        res.status(500).json("Error al eliminar el producto");
    }

}

export const updateArte = async ( req, res ) =>
{

    try {
        const task = await Task.findByIdAndUpdate( req.params.id, req.body, {
            new: true
        })

        if ( !task ) return res.status( 404 ).json( { message: "Task not Found" } )
        res.status( 201 ).json( task )
    } catch (error) {
        res.status(500).json("Error al actualizar el producto");
    }

}

export const verificacionDeArte = async(req, res) => 
{
    try {
        const Arte = await Task.find({Cantidad: {$lte: 1}});

        if (Arte.length > 0){
            const alertaMensaje = 'Me quedan pocas artes para ofrecerte.'

            await Arte.updateMany({_id: {$in: Arte.map((p) => p._id)}, AvisoUser: false},{AvisoUser: true});

            res.status(200).json({message: alertaMensaje, Arte})
        }else {
            await Task.updateMany({}, {AvisoUser: false});

            res.status(200).json({message: 'Estado verificado exitosamente. No hay Arte con cantidad menor a 1.'})
        }
    } catch (error) {
        res.status(500).json("Error al ver la verificacion de la cantidad de productos");
    }

}

