import React, { useState, useRef, useEffect } from 'react';
import Text from '../../atoms/Text/Text.js';

const Select = ({ options = [], label = 'Please select an option...', onOptionSelected: handler, renderOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const labelRef = useRef(null);
    const [overlayTop, setOverlayTop] = useState(null);
    const onOptionSelected = (option, optionIndex) => {
        if (handler) {
            handler(option, optionIndex);
        }
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    let selectedOption = null;
    if (selectedIndex !== null) {
        selectedOption = options[selectedIndex];
    }
    return (React.createElement("div", { className: 'dse-select' },
        React.createElement("button", { "aria-controls": 'dse-select-list', "aria-haspopup": true, "aria-expanded": isOpen, ref: labelRef, className: 'dse-select__label', onClick: () => onLabelClick() },
            React.createElement(Text, null, selectedIndex === null ? label : selectedOption?.label),
            React.createElement("svg", { className: `dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--close'}`, width: "1rem", height: "1rem", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" },
                React.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" }))),
        isOpen && overlayTop && (React.createElement("ul", { role: "menu", id: "dse-select-list", style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const renderOptionProps = {
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        className: `dse-select__option ${isSelected ? "dse-select__option--selected" : ""}`,
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps,
                    };
                }
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return React.createElement("li", { className: `dse-select__option ${isSelected ? "dse-select__option--selected" : ""}`, onClick: () => onOptionSelected(option, optionIndex), key: option.value },
                React.createElement(Text, null, option.label),
                isSelected && (React.createElement("svg", { width: "1rem", height: "1rem", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" }))));
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
