import React from 'react';
import clsx from 'clsx';

type RadioOption = {
  value: string;
  label: string;
  description?: string;
  price?: string;
};

type RadioGroupProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  className?: string;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, value, onChange, options, className }) => (
  <div
    className={clsx(
      'flex',
      'gap-8',
      'mb-8',
      className
    )}
  >
    {options.map((opt) => (
      <label
        key={opt.value}
        className={clsx(
          'flex',
          'items-start',
          'gap-3',
          'cursor-pointer',
          'border',
          'rounded-md',
          'px-4',
          'py-3',
          'min-w-[220px]',
          value === opt.value ? 'border-[#4f6a9e] bg-[#f8fafc]' : 'border-[#e5e7eb] bg-white',
          value === opt.value ? 'shadow-md' : '',
          'transition',
          'duration-150',
          'ease-in-out',
          'hover:border-[#c7b66b]'
        )}
      >
        <input
          type="radio"
          name={name}
          value={opt.value}
          checked={value === opt.value}
          onChange={onChange}
          className={clsx(
            'mt-1',
            'accent-[#4f6a9e]',
            'w-5',
            'h-5',
            'border',
            'border-[#4f6a9e]',
            'focus:ring-2',
            'focus:ring-[#c7b66b]'
          )}
        />
        <span className={clsx('ml-2', 'flex', 'flex-col', 'text-[#4f6a9e]')}> 
          <span className={clsx('font-medium', 'text-base')}>{opt.label}</span>
          {opt.description && <span className={clsx('text-xs', 'text-[#b0b7c3]', 'mt-1')}>{opt.description} <b className="text-[#c7b66b]">{opt.price}</b></span>}
        </span>
      </label>
    ))}
  </div>
);

export default RadioGroup; 