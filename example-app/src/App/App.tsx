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
  const [inputData, setInputData] = useState<any>({ label: "", content: "" });
  const [config, setConfig] = useState<{
    linearMode: boolean;
    verticalLabels: boolean;
    hideLabels: boolean;
    hideLines: boolean;
    hideNumbers: boolean;
    mode: any;
  }>({
    linearMode: false, verticalLabels: true,
    hideLabels: false, hideLines: false, hideNumbers: false,
    mode: "horizontal"
  });
  return (
    <div className='container'>
      <Header></Header>
      <Section title='Simple basic use'>
        <Stepper {...config}>
          <Step label='Step#1'>
            <h3>Step1</h3>
          </Step>
          <Step label='Step#2'>
            <h3>Step2</h3>
          </Step>
          <Step label='Step#3'>
            <h3>Step3</h3>
          </Step>
          <Step label='Step#4'>
            <h3>Step4</h3>
          </Step>
        </Stepper>
        <hr />
        <p>Config parameters</p>
        <div style={{ display: "flex", width: 100, "alignItems": "center", "gap": "4px" }}>
          <input type="checkbox" name="linearMode" id="linearMode" checked={config.linearMode} onChange={(e) => setConfig({ ...config, linearMode: e.target.checked })} />
          <label htmlFor="linearMode"> linearMode</label>
        </div>
        <div style={{ display: "flex", width: 100, "alignItems": "center", "gap": "4px" }}>
          <input type="checkbox" name="hideNumbers" id="hideNumbers" checked={config.hideNumbers} onChange={(e) => setConfig({ ...config, hideNumbers: e.target.checked })} />
          <label htmlFor="hideNumbers"> hideNumbers</label>
        </div>
        <div style={{ display: "flex", width: 100, "alignItems": "center", "gap": "4px" }}>
          <input type="checkbox" name="verticalLabels" id="verticalLabels" checked={config.verticalLabels} onChange={(e) => setConfig({ ...config, verticalLabels: e.target.checked })} />
          <label htmlFor="verticalLabels"> verticalLabels</label>
        </div>
        <div style={{ display: "flex", width: 100, "alignItems": "center", "gap": "4px" }}>
          <input type="checkbox" name="hideLabels" id="hideLabels" checked={config.hideLabels} onChange={(e) => setConfig({ ...config, hideLabels: e.target.checked })} />
          <label htmlFor="hideLabels"> hideLabels</label>
        </div>
        <div style={{ display: "flex", width: 100, "alignItems": "center", "gap": "4px" }}>
          <input type="checkbox" name="hideLines" id="hideLines" checked={config.hideLines} onChange={(e) => setConfig({ ...config, hideLines: e.target.checked })} />
          <label htmlFor="hideLines"> hideLines</label>
        </div>
        <div style={{ display: "flex", width: 100, "alignItems": "center", "gap": "4px", marginTop: '16px' }}>
          <label htmlFor="mode"> mode: </label>
          <select name="mode" id="mode" value={config.mode} onChange={(e) => setConfig({ ...config, mode: (e.target.value ? e.target.value : "horizontal") })}>
            <option value="horizontal" >
              horizontal
            </option>
            <option value="vertical">
              vertical
            </option>
          </select>

        </div>

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

      <Section title='Dynamic steps'>
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
