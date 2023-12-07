import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import SiteHeader from '@/components/template/SiteHeader';
import SiteFooter from '@/components/template/SiteFooter';
import "@/../../globals.css";
import Container from '@/components/atoms/Container';
import Heading from '@/components/atoms/Heading';

const Home = () => {
  const [data, setData] = useState([]);


  return (
    <div className="">
      {/* Site Header */}
      <SiteHeader />

      {/* Home - All Events */}

      <Container>
        <div className="py-12">
            <Heading level='3'>
                <Link href='/events'>
                  <>Events</>
                </Link>
            </Heading>
        </div>
      </Container>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
};

export default Home;


