import React from 'react';
import Slider, { Settings } from 'react-slick';
import './Promo.scss';

import promo1w1080 from './assets/promo1-1080.jpg';
import promo1w768 from './assets/promo1-768.jpg';
import promo1w500 from './assets/promo1-500.jpg';
import promo1w365 from './assets/promo1-365.jpg';

import promo2w1080 from './assets/promo2-1080.jpg';
import promo2w768 from './assets/promo2-768.jpg';
import promo2w500 from './assets/promo2-500.jpg';
import promo2w365 from './assets/promo2-365.jpg';

import promo3w1080 from './assets/promo3-1080.jpg';
import promo3w768 from './assets/promo3-768.jpg';
import promo3w500 from './assets/promo3-500.jpg';
import promo3w365 from './assets/promo3-365.jpg';

export const Promo: React.FC = () => {
  const settings: Settings = {
    arrows: false,
    dots: true,
    className: 'promo',
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 1000
  };
  return (
    <div className="promo-wrap">
      <Slider {...settings}>
        <div className="slide-wrap">
          <picture>
            <source media="(min-width:1120px)" srcSet={promo1w1080} />
            <source media="(min-width:800px)" srcSet={promo1w768} />
            <source media="(min-width:540px)" srcSet={promo1w500} />
            <img src={promo1w365} alt="Promo code all5" />
          </picture>
        </div>
        <div className="slide-wrap">
          <picture>
            <source media="(min-width:1120px)" srcSet={promo2w1080} />
            <source media="(min-width:800px)" srcSet={promo2w768} />
            <source media="(min-width:540px)" srcSet={promo2w500} />
            <img src={promo2w365} alt="Promo code all5" />
          </picture>
        </div>
        <div className="slide-wrap">
          <picture>
            <source media="(min-width:1120px)" srcSet={promo3w1080} />
            <source media="(min-width:800px)" srcSet={promo3w768} />
            <source media="(min-width:540px)" srcSet={promo3w500} />
            <img src={promo3w365} alt="Promo code all5" />
          </picture>
        </div>
      </Slider>
    </div>
  );
};
