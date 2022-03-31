import { KEYS } from "./library.js";

export default function ImageBackground({ isActive, ingredients }) {
    return (
        <div>
            {KEYS.map((key) => (
                <img
                    key={key}
                    id={"img-" + key}
                    className={
                        "img-" + key + " " + (isActive === key && "hover-image")
                    }
                    src={ingredients[key].img}
                    alt={key}
                />
            ))}
            <img
                id="img-plate"
                className="img-plate"
                src="/images/plate-0-master.png"
                alt="plate"
            />
        </div>
    );
}
