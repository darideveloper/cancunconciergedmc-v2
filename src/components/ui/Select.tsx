import React from 'react';
import clsx from 'clsx';

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  name?: string;
  className?: string;
};

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, name, className }) => (
  <div
    className={clsx(
      'mb-4',
      className
    )}
  >
    {label && <label
      className={clsx(
        'block',
        'mb-1',
        'text-sm',
        'font-medium',
        'text-[#4f6a9e]'
      )}
    >{label}</label>}
    <select
      value={value}
      onChange={onChange}
      name={name}
      className={clsx(
        'w-full',
        'rounded-md',
        'border',
        'border-[#4f6a9e]',
        'bg-white',
        'px-4',
        'py-2',
        'text-base',
        'text-[#4f6a9e]',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-[#c7b66b]',
        'transition',
        'duration-150',
        'ease-in-out'
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select; 