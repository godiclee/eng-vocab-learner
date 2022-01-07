import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button'
import Wrapper from '../Components/Wrapper'
import { UserContext } from '../App';

function Main({ signOut }) {
	const user = useContext(UserContext);

	return (
		<Wrapper>
			歡迎回來 {user.userObject.username}，上次登入時間 {' '}
			{new Date(user.userObject.last_login).toDateString()}{' '}
			{new Date(user.userObject.last_login).toLocaleTimeString()}
			<Button variant='contained' onClick={signOut}>登出</Button>
		</Wrapper>
	)
}

export default Main;