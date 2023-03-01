/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */
import React, {
  // eslint-disable-next-line no-unused-vars
  ReactElement,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import classes from './styles.module.scss';

/// //////////////STEPPER INTERFACES/////////////////////////

export interface StepperProps {
  children: Array<ReactElement> | ReactElement | any;
  indexStep?: number;
  stepChange?: Function;
  headerStyles?: HeaderStepStyles;
  linearMode?: boolean;
  verticalLabels?: boolean;
  hideLabels?: boolean;
  hideLines?: boolean;
  hideNumbers?: boolean;
  mode?: 'vertical' | 'horizontal';
}
export interface StepperRef {
  nextStep: Function;
  prevStep: Function;
}
/// ///////////////////////////////////////////////////////

export const Stepper = React.memo(
  React.forwardRef(function (
    {
      children,
      indexStep = 0,
      stepChange = (_index: number) => {},
      linearMode = false,
      verticalLabels = true,
      hideLabels = false,
      hideLines = false,
      hideNumbers = false,
      mode = 'horizontal',
      headerStyles = {
        color: '#fff',
        activatedStepBackground: '#3f51b5',
        stepsBackgroud: '#0000008a',
        lineColor: '#0000001f'
      }
    }: StepperProps,
    ref
  ): JSX.Element {
    const [labels, setLabels] = useState<
      Array<{ label?: string; id?: string; disabled?: boolean }>
    >([]);
    const [activatedStep, setActivatesStep] = useState<number>(0);
    const [mount, setMount] = useState<boolean>(false);

    const steps = (
      Array.isArray(children) ? children : [children]
    ) as Array<ReactElement>;

    useEffect(() => {
      if (steps) {
        initSteps();
        setMount(true);
      }
    }, [steps]);

    useEffect(() => {
      if (steps.length) {
        let index = Math.max(0, indexStep);
        index = Math.min(index, steps?.length - 1);
        if (steps && steps[index].props.disabled) {
          stepChange(activatedStep);
          return;
        }
        if (!linearMode || Math.abs(activatedStep - index) === 1) {
          setActivatesStep(index);
          stepChange(index);
        }
      }
    }, [indexStep]);

    useImperativeHandle(ref, () => ({
      nextStep() {
        const index = Math.min(activatedStep + 1, steps?.length - 1);
        if (steps && steps[index].props.disabled) {
          stepChange(activatedStep);
          return;
        }
        if (!linearMode || Math.abs(activatedStep - index) === 1) {
          setActivatesStep(index);
          stepChange(index);
        }
      },
      prevStep() {
        const index = Math.max(activatedStep - 1, 0);
        if (steps && steps[index].props.disabled) {
          stepChange(activatedStep);
          return;
        }
        if (!linearMode || Math.abs(activatedStep - index) === 1) {
          setActivatesStep(index);
          stepChange(index);
        }
      }
    }));

    function initSteps() {
      setLabels(
        (steps || []).map((step) => ({
          label: step.props.label,
          id: Math.random() + '',
          disabled: step.props.disabled
        }))
      );
    }

    function onClickStep(index: number) {
      if (steps && steps[index].props.disabled) {
        stepChange(activatedStep);
        return;
      }
      if (!linearMode || Math.abs(activatedStep - index) === 1) {
        setActivatesStep(index);
        stepChange(index);
      }
    }
    headerStyles.activatedStepBackground = headerStyles.activatedStepBackground || '#3f51b5';
    headerStyles.color = headerStyles.color || '#fff';
    headerStyles.stepsBackgroud = headerStyles.stepsBackgroud || '#0000008a';
    headerStyles.lineColor = headerStyles.lineColor || '#0000001f';

    return (
      <div className={classes[`stepper-${mode}`]}>
        <HeaderStep
          clickStep={onClickStep}
          labels={labels}
          activeLabel={activatedStep}
          headerStyles={headerStyles}
          verticalLabels={verticalLabels}
          hideLabels={hideLabels}
          hideLines={hideLines}
          hideNumbers={hideNumbers}
          mode={mode}
        />

        {mount && (
          <div className={classes[`body-${mode}`]}>
            {steps.map((step: ReactElement, index) => {
              if (index < activatedStep) {
                return (
                  <div
                    className={classes['step-container']}
                    key={index}
                    style={{
                      transform:
                        mode === 'horizontal'
                          ? 'translate3d(-100%, 0px, 0px)'
                          : 'translate3d(0px, -100%, 0px)',
                      height: '0px',
                      overflow: 'hidden'
                    }}
                  >
                    {step}
                  </div>
                );
              }
              if (index > activatedStep) {
                return (
                  <div
                    className={classes['step-container']}
                    key={index}
                    style={{
                      transform:
                        mode === 'horizontal'
                          ? 'translate3d(100%, 0px, 0px)'
                          : 'translate3d(0px, 100%, 0px)',
                      height: '0px',
                      overflow: 'hidden'
                    }}
                  >
                    {step}
                  </div>
                );
              } else {
                return (
                  <div
                    className={classes['step-container']}
                    key={index}
                    style={{
                      visibility: 'inherit',
                      overflow: 'auto',
                      height: 'auto'
                    }}
                  >
                    {step}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    );
  })
);

/// ///////////////HEADER STEPS///////////////////
/// /////////HEADER INTERFACES ////////////////////
export interface HeaderSteps {
  labels: Array<{ label?: string; id?: string; disabled?: boolean }>;
  activeLabel: number;
  headerStyles?: HeaderStepStyles;
  clickStep: Function;
  verticalLabels?: boolean;
  hideLabels?: boolean;
  hideLines?: boolean;
  hideNumbers?: boolean;
  mode?: 'vertical' | 'horizontal';
}

export interface HeaderStepStyles {
  color?: string;
  activatedStepBackground?: string;
  stepsBackgroud?: string;
  lineColor?: string;
}
/// /////////////////////////////////////////////////////

export const HeaderStep = React.memo(function ({
  labels,
  activeLabel,
  headerStyles = {
    color: '#fff',
    activatedStepBackground: '#3f51b5',
    stepsBackgroud: '#616161',
    lineColor: '#616161'
  },
  clickStep = (_index: number) => {},
  verticalLabels = false,
  hideLines = false,
  hideLabels = false,
  hideNumbers = false,
  mode = 'horizontal'
}: HeaderSteps): JSX.Element {
  const headerEl = labels.map((label, index) => (
    <React.Fragment key={label.id}>
      <div
        className={classes.label}
        onClick={() => {
          clickStep(index);
        }}
        style={{
          flexDirection: verticalLabels ? 'column' : 'row',
          flexWrap: !verticalLabels && mode === 'vertical' ? 'nowrap' : 'wrap',
          cursor: labels[index].disabled ? 'not-allowed' : 'pointer'
        }}
      >
        <div
          className={classes.index}
          style={{
            color: headerStyles.color,
            backgroundColor:
              index === activeLabel
                ? headerStyles.activatedStepBackground
                : headerStyles.stepsBackgroud
          }}
        >
          {hideNumbers ? '' : index + 1}
        </div>
        {label.label && !hideLabels && (
          <span
            className={index === activeLabel ? classes['text-selected'] : ''}
            style={{
              margin: verticalLabels
                ? '10px 0px 10px 0px'
                : '10px 0px 10px 10px'
            }}
          >
            {label.label}
          </span>
        )}
      </div>
      {!hideLines && (
        <div
          className={classes.line}
          style={{ borderColor: headerStyles.lineColor }}
        />
      )}
    </React.Fragment>
  ));
  return <div className={classes[`header-${mode}`]}>{headerEl}</div>;
});

/// ///////////////STEPS///////////////////
export interface Steps {
  children?: any;
  label?: string;
  disabled?: boolean | null | undefined | number | string;
}

export function Step({ children }: Steps): JSX.Element {
  return <div>{children}</div>;
}
