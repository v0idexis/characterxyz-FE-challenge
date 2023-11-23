'use client'
import React, { Fragment, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '../../../public/customStyles/embla.css'
const tmdb_img = process.env.TMDB_PATH;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTBmYWY3MThhN2UzYzIyN2MzNDUyMWExMDg2OWUzZCIsInN1YiI6IjY0ZWFkODVkYzNjODkxMDEwMDdkODljYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.76gOVH_wacbJRf_QKZZd-iPrnqjVSQp5kfoYAMhGyHw'
    }
};

const Carousel: React.FC = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 7000 })]);
    const [highlights, setHighlights] = useState<Array<Object>>([{}]);
    let tempArray: string[] = ['bg-black', 'bg-red-500', 'bg-yellow-500'];
    // let trendingMovies = useState([]);

    useEffect(() => {
        (async () => {
            let trending: Array<Object> = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US`, options).then(resp => resp.json()).then(data => data.results.slice(0, 5));
            console.log(trending)
            setHighlights(trending)
        })();
    }, []);

    return (
        <>
            <div className="embla" ref={emblaRef}>
                <div className={"embla__container h-[100dvh] md:h-[50dvh]"}>
                    {
                        highlights.map(movie => {
                            return (
                                <Fragment >
                                    <div className="embla__slide">
                                        <div className={`h-[100dvh] w-full md:h-[50dvh]`}>


                                            <div className="flex flex-col items-center justify-center bg-white h-[100dvh] p-4 relative">
                                                <img src="" alt="Movie Poster" className="w-full h-[100dvh] absolute" />
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">Movie Title</h3>
                                                <p className="text-gray-600">Movie Description</p>
                                                <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg">Watch Now</button>
                                            </div>



                                        </div>
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