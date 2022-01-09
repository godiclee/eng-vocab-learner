import { useContext } from 'react';
import Button from '@mui/material/Button'
import VocabCard from './VocabCard.js'
import Wrapper from '../Components/Wrapper'
import { UserContext } from '../App';

function Main({ signOut }) {
	const user = useContext(UserContext);

	return (
		<Wrapper>
			歡迎回來 {user.username}，上次登入時間 {' '}
			{new Date(user.last_login).toDateString()}{' '}
			{new Date(user.last_login).toLocaleTimeString()}
			<Button variant='contained' onClick={signOut}>登出</Button>
			<VocabCard username={user.username}></VocabCard>
		</Wrapper>
	)
};

export default Main;