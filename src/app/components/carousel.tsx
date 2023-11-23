'use client'
import React, { Fragment, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '../../../public/customStyles/embla.css'
import Image from 'next/image';
const tmdb_img = process.env.NEXT_PUBLIC_TMDB_PATH;
const tmdb_bearer = process.env.NEXT_PUBLIC_TMDB_KEY;
import playSvg from '@icons/play_arrow.svg'

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
    vote_count: number,
    logo: string
}

const Carousel: React.FC = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 7000 })]);
    const [highlights, setHighlights] = useState<Array<MovieObject>>([]);

    useEffect(() => {
        (async () => {
            let trending: Array<MovieObject> = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US`, options).then(resp => resp.json()).then(data => data.results.slice(0, 10));
            let moviesArray: Array<MovieObject> = [];
            for (let movie of trending) {
                try {
                    let movieId: number = movie.id;
                    let logoLink: string = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?language=en-US&append_to_response=images&include_image_language=null,en`, options).then(resp => resp.json()).then(data => {
                        if ('logos' in data) {
                            if (data['logos'].length >= 1) {
                                return data.logos[0].file_path;
                            }
                        }
                    });
                    moviesArray.push({ ...movie, logo: logoLink });
                }
                catch (e) {
                    console.log(`Failed to fetch logo for movieId: ${movie.id}`)
                }
            }

            // console.log(trending)
            console.log(moviesArray)
            setHighlights(moviesArray)
        })();
    }, []);

    return (
        <>
            <div className="embla" ref={emblaRef}>
                <div className={"embla__container max-w-[100vw] h-[92dvh] md:h-[50dvh]"}>
                    {
                        highlights.length > 0 && highlights.map((movie: MovieObject) => {
                            let hasLogo: boolean = false;
                            if ('logo' in movie) {
                                if (movie.logo != undefined && movie.logo != '') { hasLogo = true; }
                            }
                            return (
                                <Fragment key={movie.id}>
                                    <div className="embla__slide max-w-[100vw] h-[92dvh]">
                                        <div className={`h-[92dvh] max-w-[100vw] w-screen md:h-[50dvh] bg-black`}>
                                            <div className="flex flex-col items-start justify-end gap-4 bg-white h-[92dvh] pl-8 pb-16 relative md:p-2 md:items-center md:justify-center">
                                                {hasLogo &&
                                                    <>
                                                        <Image src={tmdb_img + movie.logo} alt={movie.title} width={250} height={250} objectFit='contain' className='z-10 drop-shadow-xl' />
                                                    </>
                                                }
                                                <h3 className="text-4xl font-bold text-white -mb-2 z-10 drop-shadow-xl max-w-[50vw] md:max-w-[90vw]">{movie.title}</h3>
                                                <p className="text-white font-bold z-10 drop-shadow-xl max-w-[70vw] md:max-w-[80vw] truncate overflow-hidden">{movie.overview}</p>
                                                <button className="flex flex-row items-center gap-1 mt-4 font-bold bg-white text-black px-4 py-2 rounded-md z-10">
                                                    <Image src={playSvg} alt="OpenMovie" height={30} width={30} />Watch Now
                                                </button>
                                                <Image layout='fill' src={tmdb_img + movie.backdrop_path} alt="Movie Poster" className="w-screen h-[92dvh] absolute object-cover -z-0" />
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