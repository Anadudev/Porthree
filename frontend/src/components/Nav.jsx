// import React from 'react'
import Logo from './Logo'
import { NavLinks } from '../data/index'
import Button from './Button'
const Nav = () => {
  return (
    <div className='py-2 px-5'>
      <div className='flex flex-row justify-between align-middle p-3 bg-slate-200 rounded shadow-md'>
        <Logo />
        <div>
          <div className='flex flex-row'>
            <ul className='flex flex-row'>{
              NavLinks.map(
                (item) => (
                  <li key={item.id}>
                    <a href={item.url} className='text-slate-500 hover:text-slate-700 font-bold mx-3'>{item.title}</a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div>
          <Button value={'Get started'} />
        </div>
      </div>
    </div>
  )
}

export default Nav
