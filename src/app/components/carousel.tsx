'use client'
import React, { Fragment, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '../../../public/customStyles/embla.css'
import Image from 'next/image';
const tmdb_img = process.env.NEXT_PUBLIC_TMDB_PATH;
const tmdb_bearer = process.env.NEXT_PUBLIC_TMDB_KEY;
console.log(tmdb_bearer)

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdb_bearer}`
    }
};

type MovieObject = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

const Carousel: React.FC = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 7000 })]);
    const [highlights, setHighlights] = useState<Array<MovieObject>>([]);
    // let tempArray: string[] = ['bg-black', 'bg-red-500', 'bg-yellow-500'];
    // let trendingMovies = useState([]);

    useEffect(() => {
        (async () => {
            let trending: Array<MovieObject> = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US`, options).then(resp => resp.json()).then(data => data.results.slice(0, 5));
            console.log(trending)
            setHighlights(trending)
        })();
    }, []);

    return (
        <>
            <div className="embla" ref={emblaRef}>
                <div className={"embla__container h-[100dvh] md:h-[50dvh]"}>
                    {
                        highlights.length > 0 && highlights.map((movie: MovieObject) => {
                            return (
                                <Fragment >
                                    <div className="embla__slide">
                                        <div className={`h-[92dvh] w-full md:h-[50dvh]`}>


                                            <div className="flex flex-col items-start justify-end bg-white h-[92dvh] pl-8 pb-16 relative md:p-2 md:items-center md:justify-center">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2 z-10">Movie Title</h3>
                                                <p className="text-gray-600 z-10">Movie Description</p>
                                                <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg z-10">Watch Now</button>
                                                <Image layout='fill' src={tmdb_img + movie.backdrop_path} alt="Movie Poster" className="w-full h-[100dvh] absolute object-cover -z-0" />
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