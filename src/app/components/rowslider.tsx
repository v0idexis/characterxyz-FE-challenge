'use client'
import React, { Fragment, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import '@styles/embla_slider.css'


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
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 1, startIndex: 0, watchDrag: false });
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
        console.log('next')
    }, [emblaApi])

    let moviesArray: MoviesObject[] = props.moviesArray;
    console.log(moviesArray)
    return (
        <>
            <div className="embla relative overflow-x-hidden flex items-center max-w-[100vw]" ref={emblaRef}>
                <div className='embla__container max-w-[100vw] gap-8'>
                    <div className="embla__prev absolute left-0 top-0 bottom-0 flex items-center" onClick={scrollPrev}>
                        <div className="text-lg px-4 py-2 bg-white bg-opacity-50 z-10">
                            {`<`}
                        </div>
                    </div>
                    {
                        moviesArray.map((item: MoviesObject) => {
                            {
                                return (
                                    <Fragment>
                                        <div className="embla__slide w-20 max-w-20 relative" >
                                            <img
                                                alt="Movie Poster"
                                                className="object-cover w-full h-64 rounded-lg shadow-md"
                                                height="300"
                                                src={tmdb_img + item.poster_path}
                                                style={{
                                                    aspectRatio: "200/300",
                                                }}
                                                width="200"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black text-white rounded-b-lg">
                                                <h2 className="text-sm">Movie Title</h2>
                                                <p className="text-xs">Movie Description</p>
                                            </div>
                                        </div>

                                    </Fragment>)
                            }
                        })
                    }
                    <div className="embla__next absolute right-0 top-0 bottom-0 flex items-center" onClick={scrollNext}>
                        <div className="text-lg px-4 py-2 bg-white bg-opacity-50 z-10">
                            {`>`}
                        </div>
                    </div>
                </div>
            </div >





        </>
    )
}

export default RowSlider