import React from 'react';

import './Button.scss';

function Button(props: any): JSX.Element {
  return (
    <button className="Button" {...props}>
      {props.children}
    </button>
  );
}
export default Button;
