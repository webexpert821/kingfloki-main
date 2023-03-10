/* eslint-disable no-console */
import styled, { keyframes } from 'styled-components';

const Input = styled.input`
  height: 0;
  width: 0;
  border: none;
  z-index: -1;
`;

const popIn = keyframes`
from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.5) ;
}
to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1) ;
}
`;

const Label = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'gotham-bold';
  position: relative;
  color: #f48e37;
  text-transform: uppercase;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const Indicator = styled.div`
  border: 1px solid;
  width: 18px;
  height: 18px;
  position: absolute;
  top: -1px;
  right: -1em;

  /* ${Label}:hover & {
    background: #ccc;
  } */

  &::after {
    content: '';
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    border: solid #f48e37;
    background-color: #f48e37;
    width: 0.5em;
    height: 0.5em;
    @media screen and (max-width: 480px) {
      width: 0.35em;
      height: 0.35em;
    }
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: ${popIn};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }
  @media screen and (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
`;

const NumericValue = styled.div`
  color: #ffffff;
`;

interface RadioButtonProps {
  name: string;
  label: string;
  value: string;
  numericValue: number;
  checked: boolean;
  handleChange: (value: string) => void;
}

export default function RadioButton({ name, label, value, numericValue, checked, handleChange }: RadioButtonProps) {
  const handleRadioChange = (e: any) => {
    const { id } = e.currentTarget;
    handleChange(id); // Send back id to radio group for comparison
  };
  return (
    <Label htmlFor={value}>
      {label}
      <NumericValue>{numericValue}</NumericValue>
      <Input type="radio" name={name} id={value} value={value} checked={checked} onChange={handleRadioChange} />
      <Indicator />
    </Label>
  );
}
