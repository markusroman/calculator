import { useState } from 'react';
import { ButtonType } from '../constants';
import { calculate, changeInputToNumber } from '../helpers';

const useCalculator = () => {
  const [operand, setOperand] = useState<number | null>(null);
  const [input_value, setInputValue] = useState<string>('');
  const [current_operation, setCurrentOperation] = useState<string | null>(
    null
  );
  const [show_result, setShowResult] = useState<boolean>(false);

  const handleClick = ({ type, name, operation }: ButtonType) => {
    if (type === 'number') {
      if (show_result) {
        setInputValue(name);
        setShowResult(false);
      } else {
        setInputValue((input_value) => input_value + name);
      }
    } else {
      operation = operation ?? 'null';
      const num_input = changeInputToNumber(input_value);
      if (
        ['inverse', 'square', 'squareroot', 'opposite'].find(
          (element) => element === operation
        )
      ) {
        if (input_value === '') return null;
        const result = calculate(num_input, null, operation);
        if (!result) return null;
        setOperand(null);
        setInputValue(`${result}`);
        setCurrentOperation(null);
      } else if (!operand) {
        setOperand(num_input);
        setCurrentOperation(operation);
      } else if (operation !== 'calculate' && current_operation) {
        const result = calculate(operand, num_input, current_operation);
        if (!result) return null;
        setOperand(null);
        setInputValue(`${result}`);
        setCurrentOperation(null);
      } else {
        const result = calculate(
          operand,
          num_input,
          current_operation || 'null'
        );
        if (!result) return null;
        setOperand(null);
        setInputValue(`${result}`);
        setCurrentOperation(null);
      }

      setShowResult(true);
    }
  };
  return { input_value, setInputValue, handleClick };
};

export default useCalculator;
