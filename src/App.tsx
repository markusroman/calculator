import { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ButtonType, button_data } from './constants';
import { calculate } from './operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      height: '4rem',
      width: '4rem',
      alignSelf: 'center',
      justifySelf: 'center',
    },
    input: {
      width: '50%',
      alignSelf: 'center',
      justifySelf: 'center',
    },
  })
);

const App = () => {
  const [operand, setOperand] = useState<number | null>(null);
  const [input_value, setInputValue] = useState<string>('');
  const [current_operation, setCurrentOperation] = useState<string | null>(
    null
  );
  const [show_result, setShowResult] = useState<boolean>(false);

  const classes = useStyles();

  const handleClick = ({ name, type, operation = '' }: ButtonType) => {
    console.log('Clicked ', name);
    if (type === 'number') {
      if (show_result) {
        setInputValue(name);
        setShowResult(false);
      } else {
        setInputValue((input_value) => input_value + name);
      }
    } else {
      if (operation === 'inverse' || 'square' || 'squareroot' || 'opposite') {
        const result = calculate(Number(input_value), null, operation);
        if (!result) {
          return null;
        }
        setOperand(result);
        setInputValue(`${result}`);
        setCurrentOperation(null);
        setShowResult(true);
      } else if (!operand) {
        setOperand(Number(input_value));
        setInputValue('');
        setCurrentOperation((operation as unknown) as string);
        setShowResult(false);
      } else if (operation !== 'calculate') {
        const result = calculate(operand, Number(input_value), operation);
        setOperand(result);
        setInputValue('');
        setCurrentOperation((operation as unknown) as string);
        setShowResult(false);
      } else {
        const result = calculate(
          operand,
          Number(input_value),
          current_operation || ''
        );
        if (!result) {
          return null;
        }
        setOperand(null);
        setInputValue(`${result}`);
        setCurrentOperation(null);
        setShowResult(true);
      }
    }
  };

  return (
    <div className='App'>
      <CssBaseline />

      <Grid container justify='center' alignItems='center' spacing={1}>
        <Grid item xs={12}>
          <Input
            id='standard-number'
            type='text'
            fullWidth
            value={input_value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            className={classes.input}
          />
        </Grid>
        {button_data.map((data) => (
          <Grid item xs={3} key={data.name} className={classes.button}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleClick(data)}
            >
              {data.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
