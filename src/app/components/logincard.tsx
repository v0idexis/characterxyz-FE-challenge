import React from 'react'

const LoginCard = () => {
    return (
        <form className="p-16 rounded-lg bg-black bg-opacity-80 z-10 flex flex-col gap-4">
            <text className="text-white text-2xl font-bold">Log In</text>
            <div className="flex flex-col gap-2">
                <text className="text-gray-300 text-md font-semibold">Email or phone number</text>
                <input type="email" placeholder="e-mail" className="pl-4 pr-4 pt-2 pb-2 bg-gray-900 rounded-md text-md text-white font-bold" />
            </div>

            <div className="flex flex-col gap-2">
                <text className="text-gray-300 text-md font-semibold">Password</text>
                <input type="password" placeholder="password" className="pl-4 pr-4 pt-2 pb-2 bg-gray-900 rounded-md text-md text-white font-bold" />
            </div>

            <button className="w-full p-2 text-lg text-white bg-red-700 rounded-lg font-bold">Sign In</button>
        </form>
    )
}

export default LoginCard