import React from 'react'

export const Square = ({children, isSelected, uploadBoard, index}) => {

    const className = `square ${isSelected ? 'is-selected' : ''}`;

    function handleClick(){
        uploadBoard(index)
    }

  return (
    <div onClick={handleClick} className={className}>
        {children}
    </div>
  )
}
