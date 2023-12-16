import * as React from "react";
import { SVGProps } from "react";
const waveSvg = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={900} 
    height={600} 
    viewBox="0 0 900 600"
    {...props}>
        <path fill="#002233" d="M0 0h900v600H0z" />
        <path
            fill="#0066FF"
            d="m0 477 21.5 3.3c21.5 3.4 64.5 10 107.3-2.3 42.9-12.3 85.5-43.7 128.4-41.2 42.8 2.5 85.8 38.9 128.6 40.9 42.9 2 85.5-30.4 128.4-38.9 42.8-8.5 85.8 6.9 128.6 22.4 42.9 15.5 85.5 31.1 128.4 25.6 42.8-5.5 85.8-32.1 107.3-45.5L900 428v173H0Z"
        />
    </svg>
);
export default waveSvg;
