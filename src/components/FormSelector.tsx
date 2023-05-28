import React from 'react';

/* eslint-disable-next-line */
export interface FormSelectProps {
  inputId: string;
  inputName: string;
  inputValue?: string;
  isRequired: boolean;
  doValidate: boolean;
  labelText: string;
  errorText?: string;
  onChangeCallback?: (e: string) => void;
  fieldClassVariant?: string;
  selectDataSource: SelectOption[];
}

export interface SelectOption {
  optionValue: string;
  optionName: string;
}

export function FormSelect(props: FormSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChangeCallback && props.onChangeCallback(e.target.value);
  };

  return (
    <div className="form-selector">
      <label htmlFor={props.inputId} className="field__label">
        {props.isRequired && <span className="field__required-mark">*</span>}
        {props.labelText}
      </label>
      <select
        value={props.inputValue || ''}
        className="c-input"
        onChange={handleChange}
        name={props.inputName}
        id={props.inputId}
      >
        <option value="" disabled={true}></option>
        {props.selectDataSource.map((op: SelectOption, index: number) => {
          return (
            <option value={op.optionValue} key={`${props.inputId}-option-${index}`}>
              {op.optionName}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormSelect;
