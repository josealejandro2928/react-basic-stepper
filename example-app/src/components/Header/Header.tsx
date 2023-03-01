import React from 'react';
import logo from '../../assets/react.svg';
import './Header.scss';

function Header(): JSX.Element {
  return (
    <>
      <div className='Header'>
        <div className='section' style={{ flex: '1 0 100%', maxWidth: '100%' }}>
          <img className='logo' src={logo} alt='logo' />
          <span className='title'>Examples of "react-basic-stepper"</span>
        </div>

        <div
          className='section'
          style={{
            flex: '1 1 100%',
            maxWidth: '100%',
            justifyContent: 'flex-end'
          }}
        >
        </div>
      </div>
      <div style={{ height: '80px' }}></div>
    </>
  );
}
export default Header;
