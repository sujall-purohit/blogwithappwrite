import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="text-3xl font-bold bg-linear-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">CodeCanvas</div>
  )
}

export default Logo