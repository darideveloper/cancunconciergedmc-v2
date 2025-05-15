import React from 'react';
import clsx from 'clsx';

type InputProps = {
  label?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({ label, type = 'text', value, onChange, placeholder, name, className }) => (
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
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
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
        'placeholder:text-[#b0b7c3]',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-[#c7b66b]',
        'transition',
        'duration-150',
        'ease-in-out'
      )}
    />
  </div>
);

export default Input; 