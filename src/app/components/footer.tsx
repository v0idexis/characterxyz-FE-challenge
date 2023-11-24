import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="w-full p-16 bg-gray-950 flex flex-row flex-wrap text-gray-500 gap-8 justify-between md:p-4 md:gap-4">
                <div className="w-[20%] md:w-[40%] flex flex-col gap-2">
                    <p className="hover:text-gray-400 cursor-pointer">Audio Description</p>
                    <p className="hover:text-gray-400 cursor-pointer">Investor Relations</p>
                    <p className="hover:text-gray-400 cursor-pointer">Legal Notices</p>
                </div>

                <div className="w-[20%] md:w-[40%] flex flex-col gap-2">
                    <p className="hover:text-gray-400 cursor-pointer">Help Centre</p>
                    <p className="hover:text-gray-400 cursor-pointer">Jobs</p>
                    <p className="hover:text-gray-400 cursor-pointer">Cookie Preferences</p>
                </div>

                <div className="w-[20%] md:w-[40%] flex flex-col gap-2">
                    <p className="hover:text-gray-400 cursor-pointer">Gift Cards</p>
                    <p className="hover:text-gray-400 cursor-pointer">Terms of Use</p>
                    <p className="hover:text-gray-400 cursor-pointer">Corporate Information</p>
                </div>

                <div className="w-[20%] md:w-[40%] flex flex-col gap-2">
                    <p className="hover:text-gray-400 cursor-pointer">Media Centre</p>
                    <p className="hover:text-gray-400 cursor-pointer">Privacy</p>
                    <p className="hover:text-gray-400 cursor-pointer">Contact Us</p>
                </div>
            </div>
            <p className="text-white cursor-pointer pl-16 pb-16 -pt-8 bg-gray-950 md:p-4">{'©' + (String(new Date().getFullYear())) + ' cXYZ'}</p>
        </>

    )
}

export default Footer