import { Box, MenuItem, TextField } from '@mui/material';


function Countries({ countries, handleChange, choosedCountry }) {

	return (
		<Box sx={{ maxWidth: '200px' }}>
			<TextField
				fullwidth='true'
				select
				id="outlined-select-currency"
				label="Country"
				sx={{background: "white"}}
				value={choosedCountry}
				onChange={(e) => handleChange(e.target.value)}
			>
				{
					countries.map((item, index) => (
						<MenuItem key={index} value={item.Slug}>{item.Country}</MenuItem>
					))
				}
			</TextField>
		</Box>
	)
}

export default Countries