import React from 'react';

interface Props {
  id?: any;
  type?: string;
  name?: any;
  handleClick(e: any): void;
  isChecked?: any;
}

const CheckedBox = (props: Props) => {
  const { id, type, name, handleClick, isChecked } = props;
  return <input id={id} name={name} type={type} onChange={handleClick} checked={isChecked} />;
};

export default CheckedBox;
