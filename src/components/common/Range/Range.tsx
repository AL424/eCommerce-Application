import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react';
import './Range.scss';
import React from 'react';

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
}

const containerClass = 'slider-range__container';
const resultBoxClass = 'slider-range__result';
const viewRangeClass = 'slider-range';
const rangeTrackClass = 'slider-range__track';
const rangeClass = 'slider-range__range';

export const Range: FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={containerClass}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={`${'thumb thumb__zindex-3'} ${
          minVal > max - 100 ? 'thumb__zindex-5' : ''
        }`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb__zindex-4"
      />
      <div className={viewRangeClass}>
        <div className={rangeTrackClass}></div>
        <div ref={range} className={rangeClass}></div>
      </div>
      <div className={resultBoxClass}>
        <div>{minVal + ' $'}</div>
        <div>{maxVal + ' $'}</div>
      </div>
    </div>
  );
};
