import React from 'react'
import LoginCard from '@components/logincard'
import Footer from '@components/footer'
import movieWall from '@icons/moviewall.jpg'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {
    return (
        <>
            <div className="w-full h-[100dvh] flex flex-row justify-center items-center relative">
                <LoginCard />
                <Link href="/" className="absolute left-8 top-8 text-4xl text-red-600 font-bold drop-shadow-sm z-10">CXYZ</Link>
                <Image loading='eager' src={movieWall} alt="Login BG" className="filter brightness-50 w-full max-w-full h-[100dvh] max-h-[100dvh] absolute object-cover -z-0" fill />
            </div>
            <Footer />
        </>
    )
}

export default Login