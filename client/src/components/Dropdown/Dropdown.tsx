import React, { useState, useEffect, useRef } from 'react';
import styles from "./Dropdown.module.css";

type DropdownProps = {
    anchorEl: React.RefObject<HTMLButtonElement | HTMLDivElement | null>;
    onClose: () => void;
    open?: boolean;
    children?: React.ReactNode;
}

export const Dropdown = ({ anchorEl, onClose, open = false, children }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Position dropdown relative to anchorEl
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (anchorEl.current && open) {
            const rect = anchorEl.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom ,
                left: rect.left
            });

            // Handle click outside to close
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node) &&
                    anchorEl.current &&
                    !anchorEl.current.contains(event.target as Node)) {
                    onClose();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);

        }
    }, [anchorEl, open, onClose]);

    if (!open || !anchorEl) return null;

    const positionStyle = {
        top: `${position.top}px`,
        left: `${position.left}px`,
    }

    return (
        <div
            className={styles.dropDown}
            style={positionStyle}
            ref={dropdownRef}
        >
            {children}
        </div>
    );
};
