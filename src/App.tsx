import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './redux/store'
import { handleDecrement, handleIncrement } from './redux/actions/counter'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const count = useSelector((state: RootState) => state.count)

  return (
    <div className="App">
      <h1>Vite + React + Vanilla Redux + Tailwind</h1>

      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(handleIncrement())}>
              Increment
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Typography>{count}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(handleDecrement())}>
              Decrement
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default App
