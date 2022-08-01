///import React, { useState, useEffect } from 'react'

import './Section.css'

function Section() {
    const details = localStorage.getItem("localInfo") || "[]";
    const pokeUrl='https://api.thecatapi.com/v1/breeds?limit=10';
    const[data,setData]=useState(JSON.parse(details));
    useEffect(() => {
        fetch(pokeUrl).then((response)=>{
            response.json().then((data)=>{
                console.log(data)
                //setData(data);
                localStorage.setItem("localInfo", JSON.stringify(data));
            })
        })
    }, [])

let delData = (obj) => {
    let deletedData = data.filter((delItem) => delItem.id !== obj.id)
    localStorage.setItem("localInfo", JSON.stringify(deletedData));
    setData(deletedData);
}

  return (
    <div>
        {
            (data.length > 0 && data.map((obj,key) => (
                <div className='Content' key={key}>
                    <span className='Top'>Name:{obj.name}</span><br></br>
                    <span className='Down'>Origin:{obj.origin}</span><br></br>
                    <img src={obj.image.url}></img><br></br>
                    <button onClick={() => delData(obj)}>delete</button>
                </div>
            )) )
        }{
            data.length === 0 && <h1>no data available</h1>
        }
    </div>
  )
}

export default Section///