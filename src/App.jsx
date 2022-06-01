import { Container } from '@mui/material'
import {Routes, Route} from 'react-router-dom'

import Paginator from './Paginator';


function App() {
  return (
    <Container sx={{marginTop: 5}} maxWidth="md" >
      <Routes>
        <Route path="/"  element={<Paginator /> } />
      </Routes>
    </Container>
  )
}

export default App;