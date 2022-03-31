import ingredientList from "../public/ingredients.json";

const DEFAULT_BOWL = {
  base: 0,
  greens: 0,
  veggies: 0,
  extra: 0,
  dressing: 0,
  topping: 0
};

const KEYS = ["base", "greens", "veggies", "extra", "dressing", "topping"];

function createUrl(currBowl) {
  //console.log("url created");
  return `/recipe?base=${currBowl.base}&greens=${currBowl.greens}&veggies=${currBowl.veggies}&extra=${currBowl.extra}&topping=${currBowl.topping}&dressing=${currBowl.dressing}`;
}

// const currUrl = createUrl(currBowl);
// console.log("url", currUrl);

function getIngredientsFromUrl() {
  // console.log("search", window.location.search);
  const URLParams = new URLSearchParams(window.location.search);
  // console.log("URLParams", URLParams);
  const result = {};
  for (let [key, value] of URLParams) {
    result[key] = ingredientList[key][value];
  }
  return result;
}

function getIngredientsFromBowl(bowl = DEFAULT_BOWL) {
  const result = {};
  for (let key in bowl) {
    const foundIngredient = ingredientList[key][bowl[key]];
    result[key] = foundIngredient;
    //console.log("check ingredients", ingredientList[key][bowl[key]]);
  }
  return result;
}

// console.log("ingredient library", getIngredientsFromBowl());

function createRandomIndex(array) {
  // console.log("length, array", array.length, array);
  return Math.floor(Math.random() * array.length);
}

function createBowl(isFixedBowl) {
  console.log("isfixedbowl in create function", isFixedBowl);
  const recipe = {};
  for (var key in ingredientList) {
    const index = createRandomIndex(ingredientList[key]);
    if (isFixedBowl[key] || isFixedBowl[key] === 0) {
      recipe[key] = isFixedBowl[key];
    } else {
      recipe[key] = index;
    }
  }
  return recipe;
}

// const currBowl = createBowl(ingredientList);
// console.log("bowl", currBowl);

/* calculation the total number of possible combinations */
function calculateTotal() {
  var result = 1;
  for (var key in ingredientList) {
    result *= key.length;
    //console.log("array length", key.length, key);
  }
  return result;
}

const TOTAL_VARIATIONS = calculateTotal();

// console.log("# of possible variations", calculateTotal(ingredientList));

export {
  createBowl,
  createUrl,
  TOTAL_VARIATIONS,
  KEYS,
  getIngredientsFromBowl,
  getIngredientsFromUrl
};
