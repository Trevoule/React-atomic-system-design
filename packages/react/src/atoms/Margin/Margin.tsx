import React from 'react'
import { Spacing } from '@ds.e/foundation';

interface Props {
    space?: keyof typeof Spacing;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}

const Margin:React.FC<Props> = ({space ="sm", children, left, right, bottom, top}) => {
    let className = ``;

    if(!left && !right && !top && !bottom){
        className = `dse-margin-${space}`
    }

    if(left) {
        className = `${className} dse-margin-left-${space}`
    }

    if(right) {
        className = `${className} dse-margin-right-${space}`
    }

    if(top) {
        className = `${className} dse-margin-top-${space}`
    }

    if(bottom) {
        className = `${className} dse-margin-bottom-${space}`
    }




  return (
    <div className={className}>{children}</div>
  )
}

export default Margin