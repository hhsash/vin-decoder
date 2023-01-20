import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaHistory } from 'react-icons/fa'

const VinSearch = () => {
  const [searchVin, setSearchVin] = useState('')

  return (
    <div className='vin-search'>
        <div className='vin-search__wrapper'>
          <input
            autoFocus
            value={searchVin}
            onChange={e => setSearchVin(e.target.value)}
            type='text'
            placeholder='Enter the VIN...'
            minLength='17'
            maxLength='17'
            className='vin-search__input'
          />
          <button
            title='Decode VIN'
            type='submit'
            className='vin-search__button'
          >
            <BsSearch size={20} />
          </button>
        </div>
        <div className='vin-search__recently'>
          <ul className='recently__list'>
            <li className='recently__item'>
              <FaHistory size={14} />
              1FTFW1CT5DFC10312
            </li>
            <li className='recently__item'>
              <FaHistory size={14} />
              1FTFW1CT5DFC10312
            </li>
            <li className='recently__item'>
              <FaHistory size={14} />
              1FTFW1CT5DFC10312
            </li>
            <li className='recently__item'>
              <FaHistory size={14} />
              1FTFW1CT5DFC10312
            </li>
            <li className='recently__item'>
              <FaHistory size={14} />
              1FTFW1CT5DFC10312
            </li>
          </ul>
        </div>
    </div>
  )
}

export default VinSearch