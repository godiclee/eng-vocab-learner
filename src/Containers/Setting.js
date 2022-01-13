import { useState, useEffect } from 'react';

import { Card, CardContent, FormControlLabel, FormGroup,
	Grid, Slider, Stack, Switch, Typography } from '@mui/material';

import axios from '../api'

function Setting({ username }) {
	const [level, setLevel] = useState(0);
	const [onlyNew, setOnlyNew] = useState(false);
	const [onlyOld, setOnlyOld] = useState(false);
	const [multipleHole, setMultipleHole] = useState(true);
	const [freqNew, setFreqNew] = useState(0);
	const [finishHardness, setFinishHardness] = useState(0);

	const getSetting = async () => {
		const {
			data: { user },
		} = await axios.get('/setting', {params: { username }});
		console.log(user)
		setLevel(user.level);
		setOnlyNew(user.only_new);
		setOnlyOld(user.only_old);
		setMultipleHole(user.multiple_hole);
		setFreqNew(user.freq_of_new);
		setFinishHardness(user.finish_hardness);
	};

	const updateLevel = async() => {
		await axios.post('/setting/level', { username, level });
	};

	useEffect(() => {
		console.log('reach')
		getSetting();
	}, []);



	return (
		<Card raised sx={{  color: 'primary.main', 
		border: 1, 
		overflow: 'auto',
		width: { xs: 1.0, sm: 400, md: 600 } }}>
			
			<CardContent>
				<Typography 
					variant='h5' 
					align='center' 
					color='common.black'
				>設定</Typography>
			</CardContent>
			
			<CardContent>
				<Typography >難度(Level)</Typography>
				<Grid container justifyContent='center'>
					<Slider
						track={false}
						min={1} max={6} step={1}
						value={level}
						onChange={ (e, value) => {
							setLevel(value);
							updateLevel();
						}}
						sx={{ width: { xs: 0.75, sm: 300, md: 450 } }}	
						marks={[{value: 1, label: 'Level1'},
								{value: 2, label: 'Level2'},
								{value: 3, label: 'Level3'},
								{value: 4, label: 'Level4'},
								{value: 5, label: 'Level5'},
								{value: 6, label: 'Level6'},]}
					/>	
				</Grid>
			</CardContent>

			<Grid container spacing={1}>
				<Grid item container xs={6} justifyContent="center">
					<FormGroup>
						<FormControlLabel control={<Switch />} label='只學新單字' />
						<FormControlLabel control={<Switch />} label='只學舊單字' />
						<FormControlLabel control={<Switch />} label='一句多洞模式' />
					</FormGroup>
				</Grid>

				<Grid item container xs={6} justifyContent="center">
					<Stack>
						<Stack>
							<Typography>新單字頻率</Typography>
							<Slider
								track={false}
								min={-100} max={100}
								defaultValue={0}
								sx={{ width: { xs: 0.375, sm: 150, md: 225 } }}
							/>
						</Stack>
					</Stack>

					<Stack>
						<Stack>
							<Typography>完成難度</Typography>
							<Slider
								track={false}
								min={-100} max={100}
								defaultValue={0}
								sx={{ width: { xs: 0.375, sm: 150, md: 225 } }}
							/>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
			
			


			<CardContent>
				
			</CardContent>

			
			
		</Card>
	);

};

export default Setting;