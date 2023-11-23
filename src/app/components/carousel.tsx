'use client'
import React, { Fragment, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '../../../public/customStyles/embla.css'
const TMDB = process.env.TMDB_KEY;

const Carousel: React.FC = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 7000 })]);
    let tempArray = ['bg-black', 'bg-red-500', 'bg-yellow-500'];
    // let trendingMovies = useState([]);

    useEffect(() => {
        (async () => {
            let trending = await fetch(``);
        })();
    }, []);

    return (
        <>
            <div className="embla" ref={emblaRef}>
                <div className={"embla__container h-[70dvh] md:h-[50dvh]"}>
                    {
                        tempArray.map(color => {
                            return (
                                <Fragment key={color}>
                                    <div className="embla__slide">
                                        <div className={`h-[70dvh] w-full ${color} md:h-[50dvh]`}></div>
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div >
        </>
    )
}

export default Carousel