import React, { useRef, useEffect } from "react";
import '../../../stylesheets/Progress.scss';

interface progress {
  tops?: (string | number | null | HTMLImageElement)[],
  lefts?: (string | number | null | HTMLImageElement)[],
  rights?: (string | number | null | HTMLImageElement)[],
  bottoms?: (string | number | null | HTMLImageElement)[],
  progressDegree: number | null,
  min: number,
  max: number,
  onUseEffect: () => void | null,
  onChange: (arg: number) => void | null,
};

function Progress ( prop: any ) {
  const {
    tops, lefts, bottoms, rights,
    min, max, progressDegree,
    onUseEffect,
    onChange,
  }: progress = { ...prop.prop };
  const ProgressInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onUseEffect) { onUseEffect() }
  }, []);

  useEffect(() => {
    console.log(prop);
    const ProgressInputCurrent = ProgressInput.current;
    if (ProgressInputCurrent && progressDegree) {
      ProgressInputCurrent.value = (progressDegree / 100 * parseFloat(ProgressInputCurrent.max)).toString();
      ProgressInputCurrent.style.backgroundSize = progressDegree + "% 100%";
    }
  }, [progressDegree]);

  function changeInputRange(e: React.BaseSyntheticEvent) {
    if (onChange) { onChange(e.target.value) };
  }

  return (
    <div className="progress-background">
      {tops &&
      <div className="progress-vertical">
        {tops.map(el => <span className="progress-text">{el}</span>)}
      </div>}
      <div className="progress-horizontal">
        {lefts && 
        <div className="progress-neighbor progress-left">
          {lefts.map(el => <span className="progress-text">{el}</span>)}
        </div>}
        <input
          className="progress-bar"
          ref={ProgressInput}
          type="range"
          min={min}
          max={max}
          onInput={changeInputRange}
        />
        {rights &&
        <div className="progress-neighbor progress-right">
          {rights.map(el => <span className="progress-text">{el}</span>)}
        </div>}
      </div>
      {bottoms &&
      <div className="progress-vertical">
        {bottoms.map(el => <span className="progress-text">{el}</span>)}
      </div>}
    </div>
  )
}

export default Progress;