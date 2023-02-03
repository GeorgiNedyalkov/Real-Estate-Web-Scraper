import { useEffect, useState, useCallb } from "react";
import "./App.css";
import Stat from "./components/Stat/Stat";
import Table from "./components/Table/Table";
import { useFetch } from "./utils/useFetch";
import { BsFillFilterCircleFill } from "react-icons/bs";
import { IoBed } from "react-icons/io5";
import { getOneBeds, getTwoBeds, getThreeBeds } from "./api/getApartments";

function App() {
  const { apartments, loading, setApartments } = useFetch();
  console.log("app has rendered");

  const [neighborhood, setNeighborhood] = useState("Izgrev");

  const [hasFilters, setHasFilters] = useState(false);
  const [filters, setFilters] = useState({});

  const [completionProgress, setCompletionProgress] = useState("");

  const [averagePrice, setAveragePrice] = useState(0);
  const [averageSize, setAverageSize] = useState(0);
  const [averagePricePerSqMeter, setAveragePricePerSqMeter] = useState(0);

  // const marketCap = apartments.reduce(
  //   (prev, current) => prev + current.price,
  //   0
  // );

  const filteredApartments = apartments.filter((a) => {
    if (completionProgress === "") {
      return apartments;
    } else {
      return a.completionProgress === completionProgress;
    }
  });

  function calcAveragePrice(apartments) {
    const newAveragePrice = Math.ceil(Number("marketCap" / apartments.length));
    setAveragePrice(newAveragePrice);
  }

  function calcAveragePricePerSqMeter(apartments) {
    const totalPricePSQM = apartments.reduce(
      (prev, current) => prev + current.pricePerSqMeter,
      0
    );
    const totalApartments = apartments.length;
    const newAveragePricePSQM = Math.ceil(totalPricePSQM / totalApartments);
    setAveragePricePerSqMeter(newAveragePricePSQM);
  }

  function calcAverageSize(apartments) {
    const totalSize = apartments.reduce(
      (prev, current) => prev + current.size,
      0
    );
    const newAverageSize = totalSize / apartments.length;
    setAverageSize(newAverageSize);
  }

  useEffect(() => {
    calcAveragePrice(filteredApartments);
    calcAverageSize(filteredApartments);
    calcAveragePricePerSqMeter(filteredApartments);
  }, [filteredApartments]);

  return (
    <div className="App">
      {loading ? (
        <h1 className="loader">Loading...</h1>
      ) : (
        <div className="wrapper">
          <div className="display">
            <div className="container">
              <div className="highlights">
                <h1 className="title">
                  Today's real estate listings prices in{" "}
                  <b className="highlight">Burgas</b>.
                </h1>
                <p>
                  Total market cap is{" "}
                  <b className="highlight"> €{"100".toLocaleString()}</b>
                </p>
                <p>
                  Number of one bed properties{" "}
                  <b className="highlight">{apartments.length}</b>
                </p>
                <p>
                  The average price for one bed properties is{" "}
                  <span className="highlight">
                    €{averagePrice.toLocaleString()}{" "}
                  </span>
                  with an average size of{" "}
                  <span className="highlight">
                    {averageSize.toFixed(2)} sq.m.
                  </span>
                  resulting in an average price per sq.m. of{" "}
                  <span className="highlight">
                    {averagePricePerSqMeter.toLocaleString()} €/м2
                  </span>
                </p>
              </div>

              <div className="stats">
                <Stat
                  value={averagePrice}
                  label="Average Price"
                  percentChange={4.5}
                />
                <Stat
                  value={averagePricePerSqMeter}
                  label="Price Per Sq.m."
                  percentChange={-4.5}
                />
                <Stat
                  value={averageSize.toFixed(2) + " m2"}
                  label="Average Size"
                  percentChange={1}
                />
              </div>

              <div className="neighborhood__container">
                <h2 className="neighborhood">
                  Neighbourhood{" "}
                  <span className="highlight">{neighborhood}</span>
                </h2>
                <select
                  name="neighborhood"
                  onChange={(e) => setNeighborhood(e.target.value)}
                >
                  <option value="">Select neighborhood</option>
                  <option value="Sarafovo">Sarafovo</option>
                  <option value="Izgrev">Izgrev</option>
                  <option value="Lazur">Lazur</option>
                  <option value="Slaveikov">Slaveikov</option>
                </select>
              </div>

              <h3 className="subheading">Choose apartment type:</h3>
              <div className="apartment__type-btns">
                <button
                  className={`btn`}
                  onClick={() => {
                    setApartments(getOneBeds());
                  }}
                >
                  <IoBed />
                  One
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setApartments(getTwoBeds());
                  }}
                >
                  <IoBed />
                  Two
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setApartments(getThreeBeds());
                  }}
                >
                  <IoBed />
                  Three
                </button>
              </div>

              <button
                className={`${
                  hasFilters ? "filter__button active" : "filter__button "
                }`}
                onClick={() => setHasFilters(!hasFilters)}
              >
                <BsFillFilterCircleFill />
                Filters
              </button>

              {hasFilters && (
                <div className="filters">
                  <h3>Contruction type</h3>
                  <select
                    name="construction progress"
                    onChange={(e) => setCompletionProgress(e.target.value)}
                  >
                    <option value="">All Properties</option>
                    <option value="completed">Completed</option>
                    <option value="construction">In construction</option>
                    <option value="project">In Project</option>
                  </select>
                </div>
              )}

              <Table apartments={filteredApartments} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
