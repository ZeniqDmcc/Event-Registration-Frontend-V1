import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import SiteHeader from '@/components/template/SiteHeader';
import SiteFooter from '@/components/template/SiteFooter';
import "@/../../globals.css";
import Container from '@/components/atoms/Container';
import Heading from '@/components/atoms/Heading';

const UserEvents = () => {
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
    <div className="">
      {/* Site Header */}
      <SiteHeader />

      {/* Home - All Events */}

      <Container>
        <div className="py-12">
          <Heading className='justify-center' level='1'>Visible Events</Heading>
          <ul className='flex flex-wrap gap-[8%] py-20'>
            {data.map((event) => (
              <li key={event.eventId} id='eventbg' className='w-[23%] flex p-6 justify-center h-[349px] rounded-[8px] shadow-secondary'>
                <Link href={`events/${event.eventId}`}>
                  <>
                    <div className='text-[22px] w-full font-[700] text-textColor flex items-center bg-white px-16'>{event.eventId}</div>
                  </>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
};

export default UserEvents;


