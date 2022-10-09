import React, { useState, useRef, useEffect } from 'react';

const Select = ({ options = [], label = 'Please select an option...', onOptionSelected: handler }) => {
    const [isOpen, setIsOpen] = useState(false);
    const labelRef = useRef(null);
    const [overlayTop, setOverlayTop] = useState(null);
    const onOptionSelected = (option, optionIndex) => {
        if (handler) {
            handler(option, optionIndex);
        }
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    return (React.createElement("div", { className: 'dse-select' },
        React.createElement("button", { ref: labelRef, className: 'dse-select__label', onClick: () => onLabelClick() },
            React.createElement("span", null, label),
            React.createElement("svg", { width: "1rem", height: "1rem", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" },
                React.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" }))),
        isOpen && overlayTop && (React.createElement("ul", { style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, optionIndex) => {
            return React.createElement("li", { onClick: () => onOptionSelected(option, optionIndex), key: option.value }, option.label);
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
