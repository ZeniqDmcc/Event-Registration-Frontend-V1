import React from 'react'
import Container from '../atoms/Container'
import Heading from '../atoms/Heading'
import Link from 'next/link';


function SiteHeader() {
    return (
        <div className='bg-[#2B2B2B]'>
            <Container>
                <Link href='/'>
                    <>
                    <Heading className='text-[#fff]' level='3'>SiteHeader</Heading>
                    </>
                </Link>
            </Container>
        </div>
    )
}

export default SiteHeader