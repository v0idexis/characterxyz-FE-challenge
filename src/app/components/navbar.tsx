import { useState } from "react"
import { useScrollPosition } from "./useScrollPosition"
import searchIcon from '@icons/search.png'
import avatar from '@icons/avatar.svg'
import Image from 'next/image'
import Link from 'next/link'

const NavBar: React.FC = () => {
    const scrollPosition = useScrollPosition()
    const [searchOpen, toggleSearchOpen] = useState<boolean>(false)
    const [avatarMenu, toggleAvatarMenu] = useState<boolean>(false)
    const [navMenu, toggleNavMenu] = useState<boolean>(false)

    const toggleSearch = () => {
        toggleSearchOpen(!searchOpen)
    }

    const toggleAvatar = () => {
        toggleAvatarMenu(!avatarMenu)
    }

    const toggleNav = () => {
        toggleNavMenu(!navMenu)
    }

    return (
        <>
            <div className={"flex flex-row fixed items-center justify-between m-0 p-4 w-full h-[10vh] z-20 ease-in-out duration-300 " + (scrollPosition > 0 ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent')}>
                <div className="flex flex-row gap-8 items-center">
                    <Link href="/" className="text-2xl text-red-600 font-bold drop-shadow-sm pl-12 md:p-2">CXYZ</Link>

                    <div className="flex flex-row gap-4 items-center md:hidden">
                        <Link href="/" className="text-md text-white hover:text-gray-400">Movies</Link>
                        <Link href="/new" className="text-md text-white hover:text-gray-400">New & Popular</Link>
                        <Link href="/login" className="text-md text-white hover:text-gray-400">Login</Link>
                    </div>

                    <div className="hidden md:flex relative">
                        <div className="text-md text-white font-bold cursor-pointer" onClick={toggleNav}>Browse</div>
                        {navMenu &&
                            <>
                                <div className="absolute left-0 top-10 flex w-48 flex-col p-4 bg-gray-800 z-40 rounded-lg gap-2">
                                    <Link href="/" className="text-sm text-start break-keep font-bold text-white cursor-pointer hover:text-gray-400">Movies</Link>
                                    <Link href="/new" className="text-sm text-start break-keep font-bold text-white cursor-pointer hover:text-gray-400">New & Popular</Link>
                                    <Link href="/login" className="text-sm text-start break-keep font-bold text-white cursor-pointer hover:text-gray-400">Login</Link>
                                </div>
                            </>
                        }
                    </div>
                </div>

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
                                    <p className="text-sm text-end font-bold text-white cursor-pointer hover:text-gray-400">Account</p>
                                    <p className="text-sm text-end font-bold text-white cursor-pointer hover:text-gray-400">Help</p>
                                    <p className="text-sm text-end font-bold text-white cursor-pointer hover:text-gray-400">Log Out</p>
                                </div>
                            </>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavBar