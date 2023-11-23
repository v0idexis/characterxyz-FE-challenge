'use client'
import React, { Fragment, useCallback, useState, useEffect } from 'react'
import useEmblaCarousel, {
    EmblaCarouselType,
    EmblaOptionsType
} from 'embla-carousel-react'
import crypto from 'crypto'
import '@styles/embla.css'

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
    moviesArray: MoviesObject[]
}

const RowSlider: React.FC<Props> = (props: Props) => {
    const moviesArray: MoviesObject[] = props.moviesArray;
    let windowWidth: number = window !== undefined ? window.innerWidth : 767;

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: windowWidth > 767 ? 3 : 1, startIndex: 0, watchDrag: true, })//containScroll: 'trimSnaps'
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    )
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    )

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    console.log(moviesArray)
    return (
        <>
            <div className="embla relative flex items-center w-[100vw] max-w-[100vw]" ref={emblaRef}>
                <div className='embla__container max-h-[300px] gap-8'>
                    {
                        moviesArray.map((item: MoviesObject) => {
                            {
                                return (
                                    <Fragment key={hashStr(item.backdrop_path)}>
                                        <div className="embla__slide max-h-[300px] w-30 max-w-30 relative" >
                                            <div className="max-h-[300px] rounded-lg bg-gray-900 relative z-10 "> //hover:w-[300px] hover:max-w-[300px]
                                                <img
                                                    alt="Movie Poster"
                                                    className="object-cover rounded-lg shadow-md relative top-0 hover:z-20 w-[200px] max-w-[200px] h-[300px] max-h-[300px]"
                                                    // height="300"
                                                    src={tmdb_img + item.poster_path}
                                                    style={{
                                                        aspectRatio: "200/300",
                                                    }}
                                                // width="200"
                                                />
                                            </div>
                                            {/* <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black text-white rounded-b-lg">
                                                <h2 className="text-sm">{item.title}</h2>
                                            </div> */}
                                        </div>

                                    </Fragment>)
                            }
                        })
                    }
                </div>
                <div className="embla__prev absolute left-0 top-0 bottom-0 flex items-center" onClick={scrollPrev} style={{ display: prevBtnDisabled ? 'none' : 'flex' }}>
                    <div className="text-lg px-4 py-2 bg-white bg-opacity-50 z-10">
                        {`<`}
                    </div>
                </div>
                <div className="embla__next absolute right-0 top-0 bottom-0 flex items-center" onClick={scrollNext} style={{ display: nextBtnDisabled ? 'none' : 'flex' }}>
                    <div className="text-lg px-4 py-2 bg-white bg-opacity-50 z-10">
                        {`>`}
                    </div>
                </div>
            </div >
        </>
    )
}

export default RowSlider