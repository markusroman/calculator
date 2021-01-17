import { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ButtonType, filled_button_data } from './constants';
import { calculate } from './operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 100,
      flexGrow: 1,
    },
    input: {
      width: '100%',
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
    console.log(operand, name, input_value);
    if (type === 'number') {
      if (show_result) {
        setInputValue(name);
        setShowResult(false);
      } else {
        setInputValue((input_value) => input_value + name);
      }
    } else {
      if (
        ['inverse', 'square', 'squareroot', 'opposite'].find(
          (element) => element === operation
        )
      ) {
        if (input_value === '') return null;
        const result = calculate(Number(input_value), null, operation);
        if (!result) return null;
        setOperand(result);
        setInputValue(`${result}`);
        setCurrentOperation(null);
        setShowResult(true);
      } else if (!operand) {
        setOperand(Number(input_value));
        setCurrentOperation(operation);
        setShowResult(true);
      } else if (operation !== 'calculate' && current_operation) {
        const result = calculate(
          operand,
          Number(input_value),
          current_operation
        );
        if (!result) return null;
        setOperand(result);
        setInputValue(`${result}`);
        setCurrentOperation(operation);
        setShowResult(true);
      } else {
        const result = calculate(
          operand,
          Number(input_value),
          current_operation ? current_operation : ''
        );
        if (!result) return null;
        setOperand(null);
        setInputValue(`${result}`);
        setShowResult(true);
      }
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container justify='center' alignItems='center' spacing={1}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
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
        <Grid item xs={4}></Grid>
        {filled_button_data.map((data, index) =>
          data ? (
            <Grid item xs={1} key={index}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleClick(data)}
              >
                {data.name}
              </Button>
            </Grid>
          ) : (
            <Grid item xs={1} key={index}></Grid>
          )
        )}
      </Grid>
    </div>
  );
};

export default App;
