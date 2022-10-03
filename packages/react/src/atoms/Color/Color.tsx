import React from 'react'

interface Props{
    hexCode: string;
    width: string;
    height: string;

}

const Color:React.FC<Props> = ({hexCode, width, height}) => {
  return (
    <div style={{backgroundColor: hexCode, width, height}}></div>
  )
}

export default Color