import React, { Component } from "react"
import axios from "axios"

import "./search.css"

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: "Welcome to Flight Search",
      flights: [],
      query: "",
      dateQuery: "",
      matchFlights: [],
      show: false
    }
  }
  handleGetData(e) {
    e.preventDefault()
    axios
      .get("/data/data.json")
      .then(res => {
        const flights = res.data
        const matchFlights = flights.filter(flight => {
          if (
            flight.flightNumber === this.state.query &&
            flight.date === this.state.dateQuery
          ) {
            console.log(flight)
            return flight
          }
        })
        this.setState({ matchFlights: matchFlights })
        this.setState({ show: true })
      })
      .catch(error => console.log("error"))
  }

  handleFlightNumberChange = () => {
    this.setState({ query: this.flight.value })
  }
  handleDateChange = () => {
    this.setState({ dateQuery: this.search.value })
  }
  resetForm = () => {
    this.myFormRef.reset()
    this.setState({ matchFlights: [] })
    this.setState({ query: "" })
    this.setState({ dateQuery: "" })
    this.setState({ show: false })
  }

  render() {
    const flightDisplay = this.state.matchFlights.map(flight => (
      <div key={flight.id}>
        <h3>Flight Details</h3>
        <p>Airline: {flight.airliner}</p>
        <p>Departure Airport: {flight.departureAirport}</p>
        <p>Departure Time: {flight.departureTime}</p>
        <p>Arrival Airport: {flight.arrivalAirport}</p>
        <p>Arrival Time: {flight.arrivalTime}</p>
      </div>
    ))
    return (
      <div className="search-box">
        <h1>{this.state.message}</h1>
        <p className="instructions">
          Enter the flight number and date to search for your flight details
        </p>
        <hr className="hr" />
        <form
          onSubmit={e => this.handleGetData(e)}
          ref={el => (this.myFormRef = el)}
        >
          <input
            className="input"
            type="text"
            placeholder="Flight Number"
            ref={flightinput => (this.flight = flightinput)}
            onChange={this.handleFlightNumberChange}
          />
          <input
            className="input"
            type="text"
            placeholder="Date"
            ref={input => (this.search = input)}
            onChange={this.handleDateChange}
          />
          <button className="searchbtn">Search</button>
        </form>
        <div
          className="results"
          style={{ display: this.state.query === "" && "none" }}
        >
          <div className="leftside">
            <h3>{this.state.query ? "Your Search Terms " : null}</h3>
            <p>{`Flight Number: ${this.state.query}`}</p>
            <p>{`Flight Date: ${this.state.dateQuery}`}</p>
          </div>
          <div className="rightside">
            {flightDisplay}
            <div>
              <button
                style={{ display: this.state.show === false && "none" }}
                className="newSearchBtn"
                onClick={this.resetForm}
              >
                New Search
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
