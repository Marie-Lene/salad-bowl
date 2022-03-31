// original size
// width="3000"
// height="1280"

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
// console.log("window size, width:", windowWidth, "height:", windowHeight);

const MAP_X = 3000;
const MAP_Y = 1280;

let mapCoords = {
  base: [
    2398,
    347,
    2318,
    328,
    2322,
    365,
    2268,
    382,
    2342,
    420,
    2344,
    473,
    2261,
    489,
    2218,
    468,
    2259,
    538,
    2327,
    583,
    2311,
    625,
    2366,
    669,
    2311,
    624,
    2329,
    585,
    2375,
    559,
    2419,
    595,
    2410,
    631,
    2506,
    610,
    2508,
    580,
    2474,
    505,
    2427,
    444,
    2415,
    398,
    2399,
    392,
    2396,
    347
  ],
  greens: [
    2383,
    1008,
    2338,
    981,
    2309,
    974,
    2243,
    858,
    2266,
    830,
    2195,
    824,
    2154,
    823,
    2084,
    894,
    2083,
    927,
    1979,
    979,
    2026,
    976,
    2069,
    1034,
    2084,
    1068,
    2111,
    1048,
    2186,
    1064,
    2248,
    1078,
    2323,
    1077,
    2354,
    1029,
    2381,
    1008
  ],
  veggies: [
    2424,
    351,
    2429,
    342,
    2460,
    348,
    2496,
    387,
    2539,
    407,
    2562,
    443,
    2598,
    484,
    2608,
    523,
    2628,
    573,
    2626,
    583,
    2643,
    611,
    2656,
    697,
    2630,
    739,
    2600,
    748,
    2608,
    796,
    2583,
    826,
    2569,
    871,
    2585,
    922,
    2531,
    897,
    2525,
    930,
    2492,
    929,
    2466,
    986,
    2409,
    1015,
    2362,
    982,
    2323,
    971,
    2284,
    899,
    2247,
    854,
    2270,
    831,
    2335,
    770,
    2374,
    674,
    2317,
    626,
    2333,
    589,
    2373,
    566,
    2413,
    598,
    2404,
    639,
    2513,
    616,
    2518,
    583,
    2478,
    497,
    2428,
    442,
    2420,
    397,
    2401,
    387,
    2400,
    343,
    2431,
    341
  ],
  extra: [
    2090,
    421,
    2101,
    526,
    2070,
    432,
    2147,
    406,
    2147,
    384,
    2124,
    355,
    2048,
    345,
    1964,
    377,
    1947,
    438,
    1898,
    477,
    1867,
    537,
    1880,
    570,
    1850,
    607,
    1828,
    659,
    1846,
    721,
    1856,
    791,
    1893,
    868,
    1916,
    887,
    1935,
    942,
    1978,
    975,
    2023,
    948,
    2075,
    921,
    2059,
    868,
    2024,
    818,
    1977,
    752,
    2000,
    724,
    1969,
    672,
    1994,
    613,
    2056,
    597,
    2062,
    579,
    2071,
    504,
    2093,
    461,
    2071,
    432
  ],
  topping: [
    2151,
    413,
    2091,
    423,
    2098,
    468,
    2102,
    533,
    2083,
    479,
    2063,
    596,
    1995,
    617,
    1971,
    674,
    2009,
    724,
    1983,
    753,
    2034,
    827,
    2077,
    894,
    2150,
    818,
    2246,
    820,
    2266,
    829,
    2332,
    765,
    2355,
    667,
    2303,
    624,
    2318,
    584,
    2254,
    540,
    2204,
    461,
    2261,
    477,
    2336,
    458,
    2330,
    418,
    2280,
    391,
    2246,
    388,
    2317,
    356,
    2307,
    284,
    2218,
    243,
    2135,
    286,
    2123,
    343,
    2150,
    377,
    2150,
    414
  ],
  dressing: [2637, 205, 133]
};

const MAPSHAPE = {
  base: "poly",
  greens: "poly",
  veggies: "poly",
  extra: "poly",
  topping: "poly",
  dressing: "circle"
};

function debounce(callback, time) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback.apply(this, arguments);
    }, time);
  };
}

function updateCoordinates({ coordX, coordY }) {
  let newCoord = {
    coordX: Math.floor(coordX * (windowWidth / MAP_X)),
    coordY: Math.floor(coordY * (windowHeight / MAP_Y))
  };
  return newCoord;
}

// window.onresize -> recalculate Coordinates

// console.log(
//   "updated coord original size",
//   updateCoordinates({ coordX: 3000, coordY: 1280 }),
//   "point 1",
//   updateCoordinates({ coordX: 2398, coordY: 347 }),
//   "point 2",
//   updateCoordinates({ coordX: 2318, coordY: 328 })
// );

// for logging purposes

// function logClickPos(event) {
//   console.log("clientX: " + event.clientX + " - clientY: " + event.clientY);
// }
// window.addEventListener("click", logClickPos);

// <map name="salad-bowl">
//         {/* // <!-- #$-:Image map file created by GIMP Image Map plug-in -->
//                     <!-- #$-:GIMP Image Map plug-in by Maurits Rijk -->
//                     <!-- #$VERSION:2.3 -->
//                     <!-- #$AUTHOR:Marie-Lene Armingeon --> */}
//         <area
//           shape="poly"
//           className="map-base"
//           // coords={coords-base}
//           coords="2398,347,2318,328,2322,365,2268,382,2342,420,2344,473,2261,489,2218,468,2259,538,2327,583,2311,625,2366,669,2311,624,2329,585,2375,559,2419,595,2410,631,2506,610,2508,580,2474,505,2427,444,2415,398,2399,392,2396,347"
//           alt="base"
//           onClick={areaClick}
//           onMouseOver={hoverStateOn}
//           onMouseOut={hoverStateOff}
//         />
//         <area
//           shape="poly"
//           className="map-greens"
//           coords="2383,1008,2338,981,2309,974,2243,858,2266,830,2195,824,2154,823,2084,894,2083,927,1979,979,2026,976,2069,1034,2084,1068,2111,1048,2186,1064,2248,1078,2323,1077,2354,1029,2381,1008"
//           alt="greens"
//           onClick={areaClick}
//           onMouseOver={hoverStateOn}
//           onMouseOut={hoverStateOff}
//         />
//         <area
//           shape="poly"
//           className="map-veggies"
//           coords="2424,351,2429,342,2460,348,2496,387,2539,407,2562,443,2598,484,2608,523,2628,573,2626,583,2643,611,2656,697,2630,739,2600,748,2608,796,2583,826,2569,871,2585,922,2531,897,2525,930,2492,929,2466,986,2409,1015,2362,982,2323,971,2284,899,2247,854,2270,831,2335,770,2374,674,2317,626,2333,589,2373,566,2413,598,2404,639,2513,616,2518,583,2478,497,2428,442,2420,397,2401,387,2400,343,2431,341"
//           alt="veggies"
//           onClick={areaClick}
//           onMouseOver={hoverStateOn}
//           onMouseOut={hoverStateOff}
//         />
//         <area
//           shape="poly"
//           className="map-extra"
//           coords="2090,421,2101,526,2070,432,2147,406,2147,384,2124,355,2048,345,1964,377,1947,438,1898,477,1867,537,1880,570,1850,607,1828,659,1846,721,1856,791,1893,868,1916,887,1935,942,1978,975,2023,948,2075,921,2059,868,2024,818,1977,752,2000,724,1969,672,1994,613,2056,597,2062,579,2071,504,2093,461,2071,432"
//           alt="extra"
//           onClick={areaClick}
//           onMouseOver={hoverStateOn}
//           onMouseOut={hoverStateOff}
//         />
//         <area
//           shape="poly"
//           className="map-topping"
//           coords="2151,413,2091,423,2098,468,2102,533,2083,479,2063,596,1995,617,1971,674,2009,724,1983,753,2034,827,2077,894,2150,818,2246,820,2266,829,2332,765,2355,667,2303,624,2318,584,2254,540,2204,461,2261,477,2336,458,2330,418,2280,391,2246,388,2317,356,2307,284,2218,243,2135,286,2123,343,2150,377,2150,414"
//           alt="topping"
//           onClick={areaClick}
//           onMouseOver={hoverStateOn}
//           onMouseOut={hoverStateOff}
//         />
//         <area
//           shape="circle"
//           className="map-dressing"
//           coords="2637,205,133"
//           alt="dressing"
//           onClick={areaClick}
//           onMouseOver={hoverStateOn}
//           onMouseOut={hoverStateOff}
//         />
//       </map>

export { windowWidth, windowHeight, debounce, mapCoords, MAPSHAPE };
