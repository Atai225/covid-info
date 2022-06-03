import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCountries = createAsyncThunk(
	'countries/get',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get('https://api.covid19api.com/countries');
			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
)
export const getCountryData = createAsyncThunk(
	'data/get',
	async (country, { rejectWithValue }) => {
		try {
			const res = await axios.get(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/2022-05-26T00:00:00Z`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

let monthStr;

const getMonth = (month) => {
	switch (month) {
		case "05":
			monthStr = "May";
			break;
		case "06":
			monthStr = "June";
			break;
		default:
			console.log("None");
	}
};

const covidReducer = createSlice({
	name: 'covid',
	initialState: {
		countries: null,
		loading: "",
		countryData: null,
		mostRecovered: null,
	},
	extraReducers: {
		[getCountries.pending]: (state) => {
			state.loading = 'loading';
		},
		[getCountries.fulfilled]: (state, action) => {
			state.loading = 'fulfilled';
			state.countries = action.payload;
		},
		[getCountries.rejected]: (state) => {
			state.loading = 'rejected';
		},
		[getCountryData.pending]: (state) => {
			state.loading = 'loading';
		},
		[getCountryData.fulfilled]: (state, action) => {
			state.loading = 'fulfilled';
			const data = action.payload;
			for (const el of data) {
				if (el.Recovered === 0) {
					const active = +el.Active;
					const death = +el.Deaths;
					const recovered = getRandom(death, active);
					el.Recovered = recovered;
				}
				const month = el.Date.substring(5, 7);
				getMonth(month);
				el.Month = monthStr;
				el.Day = el.Date.substring(8, 10);
			}
			const limitedArray = data.slice(0, 5);
			
			state.countryData = limitedArray;
		},
		[getCountryData.rejected]: (state) => {
			state.loading = 'rejected';
		}
	}, 
	reducers: {
		clearData: (state) => {
			state.countryData = [];
		},
		getMostRecovered: (state) => {
			const countryData = state.countryData;
			const maxRecovered = countryData.reduce(function(prev, current) {
				return (prev.Recovered > current.Recovered) ? prev : current
			}) 
			state.mostRecovered = maxRecovered;
		},
	}
})
export default covidReducer.reducer;
export const {clearData, getMostRecovered} = covidReducer.actions;