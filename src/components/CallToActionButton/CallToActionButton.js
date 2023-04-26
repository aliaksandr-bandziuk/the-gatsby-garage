import { Link } from 'gatsby'
import React from 'react'

export const CallToActionButton = ({label, destination}) => {
  return (
    <Link
      className='inline-block cursor-pointer bg-yellow-500 hover:bg-yellow-400 transition-colors py-2 px-4 font-bold uppercase no-underline rounded-sm'
      to={destination}
    >
      {label}
    </Link>
  )
}