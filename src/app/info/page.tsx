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

function timeLength(num: number): string {
    let hours: number = (num / 60);
    let rhours: number = Math.floor(hours);
    let minutes: number = (hours - rhours) * 60;
    let rminutes: number = Math.round(minutes);
    return rhours + "h " + rminutes + " m";
}

type MovieObject = {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: any,
    budget: number,
    genres: { name: string }[],
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
    spoken_languages: { english_name: string }[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    logo?: string
}

const Info = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [movie, setMovie] = useState<MovieObject | Record<string, never>>({});

    let urlParams = useSearchParams();
    let movieId: string | null = urlParams.get('movie');

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
    }, [movieId]);

    if (movieId === null || movieId === '') {
        return 'Invalid request'
    }

    let hasLogo: boolean = false;
    if ('logo' in movie) {
        if (movie.logo != undefined && movie.logo != '') { hasLogo = true; }
    }
    return (
        (loading) ?
            <Loading />
            :
            <>
                <NavBar />
                <div className="w-full max-w-full bg-gray-950" >
                    <div className="max-w-full h-[92dvh] max-h-[92dvh] md:h-[70dvh] md:max-h-[70dvh]">
                        <div className={`h-[92dvh] max-h-[92dvh] max-w-full w-screen md:h-[70dvh] md:max-h-[70dvh] bg-black`}>
                            <div className="flex flex-col items-start justify-end gap-4 md:gap-2 bg-white h-[92dvh] max-h-[92dvh] md:h-[70dvh] md:max-h-[70dvh] pl-16 pb-20 relative md:p-2 md:items-center md:justify-center">
                                {hasLogo &&
                                    <>
                                        <Image src={tmdb_img + movie.logo} alt={movie.title} width={250} height={250} className='z-10 drop-shadow-xl object-contain' />
                                    </>
                                }
                                <h3 className=" font-Poppins text-4xl 4xl:text-8xl md:text-3xl font-bold text-white md:text-center -mb-2 z-10 drop-shadow-sm max-w-[50vw] md:max-w-[90vw]">{movie.title}</h3>
                                <p className="text-2xl 4xl:text-4xl md:text-lg text-white md:text-center drop-shadow-sm max-w-[70vw] md:max-w-[80vw] truncate overflow-hidden z-10">{movie.tagline}</p>

                                <Link href="#" className="flex flex-row items-center gap-1 mt-4 font-bold bg-white drop-shadow-xl text-black px-4 py-2 rounded-md z-10 hover:scale-110 ease-in-out duration-150">
                                    <Image loading='lazy' src={playSvg} alt="OpenMovie" height={30} width={30} />Watch Now
                                </Link>
                                <Image loading='eager' src={tmdb_img + movie.backdrop_path} alt="Movie Poster" className="w-screen max-w-full h-[92dvh] max-h-[92dvh] md:h-[70dvh] md:max-h-[70dvh] absolute object-cover -z-0" fill />
                            </div>
                        </div>
                    </div>
                    <div className="max-w-full pt-8 pl-16 pr-16 pb-20 bg-gray-950 flex flex-row gap-[5%] md:flex-col md:pl-4 md:pr-4 md:gap-16">
                        <div className="flex flex-col gap-4 text-lg font-bold w-[65%] md:w-full">
                            <div className="flex flex-row gap-4">
                                <p className="text-green-500">{Number(movie.vote_average).toFixed(1)}</p>
                                <p className="text-white">·</p>
                                <p className="text-white">{new Date(movie.release_date).getFullYear()}</p>
                                <p className="text-white">·</p>
                                <p className="text-white">{timeLength(movie.runtime)}</p>
                            </div>
                            <div className="text-gray-300 font-semibold">{movie.overview}</div>
                        </div>

                        <div className="flex flex-col gap-4 text-md font-medium w-[30%] md:w-full">
                            <div className="flex flex-row gap-4 text-white">
                                <p>
                                    <span className="text-gray-400 w-fit">Genres:</span> {[...[...movie.genres].map(genre => { return genre.name })].join(', ')}
                                </p>
                            </div>
                            <div className="flex flex-row gap-4 text-white">
                                <p>
                                    <span className="text-gray-400 w-fit">Languages:</span> {[...[...movie.spoken_languages].map(lang => { return lang.english_name })].join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
    )
}

export default Info