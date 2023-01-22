import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Header from './Header'
import Message from './Message'

const VinSearch = ({ searchVin, setSearchVin, onVinDecode, vinData, recentlyVin, isLoading, respMessage, error, errorMessage }) => {

  return (
    <div className='vin-search'>
      <div className='vin-search__wrapper'>
        <input
          autoFocus
          value={searchVin}
          onChange={e => setSearchVin(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && onVinDecode(searchVin)}
          type='text'
          placeholder='Enter the VIN...'
          maxLength='17'
          list='vin-search__recently'
          className='vin-search__input'
        />
        <datalist id='vin-search__recently'>
          {
            recentlyVin.map((item, index) => (
              <option key={index}>
                {item}
              </option>
            ))
          }
        </datalist>
        <button
          title='Decode VIN'
          type='submit'
          className='vin-search__button'
          onClick={onVinDecode}
        >
          <BsSearch size={20} />
        </button>
      </div>
      <div className='vin-decode'>
        <ul className='vin-decode__list'>
          {
            isLoading &&
            <Message text='Loading...' />
          }
          {
            error &&
            <Message text={errorMessage} />
          }
          <div className='message'>
            {
              <Message text={respMessage} />
            }
          </div>
          {
            vinData.length > 0 &&
            <h3 className='vin-decode__title component__title'>
              Decoding results:
            </h3>
          }
          {
            vinData.map((item, index) => (
              <li 
                key={index}
                className='list__item'
              >
                <h4>
                  {item.Variable}: 
                </h4>
                <p>
                  {item.Value}
                </p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default VinSearch