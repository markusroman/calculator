export interface ButtonType {
  name: string;
  type: string;
  operation?: string;
}

export const button_data: ButtonType[] = [
  { name: '1/x', type: 'operation', operation: 'inverse' },
  { name: 'sqr', type: 'operation', operation: 'square' },
  { name: 'sqrt()', type: 'operation', operation: 'squareroot' },
  { name: '/', type: 'operation', operation: 'divide' },
  { name: '7', type: 'number' },
  { name: '8', type: 'number' },
  { name: '9', type: 'number' },
  { name: '*', type: 'operation', operation: 'multiply' },
  { name: '4', type: 'number' },
  { name: '5', type: 'number' },
  { name: '6', type: 'number' },
  { name: '-', type: 'operation', operation: 'subtract' },
  { name: '1', type: 'number' },
  { name: '2', type: 'number' },
  { name: '3', type: 'number' },
  { name: '+', type: 'operation', operation: 'add' },
  { name: '+/-', type: 'operation', operation: 'opposite' },
  { name: '0', type: 'number' },
  { name: '.', type: 'number' },
  { name: '=', type: 'operation', operation: 'calculate' },
];
