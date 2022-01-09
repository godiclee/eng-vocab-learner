import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Card, CardContent,
  Divider, LinearProgress, Stack, TextField  } from '@mui/material';
import axios from '../api'

function VocabCard({ username }) {
  /* Card Object */
  const [card, setCard] = useState();
  
  const [chi, setChi] = useState('');
  const [eng, setEng] = useState('');
  const [pos, setPos] = useState('');
  const [chisen, setChisen] = useState('')
  const [engsen, setEngsen] = useState([]);
  const [level, setLevel] = useState(0);
  const [holes, setHoles] = useState([]);

  const [newCard, setNewCard] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(0);

  /* TextField Related */
  const [userAnswer, setUserAnswer] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);

  /* Whether it is already wrong (due to different behaviour during submit) */
  const [alreadyCorrect, setAlreadyCorrect] = useState(false); /* for progress bar color */
  const [alreadyWrong, setAlreadyWrong] = useState(false);

  const getCard = async () => {

    const {
			data: { card, holes, score, newcard },
		} = await axios.get('/card/get-card', {params: { username }});

    setCard(card);

    setChi(card.chi);
    setEng(card.eng);
    setPos(card.pos);
    setChisen(card.chisen);
    setLevel(card.level);
    
    let engsen_ = card.engsen.split(' ');
    setEngsen(engsen_);
    
    setHoles(holes);
    setNewCard(newcard);
    setProgress(score * 0.1);
    setBuffer(score * 0.1);

    setUserAnswer(Array(card.holes.length).fill(''));
    setShowHint(false);
    setAlreadyCorrect(false);
    setAlreadyWrong(false);
    setCorrect(Array(card.holes.length).fill(0));
    setIncorrect(Array(card.holes.length).fill(0));

    /* Focus on first TextField */
    document.getElementById('0').focus();
  };

  const updateCorrect = async () => {
    const {
			data: { score },
		} = await axios.post('/card/correct', { username, card, newCard });
    setProgress(score * 0.1)
  };
  
  const updateIncorrect = async () => {
    const {
      data: { score },
    } = await axios.post('/card/incorrect', { username, card, newCard });
    setProgress(score * 0.1);
  };

  const submitAnswer = async (e) => {
    /* check answer and show correct / incorrect boy color */
    let result = 'correct';
    let first_incorrect = true;
    for (let i = 0; i < holes.length; i++) {
      if (engsen[holes[i]].toLowerCase() !== userAnswer[i].toLowerCase()) {
        setIncorrect(incorrect => incorrect.slice(0, i).concat([1], incorrect.slice(i+1)));
        if (first_incorrect) {
          document.getElementById(i.toString()).focus();
          first_incorrect = false;
          if (!alreadyWrong) {
            updateIncorrect();
          }
          setAlreadyWrong(true);
        }
        result = 'incorrect';
      } else {
        setCorrect(correct => correct.slice(0, i).concat([1], correct.slice(i+1)));
      }
    }

    /* Wait for 1s to either 1. show new card 2. show hints and wait for new answer */
    if (result === 'correct') {
      setTimeout(() => { 
        getCard(); 
      }, 750);
      console.log(alreadyWrong)
      if (!alreadyWrong) {
        setAlreadyCorrect(true);
        updateCorrect();
      }
      
    } else {
      setTimeout(() => { 
        setUserAnswer(Array(card.holes.length).fill('')); 
        setShowHint(true);
      }, 750);
    }
  }

  /* enter: to next textfield or to submit answer */
  const handleEnter = (e, i) => {
    if (e.key === 'Enter') {
      if (i < holes.length - 1) {
        let next = document.getElementById((i+1).toString());
        next.focus();
      } else {
        submitAnswer();
      }
    }
  };

  /* set textfield(s) value to state */
  const typeUserAnswer = (value, i) => {
    setUserAnswer(userAnswer => userAnswer.slice(0, i).concat([value], userAnswer.slice(i+1)));
  };

  /* card is rendered when first loaded */
  useEffect(() => {
    getCard();
  }, []);
  
  return (
      <Card raised sx={{ color: 'primary.main', border: 1, width: 750, height: 500 }}>
        <CardContent>
          Level {level} {newCard ? 'New Card' : ''}
          <LinearProgress 
            variant="buffer" 
            value={progress} 
            valueBuffer={buffer}
            color={alreadyCorrect ? 'success' : alreadyWrong ? 'warning' : 'secondary'}
          />
        </CardContent>
        <CardContent>
          {engsen.map((element, index) => {
            const i = holes.indexOf(index); /* i is the position in holes */
            return holes.includes(index) ? 
              <>
                <TextField 
                  id={i.toString()}
                  value={userAnswer[i]}
                  placeholder={showHint ? element : ''}
                  onChange={(e) => typeUserAnswer(e.target.value, i)}
                  onKeyDown={(e) => handleEnter(e, i)}
                  /* styles */
                  focused
                  variant='filled'
                  inputProps={{style: {fontSize: '10px', fontFamily: 'Monospace'}}}
                  sx={{ fontFamily: 'Monospace', width: `${28 + 6.2*element.length}px` }} 
                    
                  color={correct[i] ? 'success' 
                    : incorrect[i] ? 'warning' : 'primary'}
                /> {' '}
              </> : element + ' ';
          })}
        </CardContent>
        <CardContent>{chisen}</CardContent>
        <CardContent></CardContent> 
        <CardContent>{pos}</CardContent>
        <CardContent>{chi}</CardContent>
        <CardContent>{eng}</CardContent>
        <CardContent />
        
        <Stack direction='row' spacing={3} divider={<Divider orientation='vertical' />}>
            <ButtonGroup>
              <Button variant='contained'>減少出現 (尚未完成)</Button>
              <Button variant='contained'>增加出現 (尚未完成)</Button>
              <Button variant='contained'>我不想再看到它了! (尚未完成)</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant='contained' onClick={getCard}>下一題(略過)</Button>
              <Button variant='contained' onClick={submitAnswer}>送出</Button>
              <Button variant='contained' onClick={updateCorrect}>正確(測試用)</Button>
              <Button variant='contained' onClick={updateIncorrect}>錯誤(測試用)</Button>
            </ButtonGroup>
        </Stack>
      </Card>
  );
};

export default VocabCard;