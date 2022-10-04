import React from 'react'
import {Spacing} from '@ds.e/foundation';

interface Props{
    hexCode: string;
    width?: keyof typeof Spacing;
    height?: keyof typeof Spacing;
}

const Color:React.FC<Props> = ({hexCode, width = Spacing.sm, height = Spacing.sm}) => {
    const className = `dse-width-${width} dse-height-${height}`
  return (
    <div className={className} style={{backgroundColor: hexCode, width, height}}></div>
  )
}

export default Color