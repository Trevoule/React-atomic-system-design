import React, { useState } from 'react'

interface SelectOption {
    label: string;
    value: string;
}


interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void
    options?: SelectOption[]
    label?: string

}

const Select:React.FC<SelectProps> = ({options = [], label = 'Please select an option...', onOptionSelected:handler } ) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if(handler){
      handler(option, optionIndex)
    }
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <div className='dse-select'>
        <button className='dse-select__label' onClick={() => onLabelClick()}>
      <span>{label}</span>
      <svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
</svg>
        </button>
    {isOpen && (<ul className='dse-select__overlay'>{options.map((option, optionIndex) => {
        return <li onClick={() => onOptionSelected(option, optionIndex)} key={option.value}>{option.label}</li>
    }) }</ul>)}
    
    </div>
  )
}

export default Select