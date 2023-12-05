/* Footer Component */
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 bg-[#2B2B2B] p-4 text-center ixb-flex-both">
      <div className='ixb-flex-both gap-4'>
      <Link href='/'>
          <>
            <img src='/Social/insta.svg' width='22' height='22' alt='Hello' />
          </>
      </Link>
      <Link href='/'>
          <>
            <img src='/Social/x.svg' width='25' alt='Hello' />
          </>
      </Link>
      <Link href='/'>
          <>
            <img src='/Social/facebook.svg' width='25' height='22' alt='Hello' />
          </>
      </Link>
      <Link href='/'>
          <>
            <img src='/Social/linkedin.svg' width='24' alt='Hello' />
          </>
      </Link>
      </div>
    </footer>
  );
};

export default Footer;
