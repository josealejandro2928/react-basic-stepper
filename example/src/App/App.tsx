import React, { useState } from 'react';
import './App.scss';

import { Stepper, Step } from 'react-basic-stepper';
import 'react-basic-stepper/dist/index.css';
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import StepperControlled from '../components/StepperControlled/StepperControlled';

const App = () => {
  const [dynamicSteps, setDynamicSteps] = useState([
    {
      label: 'Step #1',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus facere laborum ipsum modi accusantium id,
      a ullam reiciendis fugiat nobis, dolores velit dolor illum sequi alias error expedita soluta omnis`
    }
  ]);
  const [inputData, setInputData] = useState<any>({});
  return (
    <div className='container'>
      <Header></Header>
      <Section title='Simple basic use'>
        <Stepper
          headerStyles={{
            activatedStepBackground: 'red',
            color: '#fff',
            lineColor: 'blue'
          }}
        >
          <Step>
            <h3>Step1</h3>
          </Step>
          <Step>
            <h3>Step2</h3>
          </Step>
          <Step>
            <h3>Step3</h3>
          </Step>
          <Step>
            <h3>Step4</h3>
          </Step>
        </Stepper>
      </Section>
      <Section title='Simple basic use with labels'>
        <Stepper>
          <Step label='Step #1'>
            <h3>Step1</h3>
          </Step>
          <Step label='Lorem Isum..'>
            <h3>Step2</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              nesciunt eum, error explicabo alias, architecto beatae, ducimus
              vitae optio repellat minima iure id quisquam eius voluptatem
              voluptates. Iusto, accusamus mollitia!
            </p>
          </Step>
        </Stepper>
      </Section>
      <Section title='Vertical stepper'>
        <Stepper mode='vertical'>
          <Step label='Step #1'>
            <h3>Step1</h3>
          </Step>
          <Step label='Step #2'>
            <h3>Step2</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              nesciunt eum, error explicabo alias, architecto beatae, ducimus
              vitae optio repellat minima iure id quisquam eius voluptatem
              voluptates. Iusto, accusamus mollitia!
            </p>
          </Step>
          <Step label='Step #3'>
            <h3>Step3</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              nesciunt eum, error explicabo alias, architecto beatae, ducimus
              vitae optio repellat minima iure id quisquam eius voluptatem
              voluptates. Iusto, accusamus mollitia!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              nesciunt eum, error explicabo alias, architecto beatae, ducimus
              vitae optio repellat minima iure id quisquam eius voluptatem
              voluptates. Iusto, accusamus mollitia!
            </p>
          </Step>
        </Stepper>
      </Section>
      <Section title='Dinamyc steps'>
        <Stepper mode='horizontal'>
          {dynamicSteps.map((el, index) => (
            <Step key={index} label={el.label}>
              {el.content}
            </Step>
          ))}
        </Stepper>
        <h3>New step form</h3>
        <div style={{ maxWidth: '30rem' }}>
          <div className='form-item'>
            <label htmlFor='name'>Label</label>
            <input
              onChange={(e) =>
                setInputData({ ...inputData, label: e.target.value })
              }
              value={inputData?.label}
              type='text'
            />
          </div>
          <div className='form-item'>
            <label htmlFor='content'>Content</label>
            <textarea
              onChange={(e) =>
                setInputData({ ...inputData, content: e.target.value })
              }
              value={inputData?.content}
            ></textarea>
            <Button
              style={{ marginTop: '1rem' }}
              onClick={() => {
                if (!inputData.label) {
                  alert('Label is required');
                  return;
                }
                if (!inputData.content) {
                  alert('Content is required');
                  return;
                }
                setDynamicSteps([...dynamicSteps, { ...inputData }]);
                inputData.label = '';
                inputData.content = '';
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </Section>

      <Section
        title='Stepper controlled'
        description='Example of wizard like workflow, and responsive'
      >
        <StepperControlled></StepperControlled>
      </Section>
    </div>
  );
};

export default App;

function Section({
  children,
  title = '',
  description = ''
}: {
  children: any;
  title?: string;
  description?: string;
}) {
  return (
    <section className='Section'>
      <h2>{title}</h2>
      {description && <p className='description'>{description}</p>}
      {children}
    </section>
  );
}
