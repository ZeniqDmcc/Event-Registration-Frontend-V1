import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        const response = await axios.get('http://localhost:9003/admin/event/fetchAllEvents/', {
          headers,
        });
  
        const visibleEvents = response.data.data.filter((event) => event.visibile === true);
  
        console.log('response.data.status.forms---------------------', visibleEvents);
  
        if (visibleEvents.length > 0) {
          setData(visibleEvents);
        } else {
          console.error('No visible events found.');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    getData();
  }, []);
  

  return (
    <div>
      <h1>Visible Events</h1>
      <ul>
        {data.map((event) => (
          <li key={event.eventId}>
            <Link href={`/${event.eventId}`}>
              <>{event.eventId}</>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

     
