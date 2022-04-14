import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from '../Slider/Slider.module.css'
import banner1 from "../../assets/banner-1.png";
import banner2 from "../../assets/banner-2.png";

const slideImages = [
    banner1,
    banner2
  ]

const Slider = () => {
    return (
      <div>
        <Slide easing="ease">
          <div className={styles.eachSlide}>
            <div style={{'backgroundImage': `url('${slideImages[0]}')`}}>
            </div>
          </div>
          <div className={styles.eachSlide}>
            <div style={{'backgroundImage': `url('${slideImages[1]}')`}}>
            </div>
          </div>
        </Slide>
      </div>
    )
};

export default Slider;