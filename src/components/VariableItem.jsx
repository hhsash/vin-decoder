import React from 'react'
import { useParams } from 'react-router-dom'

const VariableItem = ({ variables }) => {

  const { id } = useParams()
  const item = variables.find(({ ID }) => ID == id)
  if(item === undefined){return}

  return (
    <div className='variable'>
      <h3 className='variable__title component__title'>
        VariableID №{id} info:
      </h3>
      <div className='variable__wrapper'>
        <h4 className='variable__title'>
          Name: {item.Name}
        </h4>
        <div className='variable__description' dangerouslySetInnerHTML={{__html: item.Description}}></div>
        <span className='variable__groupname'>
          <i>Group name: {item.GroupName}</i>
        </span>   
      </div>
    </div>
  )
}

export default VariableItem