import axios from 'axios'
// Base URL for the players API
const baseUrl = 'http://localhost:3001/players'
// Fetch all players from the server
const getAll = () => axios.get(baseUrl).then(res => res.data)
// create a new player by sending a POST request to the server with the player data,
//  and return the created player information from the response
const create = (player) => axios.post(baseUrl, player).then(res => res.data)
// remove player information by sending a delete request with the player's id to the server
const remove = (id) => axios.delete(`${baseUrl}/${id}`)
// Update player information by sending a PUT request to the server with the player's ID and 
// the updated player data, and return the updated player information from the response
const update = (id, player) =>
  axios.put(`${baseUrl}/${id}`, player).then(res => res.data)
// Export the functions as an object to be used in other parts of the application
export default { getAll, create, remove, update }