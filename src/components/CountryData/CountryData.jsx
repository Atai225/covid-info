import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import './CountryData.css'

function CountryData({ countryData, mostRecoveredItem }) {
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
		      justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component="div" sx={{minWidth: "60%"}}>
          {countryData &&
            countryData.map((item, index) => (
              <Card key={index} sx={{marginBottom: "1rem"}}>
                <CardContent sx={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", alignItems: "center"}}>
                  <Box component='div'>
                    <Typography variant="h6" component="div">
                      {item.Day} {item.Month}
                    </Typography>
                  </Box>
                  <Box component='div' sx={{display: "grid",  gridTemplateColumns: "repeat(2, 1fr)", justifyItems: 'flex-end', gap: "1rem"}}>
                    <Typography>Active <span className="statistic-item">{item.Active}</span></Typography>
                    <Typography>Recovered <span className="statistic-item">{item.Recovered}</span></Typography>
                    <Typography>Confirmed <span className="statistic-item">{item.Confirmed}</span></Typography>
                    <Typography>Deaths <span className="statistic-item">{item.Deaths}</span></Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
        {mostRecoveredItem && <Box component="div" sx={{minWidth: "30%"}}>
          <Card fullwidth='true' variant="outlined" sx={{background: "#1BBB9A",textAlign: "center", color: "white", minHeight: "300px"}}>
            <CardContent>
              <Stack spacing={10}>
                <Box component='div' sx={{borderBottom: "1px solid white", paddingBottom: "1rem"}}>
                  <Typography
                    variant='h5'
                  >
                    Top recovered cases
                  </Typography>
                </Box>
                <Typography variant="h2" component="div" sx={{fontWeight: "bold"}}>{mostRecoveredItem.Recovered}</Typography>
                <Box component='div' sx={{borderTop: '1px solid white'}}><Typography sx={{fontSize: "20px", paddingTop: '1rem'}}>{mostRecoveredItem.Day} {mostRecoveredItem.Month}</Typography></Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>}
      </Box>
    </>
  );
}

export default CountryData;
