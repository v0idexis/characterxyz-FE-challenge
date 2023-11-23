import React, { Fragment } from 'react'

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
    let moviesArray: MoviesObject[] = props.moviesArray;
    return (
        <>
            <div>Content</div>
            {moviesArray.map((movie: MoviesObject) => {
                return (
                    <>
                        <div>Test Test</div>
                    </>
                )
            })}
        </>
    )
}

export default RowSlider