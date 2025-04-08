import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  /* receive data from API and mount it (through the Dependency Array) */
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
      if (!response.ok) {
        throw new Error("We can't load the data");
      }
      return response.json();
    })
    .then((data) => {
      setUsers(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  /* display logic */
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='app'>
      <h1>🧑‍💼User's Business cards🧑‍💼</h1>
      <div className='card-container'>
      {users.map((user) => (
          <div key={user.id} className="business-card">
            <h2>{user.name}</h2>
            <p><strong>👤User:</strong> {user.username}</p>
            <p><strong>📧Email:</strong> {user.email}</p>
            <p><strong>📱Phone:</strong> {user.phone}</p>
            <p><strong>💼Company:</strong> {user.company.name}</p>
            <p><strong>📍Address:</strong> {user.address.street}, {user.address.city}</p>
            <p><strong>🌐Web-site:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
