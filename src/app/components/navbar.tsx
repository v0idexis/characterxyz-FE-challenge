import { useScrollPosition } from "./useScrollPosition"

const NavBar: React.FC = () => {
    const scrollPosition = useScrollPosition()
    return (
        <>
            <div className={"flex flex-row fixed items-center justify-between m-0 p-4 w-full h-[10vh] z-20 ease-in-out duration-300 " + (scrollPosition > 0 ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent')}>
                <p className="text-2xl text-red-600 font-bold drop-shadow-sm">CXYZ</p>
            </div>

        </>
    )
}

export default NavBar