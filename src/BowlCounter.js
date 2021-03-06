import CountUp from "react-countup";
import { useEffect } from "react/cjs/react.production.min";
import { TOTAL_VARIATIONS } from "./library.js";

export default function BowlCounter() {
    return (
        <CountUp
            delay={0}
            start={1}
            end={TOTAL_VARIATIONS}
            duration={2}
            separator="."
        >
            {({ countUpRef, delay }) => (
                <div className="inline-block">
                    <span ref={countUpRef} />
                </div>
            )}
        </CountUp>
    );
}
