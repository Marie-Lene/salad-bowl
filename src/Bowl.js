import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getIngredientsFromBowl, createUrl, KEYS } from "./library.js";
import ImageBackground from "./ImageBackground";
import Counter from "./Counter";

import { FaLock, FaUnlock } from "react-icons/fa";

export default function Bowl({ createBowl, currBowl }) {
  const [isActive, setIsActive] = useState(null);
  const [isFixedBowl, setIsFixedBowl] = useState({});
  function onToggleFixedKey(id) {
    console.log("toggle fixed key", id, currBowl[id]);
    if (isFixedBowl[id] === currBowl[id]) {
      setIsFixedBowl({
        ...isFixedBowl,
        [id]: null
      });
      return;
    }
    setIsFixedBowl({
      ...isFixedBowl,
      [id]: currBowl[id]
    });
  }
  function renderActiveLabel(label) {
    setIsActive(label);
    console.log("isActive label passed to parent", label);
  }

  useEffect(() => {
    console.log(
      "mounted bowl, currBowl",
      currBowl,
      "fixedBowl",
      isFixedBowl,
      "isActive",
      isActive
    );
  }, [currBowl, isFixedBowl, isActive]);

  const bowlWithIngredients = getIngredientsFromBowl(currBowl);
  return (
    <div id="homepage-hero">
      {/* <ImageMapBowl
        ingredients={bowlWithIngredients}
        toggleFixedKey={() => onToggleFixedKey(this.event.target.alt)}
        passActiveLabel={(isActive) => renderActiveLabel(isActive)}
      /> */}
      <BowlText
        currBowl={currBowl}
        createBowl={() => createBowl(isFixedBowl)}
        isFixedBowl={isFixedBowl}
      />
      <BowlBody
        isActive={isActive}
        ingredients={bowlWithIngredients}
        isFixedBowl={isFixedBowl}
        toggleFixedKey={() => onToggleFixedKey(this.event.target.id)}
        passActiveLabel={renderActiveLabel}
      />
    </div>
  );
}

function BowlText({ createBowl, currBowl, isFixedBowl }) {
  function onSpaceKey(event) {
    if (event.code === "Space") {
      console.log("space", isFixedBowl);
      createBowl(isFixedBowl);
    }
  }
  useEffect(() => {
    window.addEventListener("keyup", onSpaceKey);
    return () => {
      window.removeEventListener("keyup", onSpaceKey);
    };
  }, [isFixedBowl]);
  return (
    <section className="homepage-hero-text">
      <div>
        <h1 id="homepage-hero-text-title">Mix Your Own Salad Bowl</h1>
        <div className="p">
          Create your own bowl out of <Counter /> variations!
        </div>
        <div id="homepage-hero-text-btns">
          <button
            onClick={() => createBowl()}
            className="button button-primary"
          >
            Press space to mix your bowl
          </button>
          <Link to={createUrl(currBowl)} className="button button-secondary">
            Get the full recipe
          </Link>
        </div>
      </div>
    </section>
  );
}

function BowlBody({
  ingredients,
  toggleFixedKey,
  isFixedBowl,
  passActiveLabel,
  isActive
}) {
  const [labelVisible, setLabelVisible] = useState(true);
  useEffect(() => {}, [isFixedBowl]);
  // function checkFixedKey(key) {
  //   const result = isFixedBowl[key];
  //   console.log("result", result);
  // }

  return (
    <section
      className="homepage-hero-image"
      onMouseEnter={() => {
        console.log("show labels on");
        setTimeout(() => setLabelVisible(true), 500);
      }}
      onMouseLeave={() => {
        console.log("show labels off");
        setTimeout(() => setLabelVisible(true), 500);
      }}
    >
      <LabelInterface
        labelVisible={labelVisible}
        passActiveLabel={passActiveLabel}
        isActive={isActive}
        ingredients={ingredients}
        isFixedBowl={isFixedBowl}
        toggleFixedKey={toggleFixedKey}
      />

      <ImageBackground isActive={isActive} ingredients={ingredients} />
    </section>
  );
}

function LabelInterface({
  passActiveLabel,
  isActive,
  ingredients,
  isFixedBowl,
  toggleFixedKey,
  labelVisible
}) {
  function hoverStateOn(id) {
    passActiveLabel(id);
    console.log("mouseover area, add hover state to", id);
  }
  function hoverStateOff(id) {
    passActiveLabel(null);
    console.log("mouseout area, remove hover state from ", id);
  }
  return (
    <div className="label-interface">
      {labelVisible && (
        <>
          <div className="label-group">
            {KEYS.map((key) => (
              <div
                key={key}
                id={key}
                className={
                  "ingredient-label " +
                  key +
                  (isActive === key && " hover-text")
                }
                onMouseOver={() => hoverStateOn(this.event.target.id)}
                onMouseOut={() => hoverStateOff(this.event.target.id)}
                onClick={() => toggleFixedKey(this.event.target.id)}
              >
                {ingredients[key].name_en}
                {"   "}
                {isFixedBowl[key] || isFixedBowl[key] === 0 ? (
                  <FaLock />
                ) : (
                  <FaUnlock />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
