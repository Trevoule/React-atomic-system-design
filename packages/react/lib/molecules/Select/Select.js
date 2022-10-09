import React, { useState, useRef, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/Text.js';

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40
};
const Select = ({ options = [], label = 'Please select an option...', onOptionSelected: handler, renderOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const labelRef = useRef(null);
    const [optionRefs, setOptionRefs] = useState([]);
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
    const highlightItem = (optionIndex) => {
        setHighlightedIndex(optionIndex);
    };
    const onButtonKeyDown = (event) => {
        event.preventDefault();
        if ([KEY_CODES.DOWN_ARROW, KEY_CODES.ENTER, KEY_CODES.SPACE].includes(event.keyCode)) {
            setIsOpen(true);
            // set focus on the list item
            highlightItem(0);
        }
    };
    useEffect(() => {
        setOptionRefs(options.map(_ => createRef()));
    }, [options.length]);
    console.log(optionRefs);
    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = optionRefs[highlightedIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen]);
    return (React.createElement("div", { className: 'dse-select' },
        React.createElement("button", { onKeyDown: onButtonKeyDown, "aria-controls": 'dse-select-list', "aria-haspopup": true, "aria-expanded": isOpen, ref: labelRef, className: 'dse-select__label', onClick: () => onLabelClick() },
            React.createElement(Text, null, selectedIndex === null ? label : selectedOption?.label),
            React.createElement("svg", { className: `dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--close'}`, width: "1rem", height: "1rem", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" },
                React.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" }))),
        isOpen && overlayTop && (React.createElement("ul", { role: "menu", id: "dse-select-list", style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = selectedIndex === optionIndex;
            const ref = optionRefs[optionIndex];
            const renderOptionProps = {
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        ref,
                        tabIndex: isHighlighted ? -1 : 0,
                        onMouseEnter: () => highlightItem(optionIndex),
                        onMouseLeave: () => highlightItem(null),
                        className: `dse-select__option 
            ${isSelected ? "dse-select__option--selected" : ""},
            ${isHighlighted ? "dse-select-option--highlighted" : ""}`,
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps,
                    };
                }
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return React.createElement("li", Object.assign({}, renderOptionProps.getOptionRecommendedProps()),
                React.createElement(Text, null, option.label),
                isSelected && (React.createElement("svg", { width: "1rem", height: "1rem", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" }))));
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
