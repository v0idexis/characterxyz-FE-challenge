import React from 'react'
import avatar from '@icons/avatar.svg'
import loader from '@icons/loader.gif'
import Image from 'next/image';

const Loading = () => {
    return (
        <div className='fixed h-h[100dvh] w-[100vw] flex flex-col gap-16 z-40 top-0 left-0 bottom-0 right-0 justify-center items-center bg-black'>
            <Image alt="Avatar" src={avatar} height={100} width={100} className='rounded-lg' />
            <Image alt="Loader" src={loader} height={150} width={150} />
            {/* <h3 style={{ maxWidth: '80vw', textAlign: 'center' }}>This project is hosted on a free server, waiting for the server to cold start. May take a few minutes</h3> */}
        </div>
    )
}

export default Loading