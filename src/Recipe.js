import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImageBackground } from "./ImageMapBowl";
import { FaCopy, FaCheck } from "react-icons/fa";

import { getIngredientsFromUrl } from "./library.js";

export default function Recipe() {
  useEffect(() => {
    console.log("mounted recipe page", bowlWithIngredients);
  }, []);
  const bowlWithIngredients = getIngredientsFromUrl();
  return (
    <div id="recipe">
      <RecipeMain ingredients={bowlWithIngredients} />
      <RecipeAside ingredients={bowlWithIngredients} />
      <ImageBackground ingredients={bowlWithIngredients} />
    </div>
  );
}

function RecipeAside({ ingredients }) {
  const [unit, setUnit] = useState(2);
  const [copiedLink, setCopiedLink] = useState(false);
  const shareRecipe = async () => {
    // console.log("clicked share", window.location.href);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 3000);
    await navigator.clipboard.writeText(window.location.href);
  };
  function calculateUnit(value) {
    setUnit(value);
  }
  useEffect(() => {
    // console.log("mounted recipe aside", ingredients);
  }, []);
  return (
    <section className="recipe-aside">
      <div>
        <div className="header">
          <h2>List of ingredients</h2>
          <p>
            Ingredients for{" "}
            <input
              onChange={() => calculateUnit(this.event.target.value)}
              id="portions"
              type="number"
              min="1"
              max="12"
              step="1"
              defaultValue="2"
            />{" "}
            bowls
          </p>
        </div>
      </div>
      <div className="space-line"></div>
      <ul className="ingredient-list">
        <li className="ingredient-item">
          <div className="unit">
            {ingredients.base.serving * unit} {ingredients.base.unit}
          </div>
          <div className="ingredient">{ingredients.base.name_en}</div>
        </li>
        <li className="recipe-aside ingredient-item">
          <div className="unit">
            {ingredients.greens.serving * unit} {ingredients.greens.unit}
          </div>
          <div className="ingredient">{ingredients.greens.name_en}</div>
        </li>
        <li className="recipe-aside ingredient-item">
          <div className="unit">
            {ingredients.veggies.serving * unit} {ingredients.veggies.unit}
          </div>
          <div className="ingredient">{ingredients.veggies.name_en}</div>
        </li>
        <li className="recipe-aside ingredient-item">
          <div className="unit">
            {ingredients.extra.serving * unit} {ingredients.extra.unit}
          </div>
          <div className="ingredient">{ingredients.extra.name_en}</div>
        </li>
        <li className="recipe-aside ingredient-item">
          <div className="unit">
            {ingredients.dressing.serving * unit} {ingredients.dressing.unit}
          </div>
          <div className="ingredient">
            {ingredients.dressing.name_en} Dressing
          </div>
        </li>
        <li className="recipe-aside ingredient-item">
          <div className="unit">
            {ingredients.topping.serving} {ingredients.topping.unit}
          </div>
          <div className="ingredient">{ingredients.topping.name_en}</div>
        </li>
      </ul>
      <button onClick={shareRecipe} className="button button-secondary">
        {!copiedLink ? (
          <span className="copy-icon">
            Share your bowl <FaCopy />
          </span>
        ) : (
          <span className="copy-icon">
            Link copied! <FaCheck />
          </span>
        )}
      </button>
    </section>
  );
}

function RecipeMain({ ingredients }) {
  useEffect(() => {}, []);
  return (
    <section className="recipe-main">
      <div>
        <div className="recipe-main-header">
          <h1 id="recipe-main-title">This Is Your Bowl</h1>
          <p>Everything you need to create your bowl from scratch!</p>
        </div>

        <div className="recipe-main-instructions">
          <div className="space-line"></div>
          <h2>Prepare Your Bowl</h2>
          <h3>1) {ingredients.base.name_en}</h3>
          <p>{ingredients.base.preparation}</p>
          <h3>2) {ingredients.greens.name_en}</h3>
          <p>{ingredients.greens.preparation}</p>
          <h3>3) {ingredients.veggies.name_en}</h3>
          <p>{ingredients.veggies.preparation}</p>
          <h3>4) {ingredients.extra.name_en}</h3>
          <p>{ingredients.extra.preparation}</p>
          <h3>6) {ingredients.dressing.name_en}</h3>
          <p>{ingredients.dressing.preparation}</p>
          <h3>5) {ingredients.topping.name_en}</h3>
          <p>{ingredients.topping.preparation}</p>
          {/* {ingredients.map((ingredient) => (
            <div key={ingredient.id}>
              <h3>{ingredient.name}</h3>
              <p>{ingredient.preparation}</p>
            </div>
          ))} */}
          <h2>Enjoy!</h2>
        </div>
        <div id="recipe-main-buttons">
          <Link to={"/#"} className="button button-primary">
            Still hungry? Mix another bowl
          </Link>
        </div>
      </div>
    </section>
  );
}
