import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Step, Stepper, StepperRef } from 'react-basic-stepper';
import Button from '../Button/Button';

function StepperControlled(): JSX.Element {
  const stepper = useRef<StepperRef>();
  const materials = ['Frontend', 'Backend', 'FullStack', 'QA', 'Data Science'];

  const [mode, setMode] = useState<any>(
    window.innerWidth < 756 ? 'vertical' : 'horizontal'
  );

  function responsive() {
    setMode(window.innerWidth < 756 ? 'vertical' : 'horizontal');
  }

  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    age: 5
  });

  const [emailData, setEmailData] = useState({
    email: ''
  });

  const [materialData, setMaterialData] = useState({
    materials: {}
  });

  const userDataValid = useMemo(() => {
    return userData.name && userData.lastName && userData.age;
  }, [userData]);

  const emailDataValid = useMemo(() => {
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailData.email && emailRegex.test(emailData.email);
  }, [emailData]);

  const materialsDataValid = useMemo(() => {
    return Object.keys(materialData.materials).length > 0;
  }, [materialData]);

  useEffect(() => {
    window.addEventListener('resize', responsive);
    return () => {
      window.removeEventListener('resize', responsive);
    };
  }, []);

  return (
    <Stepper ref={stepper} mode={mode}>
      <Step label='User Data'>
        <div style={{ maxWidth: '100%', width: '30rem' }}>
          <div className='form-item'>
            <label htmlFor='name'>Name</label>
            <input
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              value={userData?.name}
              type='text'
            />
          </div>
          <div className='form-item'>
            <label htmlFor='lastName'>Lastname</label>
            <input
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              value={userData?.lastName}
              type='text'
            />
          </div>
          <div className='form-item'>
            <label htmlFor='name'>Label</label>
            <input
              min='5'
              max='100'
              onChange={(e) =>
                setUserData({ ...userData, age: +e.target.value })
              }
              value={userData?.age}
              type='number'
            />
          </div>
          <Button
            onClick={() => {
              if (!userDataValid) {
                alert('User data form must be valid');
                return;
              }
              stepper.current?.nextStep();
            }}
          >
            Next
          </Button>
        </div>
      </Step>
      <Step label='Email' disabled={!userDataValid}>
        <div style={{ maxWidth: '100%', width: '30rem' }}>
          <div className='form-item'>
            <label htmlFor='name'>Email</label>
            <input
              onChange={(e) =>
                setEmailData({ ...emailData, email: e.target.value })
              }
              value={emailData?.email}
              type='text'
            />
          </div>
          <Button
            style={{ marginRight: '8px', backgroundColor: '#aaa' }}
            onClick={() => {
              stepper.current?.prevStep();
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (!emailDataValid) {
                alert('Email data form must be valid');
                return;
              }
              stepper.current?.nextStep();
            }}
          >
            Next
          </Button>
        </div>
      </Step>
      <Step
        disabled={!userDataValid || !emailDataValid}
        label='Materials selected'
      >
        <div style={{ maxWidth: '100%', width: '30rem' }}>
          <div
            className='form-item'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor='name'>
              <strong>Materials</strong>
            </label>
            {materials.map((el, index) => (
              <label
                key={index}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <input
                  key={index}
                  type='checkbox'
                  name={el}
                  id={el}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMaterialData({
                        ...materialData,
                        materials: {
                          ...materialData.materials,
                          [el]: e.target.checked
                        }
                      });
                    } else {
                      let data = { ...materialData };
                      delete materialData.materials[el];
                      setMaterialData(data);
                    }
                  }}
                  checked={materialData[el]}
                />
                {el}
              </label>
            ))}
          </div>
          <Button
            style={{ marginRight: '8px', backgroundColor: '#aaa' }}
            onClick={() => {
              stepper.current?.prevStep();
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (!materialsDataValid) {
                alert('Materials data form must be valid');
                return;
              }
              stepper.current?.nextStep();
            }}
          >
            Next
          </Button>
        </div>
      </Step>
      <Step
        disabled={!userDataValid || !emailDataValid || !materialsDataValid}
        label='Done'
      >
        <h2>User data</h2>
        <ul>
          <li>name: {userData.name}</li>
          <li> lastName: {userData.lastName}</li>
          <li>age: {userData.age}</li>
        </ul>
        <h2>Email data</h2>
        <ul>
          <li>email: {emailData.email}</li>
        </ul>
        <h2>Materials data</h2>
        <ul>
          {Object.keys(materialData.materials).map((el) => (
            <li>{el}</li>
          ))}
        </ul>
        <Button
          style={{ marginRight: '8px', backgroundColor: '#aaa' }}
          onClick={() => {
            stepper.current?.prevStep();
          }}
        >
          Back
        </Button>
      </Step>
    </Stepper>
  );
}
export default StepperControlled;
