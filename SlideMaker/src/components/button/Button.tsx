import styles from './Button.module.css'

type ButtonProps = {
    text: string,
    onClick: () => void,
    className: string,
}

const Button = ({text, onClick, className}: ButtonProps) => {
    return(
        <button className={`${styles.button} ${className}`} onClick={onClick}>{text}</button>
    )
}

export {Button}