import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from './socket'
import './home.css'
const Home = () => {
    const navigate = useNavigate()
    const [sesh, setSesh] = useState(null);
    const [locs, setLocs] = useState(null);
    const [loading, setloading] = useState(false)
    const [make, setMake] = useState(true)
    const [numberOfLocations, setNumberOfLocations] = useState(10);
    const [distance, setDistance] = useState(5)
    const [joinCode, setJoinCode] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [location, setLocation] = useState({
      loaded: false,
      coordinates: {lat: "", lng: ""}
    })
    const onSuccess = location => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    };
    const onError = error => {
      setLocation({
        loaded: true,
        error,
      });
    };

    useEffect(() => {
      if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      }
  
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);


    const options = [
        { label: 'Restaurant', value: "restaurant"},
        { label: "Aquarium", value: "aquarium" },
        { label: "Art Gallery", value: "art_gallery" },
        { label: "Bakery", value: "bakery" },
        { label: "Bar", value: "bar" },
        { label: "Beauty Salon", value: "beauty_salon" },
        { label: "Book Store", value: "book_store" },
        { label: "Bowling_alley", value: "bowling_alley" },
        { label: "Cafe", value: "cafe" },
        { label: "Campground", value: "campground" },
        { label: "Casino", value: "casino" },
        { label: "Clothing Store", value: "clothing_store" },
        { label: "Convenience Store", value: "convenience_store" },
        { label: "Gym", value: "gym" },
        { label: "Haircut", value: "hair_care" },
        { label: "Library", value: "library" },
        { label: "Takeout", value: "meal_takeout" },
        { label: "Museum", value: "museum" },
        { label: "Club", value: "night_club" },
        { label: "Park", value: "park" },
        { label: "Mall", value: "shopping_mall" },
        { label: "Tourism", value: "tourist_attraction" },
        { label: "University", value: "universtiy" },
        

        // Add more options as needed
      ];
      const handleChangeOpt = (event) => {
        const value = event.target.value;
        const isSelected = selectedOptions.includes(value);
      
        if (isSelected) {
          setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
          setSelectedOptions([...selectedOptions, value]);
        }
      };
      
    
    const handleChangeMake = (event) => {
        setMake(true)
      };

    const handleChangeJoin = (event) => {
        setMake(false)
      };

    const handleChange = (event) => {
        setNumberOfLocations(event.target.value);
      };
    
      // Handler for form submission
      const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from actually submitting
        console.log(`Number of locations: ${numberOfLocations}`);
        // Add your logic here to use the number of locations (e.g., fetch data, update UI)
      };
      const handleSubmitCode = (event) => {
        event.preventDefault(); // Prevent the form from actually submitting
        console.log(`Number of locations: ${numberOfLocations}`);
        // Add your logic here to use the number of locations (e.g., fetch data, update UI)
      };

      const handleChangeD = (event) => {
        setDistance(event.target.value);
      };
      const handleChangeCode = (event) => {
        setJoinCode(event.target.value);
      };
    
      // Handler for form submission
      const handleSubmitD = (event) => {
        event.preventDefault(); // Prevent the form from actually submitting
        console.log(`Distance: ${distance}`);
        // Add your logic here to use the number of locations (e.g., fetch data, update UI)
      };
    useEffect(() => {
        socket.on('sessionCreated', (data) =>{
            console.log(data);
            if (data.places.length < numberOfLocations){
                alert('Please select wider parameters!')
                setloading(false) 
            } else{
            setSesh(data.sessionId);
            setLocs(data.places)
            navigate('/card/0', {state: {id : data.sessionId, locs: data.places}})
            setloading(false) 
            }   
        })
        socket.on('joinedSession', (data) =>{
            setSesh(data.sessionId);
            setLocs(data.places);
            navigate('/card/0', {state: {id : data.sessionId, locs: data.places}})
            setloading(false)
            console.log('new sesion id: ' + data.sessionId + 'locs: ' + locs);
        })
}, [location.loaded]);
        const makeSession = (event) => {
            // This code will be executed when the button is clicked
            console.log(selectedOptions);
            console.log(location.coordinates);
            console.log('Loaded' + location.loaded)
            socket.emit('createSession', { amt: numberOfLocations, distance: distance * 1609.34, places: selectedOptions, loc: location.coordinates } );
            setloading(true);
        }

        const joinSession = (event) => {
            socket.emit('joinSession', { joinCode: joinCode });
            setloading(true);
        };
        
  if (loading) {
    return <Loading />; // Use your custom loading component
  }
  else if (!location.loaded){
    return <LoadingLocation />;
  }
    else{  
    return (
        <div className='App'>
            <header className='App-Header'>
                <h1 className='app-title oscillating-underline'>
                    KickIT
                </h1>
            </header>
        <div>
        <div className='buttons'>
        {(make) ? <button id="create" onClick = {handleChangeJoin} className='toggled session'>Make Session</button> : <button id="create" className='session'>Make Session</button>} 
        {(make) ? <button id="join" className='session' onClick ={handleChangeJoin}>Join Session</button> : <button id="join" className='toggled session'>Join Session</button>}
        <div className='make'>
    {(make) ? <form onSubmit={handleSubmit}>
        <div className='right'>
        <div className='former'>
      <label htmlFor="locations" className='form'>Locations</label>
      <input
        type="number"
        id="locations"
        name="locations"
        min="1"  // Minimum number of locations
        value={numberOfLocations}
        onChange={handleChange}
      />
      <label htmlFor="DISTANCE" className='form'>Distance (miles)</label>
      <input
        type="number"
        id="distance"
        name="distance"
        min="100"  // Minimum number of locations
        value={distance}
        onChange={handleChangeD}
      />
      <button id='goMake' className = 'go' disabled={!location.loaded} onClick ={makeSession} type="submit">GO</button>
      <div>
    </div>
      </div>
      <select multiple={true} value={selectedOptions} onChange={handleChangeOpt}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      </div>
    </form> : 
    <form onSubmit={handleSubmitCode}>
        <div className='former'>
      <label htmlFor="code" className='form'>CODE</label>
      <input
        type="text"
        id="code"
        name="code"
        value={joinCode}
        onChange={handleChangeCode}
      />
      <button id='goJoin' className='go' onClick = {joinSession} disabled={!location.loaded} type="submit">GO</button>
      </div>
    </form>
    }
        </div>
        </div>
        </div>
        </div>
    )
    }
}

function Loading() {
    return (
      <div className="App">
        {/* You can use CSS animations, SVGs, images, etc., for a better loading indicator */}
        <h1 className='oscillating-underline-purp'>Loading...</h1>
      </div>
    );
  }

  function LoadingLocation() {
    return (
      <div className="App">
        {/* You can use CSS animations, SVGs, images, etc., for a better loading indicator */}
        <h1 className='oscillating-underline-purp'>Loading your location</h1>
      </div>
    );
  }

export default Home;


