import React from 'react'

const Button = ({ onClick, value, link, style, secondary }) => {
    return (
        <div onClick={onClick} className='bg-blue-900 text-white py-2 px-7 rounded-md text-center font-medium'>{value}</div>
    )
}

export default Button
