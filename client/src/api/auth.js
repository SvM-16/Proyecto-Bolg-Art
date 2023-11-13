import axios from './axios'

export const profileRequest = (id) => axios.get(`/profile/${id}`)
export const registerRequest = user => axios.post( `/register`, user )
export const loginRequest = user => axios.post( `/login`, user )
export const logoutRequest = () => axios.post( `/logout` )
export const verifyTokenRequest = () => axios.get(`/verify` )
export const editProfileRequest = (id, fromDate) => axios.post(`/editarPerfil${id}`, fromDate)