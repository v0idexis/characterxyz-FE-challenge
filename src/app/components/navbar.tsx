import { useState } from "react"
import { useScrollPosition } from "./useScrollPosition"
import searchIcon from '@icons/search.png'
import avatar from '@icons/avatar.svg'
import Image from 'next/image'

const NavBar: React.FC = () => {
    const scrollPosition = useScrollPosition()
    const [searchOpen, toggleSearchOpen] = useState<boolean>(false)
    const [avatarMenu, toggleAvatarMenu] = useState<boolean>(false)

    const toggleSearch = () => {
        toggleSearchOpen(!searchOpen)
    }

    const toggleAvatar = () => {
        toggleAvatarMenu(!avatarMenu)
    }

    return (
        <>
            <div className={"flex flex-row fixed items-center justify-between m-0 p-4 w-full h-[10vh] z-20 ease-in-out duration-300 " + (scrollPosition > 0 ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent')}>
                <p className="text-2xl text-red-600 font-bold drop-shadow-sm">CXYZ</p>

                {/* Right side */}
                <div className="flex flex-row gap-4 items-center">
                    <form>
                        <div className={"flex flex-row justify-center items-center gap-2 pl-2 " + (searchOpen ? 'border-2 border-white rounded-md' : '')}>
                            <Image src={searchIcon} alt="Search" height={16} width={16} className="cursor-pointer" onClick={toggleSearch} />
                            {searchOpen && <input type="text" placeholder="search..." className="w-28 h-8 text-md bg-transparent pr-4 pt-4 pb-4 text-white focus:border-0 focus-visible:outline-none" />}
                        </div>
                    </form>
                    <div className="flex flex-col gap-16 overflow-visible relative max-w-8 max-h-8 items-start justify-start">
                        <Image src={avatar} alt="nav Avatar" height={32} width={32} className="rounded-md cursor-pointer" onClick={toggleAvatar} />
                        {avatarMenu &&
                            <>
                                <div className="absolute right-0 top-10 flex flex-col p-4 bg-gray-800 z-40 rounded-lg gap-2">
                                    <p className="text-xs text-end font-bold text-white cursor-pointer hover:text-gray-400">Account</p>
                                    <p className="text-xs text-end font-bold text-white cursor-pointer hover:text-gray-400">Help</p>
                                    <p className="text-xs text-end font-bold text-white cursor-pointer hover:text-gray-400">Log Out</p>
                                </div>
                            </>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavBar