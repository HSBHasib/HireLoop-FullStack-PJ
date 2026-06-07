import React from 'react'
import GlobeSection from './GlobeSection';
import BannerTopDets from './BannerTopDets';

const Banner = () => {
  return (
    <div className='w-full bg-[#010103] flex flex-col items-center justify-start'>
      <BannerTopDets />
      <GlobeSection />
    </div>
  )
}

export default Banner;

