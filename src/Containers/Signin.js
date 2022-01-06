import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import Wrapper from '../Components/Wrapper'

function Signin() {
	return (
		<Wrapper>
			歡迎使用地獄英文單字訓練程式
			<TextField label='用戶名稱' />
			<TextField label='密碼' />
			<Stack direction='row' spacing={2} divider={<Divider orientation='vertical' />}>
				<Button variant='contained'>登入</Button>
				<Button variant='contained'>註冊</Button>
			</Stack> 
		</Wrapper>
	)
}


export default Signin;