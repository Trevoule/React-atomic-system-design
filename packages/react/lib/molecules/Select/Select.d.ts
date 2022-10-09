import React from 'react';
interface SelectOption {
    label: string;
    value: string;
}
interface renderOptionProps {
    isSelected: boolean;
    option: SelectOption;
    getOptionRecommendedProps: (overrideProps?: Object) => Object;
}
interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
    options?: SelectOption[];
    label?: string;
    renderOption?: (props: renderOptionProps) => React.ReactNode;
}
declare const Select: React.FC<SelectProps>;
export default Select;
