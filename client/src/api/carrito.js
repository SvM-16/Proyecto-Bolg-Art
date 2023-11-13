import axios from  './axios.js'

export const getCarritoArte = () => axios.get(`/carrito`)

export const createCarritoArte = (carrito) => axios.post(`/carrito`, carrito)

export const putCarrito = (arteId, query, carrito ) => {return axios.put(`/carrito/${arteId}?query=${query}`, carrito)}