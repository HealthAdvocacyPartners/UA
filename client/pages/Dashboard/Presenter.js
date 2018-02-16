import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DashboardPage extends Component {
  render() {
    return (
      <div>
        <Link to="/">Back Home</Link>
      </div>
    )
  }
}
