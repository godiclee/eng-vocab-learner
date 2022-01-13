import { useState, useEffect } from 'react';

import { Button, Card, CardContent, Grid, LinearProgress, 
	TextField, Typography  } from '@mui/material';

import axios from '../api'

function Progress({ username }) {
	
	const getProgress = async () => {
		const {
			data: { progress },
		} = await axios.get('/progress/', { params: { username } });
	};

	return (
		<Card 
			raised 
			sx={{ 
				color: 'primary.main', 
				border: 1, 
				overflow: 'auto',
				width: { xs: 1.0, sm: 400, md: 600 } 
			}}
		>
			<CardContent>
				<Typography 
					variant='h5' 
					align='center' 
					color='common.black'
				>進度</Typography>
			</CardContent>
		</Card>
	);
};

export default Progress;
