import * as React from "react";
import { SVGProps } from "react";
const waveSvg2 = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
        <path fill="#002233" d="M0 0h900v600H0z" />
        <path
            fill="#0066FF"
            d="m0 477 21.5 2.2c21.5 2.1 64.5 6.5 107.3-3.4 42.9-9.8 85.5-33.8 128.4-44.3 42.8-10.5 85.8-7.5 128.6-2 42.9 5.5 85.5 13.5 128.4 26.3C557 468.7 600 486.3 642.8 488c42.9 1.7 85.5-12.7 128.4-12.2 42.8.5 85.8 15.9 107.3 23.5L900 507v94H0Z"
        />
    </svg>
);
export default waveSvg2;
