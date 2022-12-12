import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
  {
    url: '/image/teknoloji.jpg',
    caption: 'Slide 1'
  },
  {
    url: '/image/bilgisayarlar.jpg',
    caption: 'Slide 2'
  },
  {
    url: '/image/telefonlar.jpg',
    caption: 'Slide 3'
  },
];

export default function Slideshow() {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div style={{'backgroundImage': `url(${slideImage.url})`, 'height':'400px'}}>
                <span>{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}