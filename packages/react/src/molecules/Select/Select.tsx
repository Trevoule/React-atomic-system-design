import React, { createRef, KeyboardEventHandler, useEffect, useRef, useState } from 'react'

import Text from '../../atoms/Text'

const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW:40 
}

interface SelectOption {
    label: string;
    value: string;
}

interface renderOptionProps {
  isSelected: boolean
  option: SelectOption
  getOptionRecommendedProps: (overrideProps?: Object ) => Object
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void
    options?: SelectOption[]
    label?: string
    renderOption?: (props: renderOptionProps) => React.ReactNode
}

const Select:React.FC<SelectProps> = ({options = [], label = 'Please select an option...', onOptionSelected:handler, renderOption } ) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const labelRef = useRef<HTMLButtonElement>(null)
  const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])

  const [overlayTop, setOverlayTop] = useState<number | null>(null);
  
  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if(handler){
      handler(option, optionIndex)
    }
    setSelectedIndex(optionIndex)
    setIsOpen(false)
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10)
    }, [labelRef.current?.offsetHeight])
  
    let selectedOption = null

    if(selectedIndex !== null){
      selectedOption = options[selectedIndex]
    }

    const highlightItem = (optionIndex: number | null) => {
      setHighlightedIndex(optionIndex)
    }

    const onButtonKeyDown: KeyboardEventHandler = (event) => {
      event.preventDefault()

      if([KEY_CODES.DOWN_ARROW,KEY_CODES.ENTER, KEY_CODES.SPACE ].includes(event.keyCode)){
        setIsOpen(true)

        // set focus on the list item
        highlightItem(0)
      }
    }

    useEffect(() =>{
      setOptionRefs(options.map(_ => createRef<HTMLLIElement>()))
    },[options.length])

    console.log(optionRefs);

    useEffect(() => {
      if(highlightedIndex !== null && isOpen){
        const ref = optionRefs[highlightedIndex]

        if(ref && ref.current) {
          ref.current.focus()
        }
      } 

    },[isOpen])
  
  return (
    <div className='dse-select'>
        <button onKeyDown={onButtonKeyDown} aria-controls='dse-select-list' aria-haspopup={true} aria-expanded={isOpen} ref={labelRef} className='dse-select__label' onClick={() => onLabelClick()}>
      <Text>
        {selectedIndex === null ? label : selectedOption?.label}
      </Text>
      <svg className={`dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--close'}`} width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
      </svg>
        </button>
    {isOpen && overlayTop && (<ul role="menu" id="dse-select-list" style={{top: overlayTop}} className='dse-select__overlay'>{options.map((option, optionIndex) => {
        
      const isSelected:boolean = selectedIndex === optionIndex
      const isHighlighted = selectedIndex === optionIndex;

      const ref = optionRefs[optionIndex] 

        
      const renderOptionProps = {
        option,
        isSelected,
        getOptionRecommendedProps: (overrideProps = {
        }) => {return {
          ref,
          tabIndex: isHighlighted ? -1 : 0,
          onMouseEnter: () => highlightItem(optionIndex),
          onMouseLeave: () => highlightItem(null),
          className: `dse-select__option 
            ${isSelected ? "dse-select__option--selected" : ""},
            ${isHighlighted ? "dse-select-option--highlighted": ""}`,
        onClick: () => onOptionSelected(option, optionIndex),
        key: option.value,
        ...overrideProps,

        }}
      }

        if(renderOption){
          return renderOption(renderOptionProps)
        }
        
        return <li 
      //   ref={ref}
      //   className={`dse-select__option ${isSelected ? "dse-select__option--selected" : ""
      // }`} 
      //   onClick={() => onOptionSelected(option, optionIndex)} 
      //   key={option.value}
      {...renderOptionProps.getOptionRecommendedProps()}
        >
          <Text>
          {option.label}
          </Text>
           
          {isSelected && (<svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>)}
          </li>            
    }) }</ul>)}
    
    </div>
  )
}

export default Select