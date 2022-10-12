import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import Card from "./components/Card"
import Table from "./components/Table"

import properties from "./data/properties"
import calcAverageValue from "./utils/utils"

import { listApartments } from "./api/API"

function App() {
  const [apartments, setApartments] = useState([])
  const [logApartments, setLogApartments] = useState([])

  // const fetchApartments = async () => {
  //   try {
  //     const response = fetch("")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    setApartments(properties)
  }, [apartments])

  // todo: create a custome useFetch hook
  useEffect(() => {
    ;(async () => {
      const loggedApartments = await listApartments()
      const newLogApartments = [...loggedApartments.result[0]]
      setLogApartments(newLogApartments)
      // console.log(logApartments)
    })()
  }, [])

  // todo: remove all of this functionality to a different file
  let prices = []
  let pricesPerSqMeter = []
  let sizes = []

  apartments.forEach((flat) => {
    prices.push(flat.price)
    pricesPerSqMeter.push(flat.pricePerSqMeters)
    sizes.push(flat.size)
  })

  let minPrice = Math.min(...prices)
  let maxPrice = Math.max(...prices)
  let minSize = Math.min(...sizes)
  let maxSize = Math.max(...sizes)
  let minPriceSqmeter = Math.min(...pricesPerSqMeter)
  let maxPriceSqMeter = Math.max(...pricesPerSqMeter)

  return (
    <div className="app">
      <Header />
      <h4>Number of properties: {logApartments.length}</h4>

      {/* Create a Main Stats Component to hold all of the statistics */}
      <div className="main__key-stats">
        <Card title="Smallest Size" stat={minSize + " sq.m."} />
        <Card title="Average Size" stat={calcAverageValue(sizes) + " sq.m."} />
        <Card title="Largest Size" stat={maxSize + " sq.m."} />
        <Card title="Min Price per m2" stat={minPriceSqmeter} />
        <Card
          title="Average Price per m2"
          stat={calcAverageValue(pricesPerSqMeter) + " per/m2"}
        />
        <Card title="Max Price Per m2" stat={maxPriceSqMeter} />

        <Card title="Minimim Sales Price" stat={minPrice} />
        <Card title="Average Sales Price" stat={calcAverageValue(prices)} />
        <Card title="Maximum Sales Price" stat={maxPrice} />
      </div>

      <div className="main__table">
        <Table />
      </div>

      <div className="test">
        <h2>Database test</h2>
        {/* add a key property */}
        {logApartments.map(({ title, parameters }) => (
          <tr>
            <td>{title}</td>
            <td>{parameters.price}</td>
            <td>{parameters.pricePerSqMeters}</td>
            <td>{parameters.size}</td>
            <td>{parameters.year}</td>
            <td>{parameters.floor}</td>
          </tr>
        ))}
      </div>
    </div>
  )
}

export default App
