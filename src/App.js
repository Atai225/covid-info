import './App.css';
import React, {useEffect} from 'react';
import CovidApp from './container/CovidApp/CovidApp';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from './store/reducers/covid.reducer';


function App() {
  const countries = useSelector(store => store.covid.countries)
  const dispatch = useDispatch()

	useEffect(() => {
      dispatch(getCountries())
	}, [])

  return (
    <div className="App">
      {countries && <CovidApp countries={countries}/>}
    </div>
  );
}

export default App;
