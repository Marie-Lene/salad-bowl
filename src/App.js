import { useState, useEffect } from "react";

import "./styles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Recipe from "./Recipe";
import Bowl from "./Bowl";
import { ImageMapBowl } from "./ImageMapBowl";
// import Modal from "./Modal";
import { createBowl, getIngredientsFromBowl } from "./library";

const ingredients = getIngredientsFromBowl();

const DEFAULT_BOWL = {
  base: 0,
  greens: 0,
  veggies: 0,
  extra: 0,
  topping: 0,
  dressing: 0
};

export default function App() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [bowl, setBowl] = useState(DEFAULT_BOWL);
  function onCreateBowl(isFixedBowl) {
    const currBowl = createBowl(isFixedBowl);
    console.log("recipe in App created", currBowl);
    setBowl(currBowl);
  }
  function closeModal() {
    setIsVisibleModal(false);
  }
  useEffect(() => {
    setTimeout(() => {
      setIsVisibleModal(true);
    }, 1000);
  }, []);
  return (
    // <div className={loaded ? "app loaded" : "app"}>
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Bowl createBowl={onCreateBowl} currBowl={bowl} />
            {/* {isVisibleModal && <Modal toggleModal={closeModal} />} */}
          </Route>
          <Route path="/recipe">
            <Recipe />
          </Route>
          <Route path="/map">
            <ImageMapBowl ingredients={ingredients} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
