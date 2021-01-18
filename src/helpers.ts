export const changeInputToNumber = (input: string) => {
  return Number(input);
};

export const calculate = (
  operand: number,
  operand_2: number | null,
  operation?: string
) => {
  let result: number | null = null;
  switch (operation) {
    case 'inverse':
      result = 1 / operand;
      break;
    case 'square':
      result = operand * operand;
      break;
    case 'squareroot':
      result = Math.sqrt(operand);
      break;
    case 'divide':
      if (operand_2) {
        result = operand / operand_2;
      }
      break;
    case 'multiply':
      if (operand_2) {
        result = operand * operand_2;
      }
      break;
    case 'subtract':
      if (operand_2) {
        result = operand - operand_2;
      }
      break;
    case 'add':
      if (operand_2) {
        result = operand + operand_2;
      }
      break;
    case 'opposite':
      result = -1 * operand;
      break;
    default:
      break;
  }
  return result;
};
