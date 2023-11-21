'use client'
import React, { Fragment } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import '../../../public/customStyles/embla.css'

const Carousel: React.FC = () => {
    const [emblaRef] = useEmblaCarousel();
    let tempArray = ['bg-black', 'bg-red-500', 'bg-yellow-500'];
    // console.log(tempArray)
    return (
        <>
            <div className="embla" ref={emblaRef}>
                <div className={"embla__container h-[40vh]"}>
                    {
                        tempArray.map(color => {
                            return (
                                <Fragment key={color}>
                                    <div className="embla__slide">
                                        <div className={`h-[40vh] w-full ${color}`}></div>
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