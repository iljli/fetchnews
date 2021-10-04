import React, { useState } from 'react'

const DropdownNumberOfResults = ({setNumberOfArticlesPr}) => {
  const [currentValue, setCurrentValue] = useState('1')
  
  const changeValue = (value) => {
    setCurrentValue(value);
    setNumberOfArticlesPr(value)
  }
  
  return (
    <form>
        Articles per page:
      <select 
        onChange={(event) => changeValue(event.target.value)}
        value={currentValue}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </form>
  )
}

export default DropdownNumberOfResults;