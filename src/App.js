import React, { Component } from "react"
import "./App.css"

import Search from "./components/search/search"

class App extends Component {
  constructor(props) {
    super(props)
    console.log("hola")

    const flights = []
    this.state = {
      rows: "this is a row"
    }
    let flightRows = []
    flights.forEach(flight => {
      console.log(flight.flightNumber)
      const flightRow = (flight = { flight })
      flightRows.push(flightRow)
    })

    this.state = { rows: flightRows }
  }

  render() {
    return (
      <div className="app">
        <h2 className="navbar">Flight Search</h2>
        <Search />
      </div>
    )
  }
}

export default App
