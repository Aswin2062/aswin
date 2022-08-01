import React, { useEffect, useState } from "react";

    let Header = (() => {
        const url = "https://www.breakingbadapi.com/api/characters?limit=10"
        const [breakingbad, setdata] = useState('');
        const [name, setname] = useState("")
        localStorage.setItem('name', JSON.stringify(name));
        let parsedData = JSON.parse(localStorage.getItem('data'))


        useEffect(() => {
            async function fetchData() {
                let data = await fetch(url);
                let gotdata = await data.json();
                localStorage.setItem('data', JSON.stringify(gotdata));
                setdata(gotdata);

            }
            fetchData();

        }, [])
        //////////////////////////////////////functions////////////////////

        let getDetails = (obj) => {
            if (name.length <= 1) {
                let singleData = breakingbad.filter((namedet) =>
                    namedet.name[0] === name
                )
                setdata(singleData);
                console.log(singleData)
                // localStorage.setItem('data',JSON.stringify(gotName));

            }
            else {
                let gotName = breakingbad.filter((namedet) =>
                    namedet.name === name
                )
                setdata(gotName);
                console.log(gotName)
                // localStorage.setItem('data',JSON.stringify(gotName));
            }
        }

        let dataDeleted = (obj) => {
            let deletedata = breakingbad.filter((deleteData) =>
                deleteData.name !== obj.name)
            setdata(deletedata);
            localStorage.setItem('data', JSON.stringify(deletedata))
        }
        let display = (obj) => {
            let deletedata = breakingbad.filter((deleteData) =>
                deleteData.name === obj.name)
            setdata(deletedata);
            localStorage.setItem('data', JSON.stringify(deletedata))
        }
        let SortAss = () => {
            let sortname = breakingbad.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;

            })
            setdata(sortname);
            localStorage.setItem('data', JSON.stringify(sortname));
        }
        let SortDess = ()=>
        {
            let sortdata =breakingbad.sort((a,b) =>
            {
                if(a.name< b.name)
                
                {
                    return 1;
                }
                if(a.name >b.name)
            {
                return -1;
            }
            return 0;

                
            })
            setdata(sortdata);
            localStorage.setItem('data',JSON.stringify(sortdata));
        }
        /////////////////////////function ends///////////////////////////////////

        return (<div>

            <div>
                <div><label>character name</label>
                    <input type="text" placholder="enter the character name" value={name} onChange={(e) => setname(e.target.value)}></input>
                    <button onClick={() => getDetails()}>Submit</button>
                    <div></div>
                    <button onClick={() => SortAss()}>A-Z Sort</button>
                    <button onClick={() => SortDess()}>Z-A Sort</button>
                </div>
            </div>{
                breakingbad.length > 0 && breakingbad.map((obj, index) => (
                    <div key={index}>
                        <span>{obj.name}</span>
                        <br></br>
                        <img src={obj.img}></img>
                        <br></br>
                        <span>{obj.nickname}</span>
                        <br></br>
                        <span>{obj.birthday}</span>
                        <br>
                        </br>
                        <button onClick={() => dataDeleted(obj)}>delete</button>
                        <br>
                        </br>
                        <button onClick={() => display(obj)}>display</button>
                        <br>
                        </br>
                    </div>
                )

                )
            }
        </div>
        )
    })
    export default Header;