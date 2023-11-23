'use client'
import React, { Fragment, useCallback, useState, useEffect } from 'react'
import useEmblaCarousel, {
    EmblaCarouselType,
    EmblaOptionsType
} from 'embla-carousel-react'
import crypto from 'crypto'
import '@styles/embla.css'
import Link from 'next/link'
import Image from 'next/image';
import playSvg from '@icons/play_arrow.svg'

function hashStr(str: string) {
    //Uniqye key generation using current time to prevent duplicate keys if movies appear in multiple sliders
    return crypto.createHash('sha1').update(str + new Date().toISOString()).digest('hex');
}

const tmdb_img: string = process.env.NEXT_PUBLIC_TMDB_PATH!;

type MoviesObject = {
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

type Props = {
    moviesArray: MoviesObject[],
    title: string
}
let windowWidth: number = 1;
if (typeof window !== 'undefined') {
    windowWidth = window.innerWidth >= 767 ? 3 : 1
}
const options: EmblaOptionsType = { loop: false, align: 'start', slidesToScroll: windowWidth, startIndex: 0, watchDrag: true, containScroll: 'trimSnaps' }

const RowSlider: React.FC<Props> = (props: Props) => {
    const moviesArray: MoviesObject[] = props.moviesArray;
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false)

    const scrollPrev = useCallback(
        () => {
            if (!emblaApi) return
            emblaApi.scrollPrev()

        },
        [emblaApi]
    )
    const scrollNext = useCallback(
        () => {
            if (!emblaApi) return
            emblaApi.scrollNext()
        },
        [emblaApi]
    )

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        console.log('Inside onSelect')
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        console.log('inside UseEffect')
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    console.log('Movies Length: ' + moviesArray.length)

    return (
        <>
            <div className='w-full max-w-full overflow-hidden pl-16 pr-16 md:p-2 relative'>
                <p className="text-lg text-white font-bold mb-4 ml-1">{props.title}</p>
                <div className="embla relative items-center w-full" >
                    <div className="embla__viewport relative items-center w-full" ref={emblaRef}>
                        <div className='embla__container flex gap-4'>
                            {
                                moviesArray.map((item: MoviesObject) => {
                                    {
                                        return (
                                            <Fragment key={hashStr(item.backdrop_path)}>
                                                <div className="embla__slide w-[200px] max-w-[200px] rounded-lg relative bg-gray-900 ease-in-out duration-150 overflow-hidden hover:w-[400px] hover:max-w-[400px] hover:z-20" >
                                                    <div className="flex flex-row items-starts">
                                                        <Link href={{ pathname: "/player", query: { movie: item.id } }}>
                                                            <img
                                                                alt="Movie Poster"
                                                                className="object-cover rounded-lg w-[200px] max-w-[200px] h-[300px] max-h-[300px]"
                                                                height="300"
                                                                src={tmdb_img + item.poster_path}
                                                                style={{
                                                                    aspectRatio: "200/300",
                                                                }}
                                                                width="200"
                                                            />
                                                        </Link>
                                                        <div className="h-[300px] w-full flex flex-col justify-center align-middle p-4">
                                                            <div className="text-xl font-bold text-white text-center">{item.title}</div>
                                                            <Link href={{ pathname: "/player", query: { movie: item.id } }} className="flex flex-row items-center gap-1 mt-4 font-bold bg-white drop-shadow-xl text-black px-4 py-2 rounded-md z-10 hover:scale-110 ease-in-out duration-150">
                                                                <Image loading='lazy' src={playSvg} alt="OpenMovie" height={30} width={30} />Watch Now
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>)
                                    }
                                })
                            }
                        </div>
                    </div>
                </div >
                <div className="absolute w-16 left-0 top-0 bottom-0 flex items-center justify-start bg-gradient-to-r from-black to-transparent cursor-pointer" onClick={scrollPrev} style={
                    {
                        display: prevBtnDisabled ? 'none' : 'flex'
                    }
                }>
                    <div className="text-2xl font-bold text-white px-4 py-2 bg-white bg-opacity-20 z-10 rounded-r-lg">
                        {`<`}
                    </div>
                </div>
                <div className="absolute w-16 right-0 top-0 bottom-0 flex items-center justify-end bg-gradient-to-l from-black to-transparent cursor-pointer" onClick={scrollNext} style={
                    {
                        display: nextBtnDisabled ? 'none' : 'flex'
                    }
                }>
                    <div className="text-2xl font-bold text-white px-4 py-2 bg-white bg-opacity-20 z-10 rounded-l-lg">
                        {`>`}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RowSlider