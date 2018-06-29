import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface MenuProps {}

export const Menu = (props:MenuProps) => {

  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/app'>Calendar</Link>
      <Link to='/overview'>Overview</Link>
      <Link to='/list'>List</Link>
    </div>
  )
}
