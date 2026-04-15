import axios from 'axios'

const baseUrl = 'http://localhost:3002/players'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = (player) => axios.post(baseUrl, player).then(res => res.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, player) =>
  axios.put(`${baseUrl}/${id}`, player).then(res => res.data)

export default { getAll, create, remove, update }