import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

const ShowDetails = () => {
  const [showData, setShowData] = useState(null);
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShowData(data);
      } catch (error) {
        console.error('Error fetching show data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleBookTicket = () => {
    
    setShowForm(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
   
    alert(`Booking ticket for ${showData.name} - User: ${userData.name}, Email: ${userData.email}`);
    
  };

  return (
    <div className="container mt-4">
      <div className="d-flex">
        {showData && (
          <Card style={{ flex: 1, maxWidth: '400px', maxHeight: '700px' }}>
            <Card.Img variant="top" src={showData.image.original} />
          </Card>
        )}
        <Card style={{ flex: 1, maxWidth: '700px', maxHeight: '700px' }}>
          <Card.Body>
            {showData && showData.name && <Card.Title>{showData.name}</Card.Title>}
            {showData && showData.genres && (
              <Card.Subtitle className="mb-2 text-muted">Genres: {showData.genres.join(', ')}</Card.Subtitle>
            )}
            {showData && showData.summary && (
              <Card.Text>
                <p dangerouslySetInnerHTML={{ __html: showData.summary }} />
              </Card.Text>
            )}
            <ul>
              {showData && showData.type && <li>Type: {showData.type}</li>}
              {showData && showData.language && <li>Language: {showData.language}</li>}
              {showData && showData.status && <li>Status: {showData.status}</li>}
              {showData && showData.runtime && <li>Runtime: {showData.runtime} minutes</li>}
              {showData && showData.rating && showData.rating.average && (
                <li>Average Rating: {showData.rating.average}</li>
              )}
              {showData && showData.network && showData.network.name && (
                <li>Network: {showData.network.name}</li>
              )}
              {showData && showData.schedule && showData.schedule.days && showData.schedule.time && (
                <li>Schedule: {showData.schedule.days.join(', ')} at {showData.schedule.time}</li>
              )}
              {showData && showData.officialSite && (
                <li>
                  Official Site:{' '}
                  <a href={showData.officialSite} target="_blank" rel="noopener noreferrer">
                    {showData.officialSite}
                  </a>
                </li>
              )}
              {showData && showData.externals && showData.externals.imdb && (
                <li>
                  IMDb:{' '}
                  <a href={`https://www.imdb.com/title/${showData.externals.imdb}`} target="_blank" rel="noopener noreferrer">
                    {showData.externals.imdb}
                  </a>
                </li>
              )}
            </ul>
            <button onClick={handleBookTicket}>Book Ticket</button>

            {showForm && (
              <form onSubmit={handleSubmitForm}>
                <label>
                  Name:
                  <input type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                </label>
                <label>
                  Email:
                  <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                </label>
                <button type="submit">Submit</button>
              </form>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ShowDetails;
