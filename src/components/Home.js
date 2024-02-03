import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Card from 'react-bootstrap/Card';
import './Home.css'; 
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const res = await response.json();
      setData(res);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid custom-bg text-light">
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="mt-2">
          {data.map((item, index) => (
            <div key={index} className="row mb-4">
              <div className="col-md-12">
                <Link to={`/show/${item.show.id}`}>
                  <Card className="border-0 rounded shadow" >
                    <div className="row no-gutters">
                      <div className="col-md-3">
                        {item.show.image && item.show.image.medium && (
                          <img className="img-fluid rounded" src={item.show.image.medium} alt={item.show.name} />
                        )}
                      </div>
                      <div className="col-md-9">
                        <Card.Body>
                          <Card.Title>{item.show.name}</Card.Title>
                          <Card.Text>
                            <p className="mb-0">Rating: {item.show.rating.average}</p>
                            <div dangerouslySetInnerHTML={{ __html: item.show.summary }} />
                          </Card.Text>
                        </Card.Body>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
