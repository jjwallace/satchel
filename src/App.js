import React, { useState, useEffect } from 'react';
import data from './data/data.json';
import { ForceGraph } from "./components/forceGraph";
import './App.css';

import ReactLoading from 'react-loading';

function App() {
  // State to Save API Data
  const [apiData, setApiData] = useState(null)

  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>     
      <b>${node.name}</b>
    </div>`;
  }, []);

  useEffect(() => {
    var page = 300;
    var currency = 'usd'
    var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+currency+"&per_page="+page;
    var url2 = "https://api.coingecko.com/api/v3/coins/list";
    fetch(url)
    .then(res => res.json())
    .then(data => setApiData(data))
  }, [])

  console.log(apiData)
  if(apiData == null){
    return (
      <div className="App">
        <section className="Loader">
          <section className="Loader-Animation">
            <ReactLoading type={"spin"} color={"#3333ff"} height={300} width={300} />
          </section>
        </section>
      </div>
    );
  }else{
    return (
      <div className="App">
        <section className="Main">
          <ForceGraph linksData={data.links} nodesData={apiData} nodeHoverTooltip={nodeHoverTooltip} />
        </section>
      </div>
    );
  }
}

export default App;
