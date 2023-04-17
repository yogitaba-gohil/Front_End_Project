import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import hero from '../assets/hero.jpg'

const Hero = () => {
  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <HeroWords />
        <ShopNowButton />
      </article>
      <HeroImage />
    </Wrapper>
  )
}

export default Hero

const HeroWords = () => {
  return (
    <>
      <h1>
        high quality <br />
        product for your daily life
      </h1>
      <h6>#BASICALLYFORYOU</h6>
      <p>
      Pick our most loved products from our wide range in Bath & Body!
      </p>
    </>
  )
}

const ShopNowButton = () => {
  return (
    <Link to='/products' className='btn hero-btn'>
      shop now
    </Link>
  )
}

const HeroImage = () => {
  return (
    <article className='img-container'>
      <img src={hero} alt='hero' className='main-img' />
    </article>
  )
}

const Wrapper = styled.section`
  min-height: 80vh;
  display: grid;
  place-items: center;
  .img-container {
    display: block;
    position: relative;
    padding-top: 38px;
    margin-bottom: 43px;

  }
  .main-img {
    width: 100%;
    height: 550px;
    position: relative;
    border-radius: var(--radius);
    display: block;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 1rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  .img-container::before {
    content: '';
    position: absolute;
    width: 10%;
    height: 80%;
    background: var(--clr-primary-9);
    bottom: 0%;
    left: -8%;
    border-radius: var(--radius);
  }
  h1{
    margin-top: 39px;

  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
      margin-top:0px;

    }
    img-container {
      padding-top: 0px;
    }  
      p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    
  }
`