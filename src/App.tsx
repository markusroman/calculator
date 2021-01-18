import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { filled_button_data } from './constants';
import useCalculator from './hooks/useCalculator';

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
  const classes = useStyles();

  const { input_value, setInputValue, handleClick } = useCalculator();

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
