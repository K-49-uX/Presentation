import { useState, useEffect } from 'react'
import playerService from './services/players'
// Main application component that manages the state of players, form inputs, filter, and messages, and handles fetching, adding, deleting, and updating players through the player service
const App = () => {
  const [players, setPlayers] = useState([])
  const [newName, setNewName] = useState('')
  const [jerseyNumber, setJerseyNumber] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
// Fetch all players from the server when the component mounts and set the state with the retrieved data
  useEffect(() => {
    playerService.getAll().then(data => setPlayers(data))
  }, [])

  const showMessage = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(null), 3000)
  }
// Function to add a new player, which creates a new player object from the form inputs, calls the create function from the player service, and updates the state with the returned player information, showing a message about the addition
  const addPlayer = (e) => {
    e.preventDefault()

    const newPlayer = {
      name: newName,
      jerseyNumber: Number(jerseyNumber),
      height: Number(height),
      weight: Number(weight)
    }
// Call the create function from the player service to add a new player, and update the state with the returned player information, showing a message about the addition
    playerService.create(newPlayer).then(returnedPlayer => {
      setPlayers(players.concat(returnedPlayer))
      setNewName('')
      setJerseyNumber('')
      setHeight('')
      setWeight('')
      showMessage(`Player '${returnedPlayer.name}' added`)
    })
  }
// Delete and update functions with confirmation and prompts for new values
  const deletePlayer = (id) => {
    const player = players.find(p => p.id === id)

    if (window.confirm(`Delete ${player.name}?`)) {
      playerService.remove(id).then(() => {
        setPlayers(players.filter(p => p.id !== id))
        showMessage(`Player '${player.name}' deleted`)
      })
    }
  }
// Update function that prompts the user for new values and updates the player information
  const updatePlayer = (player) => {
    const updatedPlayer = {
      ...player,
      name: prompt('New name:', player.name) || player.name,
      jerseyNumber: Number(prompt('New jersey number:', player.jerseyNumber) || player.jerseyNumber),
      height: Number(prompt('New height:', player.height) || player.height),
      weight: Number(prompt('New weight:', player.weight) || player.weight)
    }
// Call the update function from the player service and update the state with the returned player information, showing a message about the update
    playerService.update(player.id, updatedPlayer).then(returnedPlayer => {
      setPlayers(players.map(p => p.id !== player.id ? p : returnedPlayer))
      showMessage(`Player '${returnedPlayer.name}' updated`)
    })
  }
// Filter players based on the search input
  const playersToShow = players.filter(player =>
    player.name.toLowerCase().includes(filter.toLowerCase())
  )
// Render the application with a message area, search input, form for adding players, and a list of players with delete and edit buttons
  return (
    <div>
      {message && (
        <div style={{
          color: 'green',
          background: '#e0ffe0',
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid green'
        }}>
          {message}
        </div>
      )}

      <h1>Football Players</h1>

      <input
        placeholder="Search player..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
// Form for adding a new player with inputs for name, jersey number, height, and weight, and a submit button to add the player to the list
      <form onSubmit={addPlayer}>
        <input placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <input placeholder="Jersey Number" value={jerseyNumber} onChange={(e) => setJerseyNumber(e.target.value)} />
        <input placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
        <input placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <button type="submit">Add Player</button>
      </form>

      <h2>Players</h2>
// List of players that are filtered based on the search input, with delete and edit buttons for each player to allow for removing or updating player information
      <ul>
        {playersToShow.map(player => (
          <li key={player.id}>
            {player.name} | {player.jerseyNumber} | {player.height}m | {player.weight}kg

            <button onClick={() => deletePlayer(player.id)}>
              delete
            </button>

            <button onClick={() => updatePlayer(player)}>
              edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App