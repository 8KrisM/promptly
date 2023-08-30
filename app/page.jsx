import React from 'react'
import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
            Discover & share
            <br className='max-md: hiden'/>
            <span className='blue_gradient text-center'>AI - powered prompts</span>
        </h1>
        <p className='desc text-center'>
            Promtly is an online community, to share and discover powerful AI prompts.
        </p>

        <Feed />
    </section>
  )
}

export default Home