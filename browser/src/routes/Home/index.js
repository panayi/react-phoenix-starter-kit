import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import style from './style.css'

export class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1 styleName="h1">React/Phoenix Starter Template</h1>
        <ul className="list-group">
          <li className="list-group-item">1. React, Redux</li>
          <li className="list-group-item">2. CSS Modules, CSSNext, PostCSS</li>
          <li className="list-group-item">3. Phoenix Framework</li>
        </ul>
      </div>
    )
  }
}

export default connect()(CSSModules(Home, style))
