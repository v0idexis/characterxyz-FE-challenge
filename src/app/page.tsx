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
  const [latest, setLatest] = useState<Array<MovieObject>>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    (async () => {
      try {
        let trending: Array<MovieObject> = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US`, options).then(resp => resp.json()).then(data => data.results);
        setLatest(trending);
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
          {latest.length !== 0 && <RowSlider moviesArray={latest} title='Latest >' />}
          {/* <Footer /> */}
        </div>
      </>
  )
}

export default Home