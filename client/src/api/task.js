import axios from "./axios";

export const getArteRequest = () => axios.get( `/artes` )
export const notificacionArte = () => axios.get( `/arte`)
export const createArteRequest = ( obra ) => axios.post( `/arte`, obra )
export const updateArteRequest = ( id, formDate ) => axios.put( `/arte/${id}`, formDate )
export const deleteArteRequest = ( id ) => axios.delete( `/arte/${ id }` )
