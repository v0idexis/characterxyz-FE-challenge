'use client'
import React, { useEffect, useState } from 'react'
import NavBar from '@components/navbar'
import Footer from '@components/footer'
import Loading from '../components/loading'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import playSvg from '@icons/play_arrow.svg'
const tmdb_img: string = process.env.NEXT_PUBLIC_TMDB_PATH!;
const tmdb_bearer: string = process.env.NEXT_PUBLIC_TMDB_KEY!;

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
    belongs_to_collection: any,
    budget: number,
    genres: object[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: object[],
    production_countries: object[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: object[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    logo?: string
}

const Info = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [movie, setMovie] = useState<MovieObject | Record<string, never>>({});

    let urlParams = useSearchParams();
    let movieId: string | null = urlParams.get('movie');
    if (movieId === null || movieId === '') {
        return 'Invalid request'
    }

    useEffect(() => {
        (async () => {
            try {
                let movieData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options).then(resp => resp.json());
                let logoLink: string = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?language=en-US&append_to_response=images&include_image_language=null,en`, options).then(resp => resp.json()).then(data => {
                    if ('logos' in data) {
                        if (data['logos'].length >= 1) {
                            return data.logos[0].file_path;
                        }
                    }
                });
                setMovie({ ...movieData, logo: logoLink });
                console.log(movieData)

                setLoading(false)
            }
            catch (e) {
                console.log('Movie get failed')
            }
        })();
    }, []);

    let hasLogo: boolean = false;
    if ('logo' in movie) {
        if (movie.logo != undefined && movie.logo != '') { hasLogo = true; }
    }
    return (
        (loading) ?
            <Loading />
            :
            <>
                {/* <NavBar /> */}
                {/* Info Box */}
                <div className="" >
                    <div className="max-w-full h-[92dvh] max-h-[92dvh] md:h-[70dvh] md:max-h-[70dvh]">
                        <div className={`h-[92dvh] max-h-[92dvh] max-w-full w-screen md:h-[70dvh] md:max-h-[70dvh] bg-black`}>
                            <div className="flex flex-col items-start justify-end gap-4 md:gap-2 bg-white h-[92dvh] max-h-[92dvh] md:h-[70dvh] md:max-h-[70dvh] pl-16 pb-20 relative md:p-2 md:items-center md:justify-center">
                                {hasLogo &&
                                    <>
                                        <Image src={tmdb_img + movie.logo} alt={movie.title} width={250} height={250} className='z-10 drop-shadow-xl object-contain' />
                                    </>
                                }
                                <h3 className=" font-Poppins text-4xl 4xl:text-8xl md:text-3xl font-bold text-white md:text-center -mb-2 z-10 drop-shadow-sm max-w-[50vw] md:max-w-[90vw]">{movie.title}</h3>
                                <p className="text-2xl 4xl:text-4xl md:text-lg text-white md:text-center drop-shadow-sm max-w-[70vw] md:max-w-[80vw] truncate overflow-hidden z-10">{movie.overview}</p>

                                <Link href="#" className="flex flex-row items-center gap-1 mt-4 font-bold bg-white drop-shadow-xl text-black px-4 py-2 rounded-md z-10 hover:scale-110 ease-in-out duration-150">
                                    <Image loading='lazy' src={playSvg} alt="OpenMovie" height={30} width={30} />Watch Now
                                </Link>
                                <Image loading='eager' src={tmdb_img + movie.backdrop_path} alt="Movie Poster" className="w-screen max-w-full h-[92dvh] max-h-[92dvh] md:h-[70dvh] md:max-h-[70dvh] absolute object-cover -z-0" fill />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </>
    )
}

export default Info