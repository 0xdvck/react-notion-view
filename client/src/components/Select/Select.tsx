import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";

type Option = {
    label: string;
    value: string;
}

type SelectProps = {
    options?: Option[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    width?: number
};

export const Select = ({ options = [],
    value,
    onChange,
    width
}: SelectProps) => {
    const selectRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(value);
    const selectedOption = options.find(option => option.value === selectedValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [open])

    const handleSelect = (option: Option) => {
        if (option.value == selectedValue) {
            setOpen(false);
            return
        }
        onChange && onChange(option.value);
        setSelectedValue(option.value);
        if(open) {
            setOpen(false);
        }
    }

    const handleClick = () => {
        setOpen(open => !open);
    }


    return <div className={styles.select} style={{width: width}} ref={selectRef}>
        <div onClick={handleClick}> {selectedValue ? selectedOption?.label : "Select an option"} </div>
        {open && <div className={styles.selectOptions}>
            {options.map(option => (
                <div className={styles.selectOption} key={option.label} onClick={() => handleSelect(option)}>
                    {option.label}
                </div>
            ))}
        </div>}
    </div>
} 