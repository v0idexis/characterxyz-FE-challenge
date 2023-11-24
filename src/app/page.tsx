'use client'
import React, { useEffect, useState, useCallback } from 'react'
import NavBar from './components/navbar'
import Footer from './components/footer'
import Carousel from './components/carousel'
import RowSlider from './components/rowslider'
import Loading from './components/loading'


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

const Home: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<Array<MovieObject>>([]);
  const [topRated, setTopRated] = useState<Array<MovieObject>>([]);
  const [popular, setPopular] = useState<Array<MovieObject>>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        let nowPlayingData: Array<MovieObject> = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US`, options).then(resp => resp.json()).then(data => data.results);
        setNowPlaying(nowPlayingData);

        let topRatedData: Array<MovieObject> = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US`, options).then(resp => resp.json()).then(data => data.results);
        setTopRated(topRatedData);

        let popularData: Array<MovieObject> = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US`, options).then(resp => resp.json()).then(data => data.results);
        setPopular(popularData);

        setLoading(false)
      }
      catch (e) {
        console.log(`Error ${e}`)
      }
    })();

  }, []);

  return (
    (loading) ?
      <Loading />
      :
      <>
        <div className='w-full h-auto max-w-full bg-gray-950'>
          <NavBar />
          <Carousel />
          <div className="flex flex-col gap-16 pb-16">
            {nowPlaying.length !== 0 && <RowSlider moviesArray={nowPlaying} title='In theaters >' />}
            {topRated.length !== 0 && <RowSlider moviesArray={topRated} title='Top Rated >' />}
            {popular.length !== 0 && <RowSlider moviesArray={popular} title='Popular >' />}
          </div>
          <Footer />
        </div>
      </>
  )
}

export default Home