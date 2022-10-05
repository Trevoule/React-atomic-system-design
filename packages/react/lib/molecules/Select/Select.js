import React, { useState } from 'react';

const Select = ({ options = [], label = 'Please select an option...', onOptionSelected: handler }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOptionSelected = (option, optionIndex) => {
        if (handler) {
            handler(option, optionIndex);
        }
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    return (React.createElement("div", null,
        React.createElement("button", { onClick: () => onLabelClick() }, label),
        isOpen && (React.createElement("ul", null, options.map((option, optionIndex) => {
            return React.createElement("li", { onClick: () => onOptionSelected(option, optionIndex), key: option.value }, option.label);
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
