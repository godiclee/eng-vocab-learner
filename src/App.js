import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useState, useEffect } from 'react';


import axios from './api';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        benevolent
        <TextField id="outlined-basic" label="" variant="outlined" />

        likes you 
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);



function App() {
  
  const [showHint, setShowHint] = useState(false);
  
  const query = async () => {
    const {
      data: { card },
    } = await axios.get("/api/new-card");
    console.log(card);
    
  }

  const addWord = async (e) => {
    if (e.key !== 'Enter') 
      return;
    
    const word = e.target.value;

    const {
      data: { result }, 
    } = await axios.post('/api/add-card', {
      word
    });
  }

  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
      <input type="text" placeholder={showHint ? "enter your text" : ""} onKeyDown={addWord}/>
      <button onClick={query}>Click Me</button>
    </div>
  );
}

export default App;


/*06-25 add backend package */