import React from "react";
import { SVGProps } from "react";
import { useDebounce } from "usehooks-ts";

const WaveSvg = () => {
    const [height, setHeight] = React.useState(window.innerHeight)
    const [width, setWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
      window.addEventListener('resize', () => {
        console.log('resizing')
        console.log(window.innerHeight, window.innerWidth)
        setWidth(window.innerHeight)
        setHeight(window.innerHeight)
      })
    }, [window.onresize])
  return (

    <svg xmlns="http://www.w3.org/2000/svg"
    width={height} 
    height={width} 
    >
        <path fill="#002233" d="M0 0h900v600H0z" />
        <path
            fill="#0066FF"
            d="m0 477 21.5 3.3c21.5 3.4 64.5 10 107.3-2.3 42.9-12.3 85.5-43.7 128.4-41.2 42.8 2.5 85.8 38.9 128.6 40.9 42.9 2 85.5-30.4 128.4-38.9 42.8-8.5 85.8 6.9 128.6 22.4 42.9 15.5 85.5 31.1 128.4 25.6 42.8-5.5 85.8-32.1 107.3-45.5L900 428v173H0Z"
        />
        <path
            fill="#0066FF"
            d="m0 477 21.5 2.2c21.5 2.1 64.5 6.5 107.3-3.4 42.9-9.8 85.5-33.8 128.4-44.3 42.8-10.5 85.8-7.5 128.6-2 42.9 5.5 85.5 13.5 128.4 26.3C557 468.7 600 486.3 642.8 488c42.9 1.7 85.5-12.7 128.4-12.2 42.8.5 85.8 15.9 107.3 23.5L900 507v94H0Z"
        />
    </svg>
  )
}

export default WaveSvg;
