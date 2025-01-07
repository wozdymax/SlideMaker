import { useState, useRef, useEffect, MouseEventHandler } from "react";
import styles from "./Select.module.css"
import { Option } from "./Option";

type SelectProps = {
    selected: string | number;
    options: string[];
    placeholder?: string;
    mode?: 'rows' | 'cells';
    status?: 'default' | 'invalid';
    onChange?: (selected: string) => void;
    onClose?: () => void;
  };
  
const Select = ({mode = 'rows', options, placeholder, status = 'default', selected, onChange, onClose,}: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        const { target } = event;
        if (target instanceof Node && !rootRef.current?.contains(target)) {
          isOpen && onClose?.();
          setIsOpen(false);
        }
      };
  
      window.addEventListener('click', handleClick);
  
      return () => {
        window.removeEventListener('click', handleClick);
      };
    }, [isOpen, onClose]);

    useEffect(() => {
        const placeholderEl = placeholderRef.current;
        if (!placeholderEl) return;
    
        const handleClick = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            setIsOpen((prev) => !prev);
          }
        };
    
        placeholderEl.addEventListener('keydown', handleClick);
    
        return () => {
          placeholderEl.removeEventListener('keydown', handleClick);
        };
      }, []);
  
    const handleOptionClick = (value: string) => {
      setIsOpen(false);
      onChange?.(value);
    };
    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
      setIsOpen((prev) => !prev);
    };
  
    return (
      <div
        className={styles.selectWrapper}
        ref={rootRef}
        data-is-active={isOpen}
        data-mode={mode}
      >
        <div
          className={styles.placeholder}
          data-status={status}
          data-selected={!selected}
          onClick={handlePlaceHolderClick}
          role='button'
          tabIndex={0}
          ref={placeholderRef}
        >
          {selected || placeholder}
        </div>
        {isOpen && (
          <ul className={styles.select}>
            {options.map((option) => (
              <Option
                key={option}
                value={option}
                onClick={handleOptionClick}
              />
            ))}
          </ul>
        )}
      </div>
    );
};

export {Select}
