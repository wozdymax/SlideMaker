import { MouseEventHandler, useEffect, useRef } from "react";
import styles from "./Option.module.css";

type OptionProps = {
    value: string;
    onClick: (value: string) => void;
};
const Option = ({ value, onClick }: OptionProps) => {
    const optionRef = useRef<HTMLLIElement>(null);

    const handleClick =
        (clickedValue: string): MouseEventHandler<HTMLLIElement> =>
        () => {
            onClick(clickedValue);
        };

    useEffect(() => {
        const option = optionRef.current;
        if (!option) return;

        const handleEnterPress = (event: KeyboardEvent) => {
            if (document.activeElement === option && event.key === "Enter") {
                onClick(value);
            }
        };

        option.addEventListener("keydown", handleEnterPress);

        return () => {
            option.removeEventListener("keydown", handleEnterPress);
        };
    }, [value, onClick]);

    return (
        <li className={styles.option} value={value} onClick={handleClick(value)} tabIndex={0} ref={optionRef}>
            {value}
        </li>
    );
};

export { Option };
