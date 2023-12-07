import React from 'react'
import Container from '../atoms/Container' 
import Heading from '../atoms/Heading'

function SiteFooter() {
    return (
        <div className='bg-[#2B2B2B] relative w-full bottom-0'>
            <Container>
                <Heading className='text-[#fff]' level='3'>SiteHeader</Heading>
            </Container>
        </div>
    )
}

export default SiteFooter