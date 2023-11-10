import Carrito from '../models/carrito.models.js';
import taskModel from '../models/task.model.js';

export const getCarritoArte = async (req, res) => {
    try {
        const arteCarrito = await Carrito.find({
            user:req.user.id
        }).populate('user')
    
        if(arteCarrito){
            res.json({arteCarrito})
        }else{
            res.json({message : "No hay productos en el carrito"})
        }
    } catch (error) {
        res.json(500).json("Error al encontrear el arte en el carrito")
    }
}

export const createCarritoArte = async(req, res) => {
    try {
    const {nombre, Urlimagen, precio} = req.body;

    const estaEnLaArte = await taskModel.findOne({nombre});
    
    if(!estaEnLaArte){
        res.status(400).json({message: "Esta asrte no se a encontrado en la base de datos"})
    }else{
        const elItemExiste = await Carrito.findOne({
            nombre,
            user: req.user.id,
        });

        if(elItemExiste){
            elItemExiste.Cantidad += 1;
            await elItemExiste.save();

            estaEnLosProductos.EnCarrito = true;
            await estaEnLosProductos.save();

            res.json({message : 'la cantidad del producto a aunmentado',
                      task:elItemExiste })
        }else{
            const carritoArte = new Carrito({
                nombre,
                Urlimagen,
                precio,
                Cantidad: 1,
                user: req.user.id
            });

            elItemExiste.EnCarrito = true;
            await elItemExiste.save(); 

            await carritoArte.save();
            res.json({massega: 'El producto fue agregado al carrito',
                      producto: carritoArte,})
        }
    }
    } catch (error) {
        res.status(500).json("Error al crear el arte en el carrito")
    }
};

export const putArte = async(req, res) => {
    const { arteId } = req.params;
    const { query } = req.query;

    const arteEncontrada = await Carrito.findById(arteId);

    if(!query){
        res.status(404).json({message:'Desbes enviar una query'});
    }else if (arteEncontrada && (query === "add" || query === "del")) {
        const incremento = query === "add" ? 1 : -1;

        arteEncontrada.Cantidad += incremento;

        if(arteEncontrada.Cantidad <= 0) {
            await Carrito.findByIdAndRemove(arteId);
            res.json({message: `El arte ${arteEncontrada.nombre} fue eliminada del carrito`})
        }else{
            await arteEncontrada.save();

            const arteEnDB = await Carrito.findOne({nombre: arteEncontrada.nombre})
            const precioArte = arteEnDB.precio;

            const arteTotal = arteEncontrada.Cantidad * precioArte;

            res.json({message: `El arte ${arteEncontrada.nombre} fue actualizada`,
                      arte: arteEncontrada,
                      arteTotal: arteTotal});
        }
    }else{
        res.status(400).json({message: 'Ocurrio un error'})
    }
};

export const deleteArte = async (req, res) => {
    try {
        const {arteId} = req.params;

        const arteEnCarrito = await Carrito.findById(arteId);

        const{nombre, Urlimagen, precio, _id} = await taskModel.findOne({
            nombre: arteEnCarrito.nombre
        });

        await Carrito.findByIdAndDelete(arteId)

        await taskModel.findByIdAndUpdate(
            _id,
            {EnCarrito: false, nombre, Urlimagen, precio},
            {new: true}
        )
        .then((arte)=>{
            res.json({message: `El arte ${arte.nombre} fue eliminada del carrito`})
        })
    } catch (error) {
        res.status(500).json("Error al eliminarlo del carrito ")
    }


}

