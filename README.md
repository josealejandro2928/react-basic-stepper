# react-basic-stepper

> A simple stepper provides a wizard-like workflow by dividing content into logical steps.

![step1](https://react-basic-stepper.surge.sh/images/step3.png)

## Install

```bash
npm install --save react-basic-stepper
```

## Usage

The react-basic-stepper provide a two component to recreate a wizard-like workflow by dividing content into logical steps.
You have **Stepper** that is the wrapper steps components and the **Step** component.
**You must import the styles of these components**

```tsx
import 'react-basic-stepper/dist/index.css';
```

### 1. Simple basic usage

```tsx
...
import { Stepper, Step } from 'react-basic-stepper';
import 'react-basic-stepper/dist/index.css';
...
return (
    <Stepper>
        <Step>
            <h3>Step1</h3>
        </Step>
        <Step>
            <h3>Step2</h3>
        </Step>
         <Step>
            <h3>Step3</h3>
        </Step>
    </Stepper>
    )
```

![step1](https://react-basic-stepper.surge.sh/images/step1.png)
You can set labels for each Step component

```tsx
...
import { Stepper, Step } from 'react-basic-stepper';
import 'react-basic-stepper/dist/index.css';
...
return (
    <Stepper>
        <Step label="Step1">
            <h3>Step1</h3>
        </Step>
        <Step label="Step1">
            <h3>Step2</h3>
        </Step>
        <Step label="Step1">
            <h3>Step3</h3>
        </Step>
    </Stepper>
        )
```

### 2. Vertical Stepper with labels for each step

```tsx
 ...
return (
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
    )
```

![step1](https://react-basic-stepper.surge.sh/images/step2.png)

### 3. Stepper wizzard component

For the creation of medium and complex wizards, the **Step** component has a property **disabled** to disable its access based on logical conditions.
The Stepper component has a **linear** property that allows access only to the immediate next step.
To control the action of the next and previous steps, you can use a **ref** to pointer the Stepper and set nextStep and prevStep programmatically.

```tsx
...
import { Step, Stepper, StepperRef } from 'react-basic-stepper';
function StepperControlled(): JSX.Element {
  ....
  const [mode, setMode] = useState<any>(window.innerWidth < 756 ? 'vertical' : 'horizontal');
  const stepper = useRef<StepperRef>();
  ...
  return (
  <Stepper ref={stepper} mode={mode}>
      <Step label='User Data'>
        <ComponentForm1></ComponentForm1>
        <Button onClick={() => {
            if (!componentForm1DataValid) {
              alert('ComponentFrom1 data form must be valid');
              return;
            }
            stepper.current?.nextStep();
          }}>Next</Button>
      </Step>
    <Step label='Email' disabled={!componentForm1DataValid}>
      <ComponentForm2></ComponentForm2>
      <Button
          style={{ marginRight: '8px', backgroundColor: '#aaa' }}
          onClick={() => {
            stepper.current?.prevStep();
          }}>Back</Button>
      <Button onClick={() => {
            if (!componentForm1DataValid) {
              alert('ComponentForm1Data data form must be valid');
              return;
            }
            stepper.current?.nextStep();
          }}>Next</Button>
    </Step>
    <Step disabled={!componentForm1DataValid || !componentForm2DataValid}
      label='Materials selected'>
       <ComponentForm3></ComponentForm3>
       <Button style={{ marginRight: '8px', backgroundColor: '#aaa' }}
          onClick={() => {
            stepper.current?.prevStep();
          }}>Back</Button>
       <Button
          onClick={() => {
            if (!componentForm3DataValid) {
              alert('ComponentForm3 data form must be valid');
              return;
            }
            stepper.current?.nextStep();
          }}
        >Next</Button>
    </Step>
    <Step
      disabled={!componentForm1DataValid || !componentForm2DataValid || !componentForm3DataValid}
      label='Done'
    >
      <Button
        style={{ marginRight: '8px', backgroundColor: '#aaa' }}
        onClick={() => {
          stepper.current?.prevStep();
        }}
      >
        Back
      </Button>
      <Button> Save</Button>
    </Step>
  </Stepper>
  }
```

![step1](https://react-basic-stepper.surge.sh/images/step3.png)

The **Stepper** component has props to customize some styles of the steps header sections

```tsx
export interface HeaderStepStyles {
  color?: string; // Setting the color of the circles.
  activatedStepBackground?: string; // Setting the backgroundColor of the current circle (Current Step).
  stepsBackgroud?: string; // Setting the backgroundColor of the circles except the circle associated with the current step on.
  lineColor?: string; // Setting the color of the line between of the steps circles
}
```

Example of a Stepper with the red color activated and the blue line between the circles

```tsx
...
import { Stepper, Step } from 'react-basic-stepper';
...
return (
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
)
```

![step4](https://react-basic-stepper.surge.sh/images/step4.png)

### 4. Stepper Interfaces

```ts
export interface StepperProps {
  children: Array<ReactElement> | ReactElement | any; // Steps component inside the Stepper
  indexStep?: number; // Set the initial activated Step, default = 0
  stepChange?: Function; // Callback function that return the current step on
  headerStyles?: HeaderStepStyles; // Object to change the styles of the Stepper header
  linearMode?: boolean; // Linear mode for the transitions of each step, default = false
  verticalLabels?: boolean; // Allow Step header text labels to be placed at the bottom or to the right of the circles, default = true
  hideLabels?: boolean; // Allow to hide the text labels, default = false
  hideLines?: boolean; // Allow to hide the line between each step header circles, default = false
  mode?: 'vertical' | 'horizontal'; // Allow to display the stepper 'vertical' or 'horizontal', default = 'horizontal'
}
export interface StepperRef {
  nextStep: Function; // function in the ref object of the Stepper which sets the next step programmatically
  prevStep: Function; // function in the ref object of the Stepper which sets the previous step programmatically
}

export interface Steps {
  children?: any; // Any JSX.Element or ReactElement to render inside the Step component
  label?: string; // Label to be displayed in the header for every step
  disabled?: boolean | null | undefined | number | string; // allow the access to the Step, default = true
}
```

### [Demo](https://react-basic-stepper.surge.sh/)

## License

MIT © [josealejandro2928](https://github.com/josealejandro2928)
