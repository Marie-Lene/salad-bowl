import { useState, useEffect } from "react";
import { debounce, mapCoords, MAPSHAPE } from "./image-map.js";
import { KEYS } from "./library.js";

function ImageMapBowl({ ingredients, toggleFixedKey, passActiveLabel }) {
  const [isActive, setIsActive] = useState(null);
  const [screenSize, setScreenSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  // useEffect(() => {
  //   console.log("handeled resize", screenSize);
  //   const debouncedHandleResize = debounce(function handleResize() {
  //     setScreenSize({
  //       height: window.innerHeight,
  //       width: window.innerWidth
  //     });
  //   }, 1000);
  //   window.addEventListener("resize", debouncedHandleResize);
  //   return () => {
  //     window.removeEventListener("resize", debouncedHandleResize);
  //   };
  // }, [screenSize]);
  function areaClick(event) {
    console.log("clicked area", event.target.alt);
  }
  function hoverStateOn(event) {
    setIsActive(event.target.alt);
    passActiveLabel(event.target.alt);
    console.log("mouseover area, add hover state to", event.target.alt);
  }
  function hoverStateOff() {
    setIsActive(null);
    console.log(
      "mouseout area, remove hover state from ",
      this.event.target.alt
    );
  }
  return (
    <div className="img-bowl-wrapper">
      <map name="salad-bowl">
        {KEYS.map((key) => (
          <area
            key={key}
            alt={key}
            title={key}
            href="#"
            id={key}
            onMouseOver={hoverStateOn}
            onMouseOut={hoverStateOff}
            onClick={() => {
              areaClick(this.event);
              toggleFixedKey(this.event);
            }}
            coords={mapCoords[key]}
            shape={MAPSHAPE[key]}
          />
        ))}
      </map>
      <img
        className="img-map-area"
        // width={screenSize.width}
        // height={screenSize.height}
        width="100%"
        height="100%"
        src="/images/0-0_image-map-area.png"
        useMap="#salad-bowl"
        alt=""
      />
      <ImageBackground isActive={isActive} ingredients={ingredients} />
    </div>
  );
}

function ImageBackground({ isActive, ingredients }) {
  return (
    <div>
      {KEYS.map((key) => (
        <img
          key={key}
          id={"img-" + key}
          className={"img-" + key + " " + (isActive === key && "hover-image")}
          src={ingredients[key].img}
          alt={key}
        />
      ))}
      <img
        id="img-plate"
        className="img-plate"
        src="/images/0_plate-2.png"
        alt="plate"
      />
    </div>
  );
}

export { ImageBackground, ImageMapBowl };
