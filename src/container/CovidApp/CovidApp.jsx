import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Countries from "../../components/Countries/Countries";
import CountryData from "../../components/CountryData/CountryData";
import { getCountryData, clearData, getMostRecovered } from "../../store/reducers/covid.reducer";
import './CovidApp.css';


function CovidApp({ countries }) {
	const [choosedCountry, setChoosedCountry] = useState('kyrgyzstan');

	const countryData = useSelector(store => store.covid.countryData);
	const mostRecovered = useSelector(store => store.covid.mostRecovered);

	const dispatch = useDispatch()

	const handleChange = (value) => {
		dispatch(clearData());
		setChoosedCountry(value);
		localStorage.setItem("country", JSON.stringify(value));
	};

	useEffect(() => {
		const country = JSON.parse(localStorage.getItem("country"));
		if (country) {
		setChoosedCountry(country);
		}
		if (choosedCountry) {
			dispatch(getCountryData(choosedCountry)).then(() => {
				dispatch(getMostRecovered())
			})
		}
	}, [choosedCountry]);

	return (
		<div className="covid-app">
			<div className="select-box">
				<Countries
					countries={countries}
					handleChange={handleChange}
					choosedCountry={choosedCountry}
				/>
			</div>
			<div className="country-data" >
				{countryData && countryData.length > 0 && <CountryData countryData={countryData} mostRecoveredItem={mostRecovered}/>}
			</div>
		</div>
	);
}

export default CovidApp;
