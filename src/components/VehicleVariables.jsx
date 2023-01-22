import React from 'react'
import Message from './Message'
import { Link } from 'react-router-dom'

const VehicleVariables = ({ variables, error, errorMessage, isLoading }) => {

  return (
    <div className='vehicle-variable'>
      <h3 className='vehicle-variable__title component__title'>
        Variables list:
      </h3>
      {
        error &&
        <Message text={errorMessage} />
      }
      {
        isLoading &&
        <Message text='Loading...' />
      }
      <ul className='variables__list'>
        {
          variables.map((item, index) => (
            <li 
              className='variables__item list__item'
              key={index}
            >
              <Link to={`/variables/${item.ID}`}>
                <h4 className='variables__title'>
                  {item.Name}
                </h4>
              </Link>
              <div className='variables__description' dangerouslySetInnerHTML={{__html: item.Description}}></div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default VehicleVariables