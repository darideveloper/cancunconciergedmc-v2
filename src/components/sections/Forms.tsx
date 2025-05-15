import React, { useState } from 'react';
import clsx from 'clsx';
import Input from '../ui/Input';
import Select from '../ui/Select';
import RadioGroup from '../ui/RadioGroup';

const transferOptions = [
  {
    value: 'airport-hotel',
    label: 'AIRPORT - HOTEL TRANSFER',
    description: 'starting at',
    price: '50.00 USD',
  },
  {
    value: 'hotel-airport',
    label: 'HOTEL - AIRPORT TRANSFER',
    description: 'starting at',
    price: '50.00 USD',
  },
  {
    value: 'round-trip',
    label: 'ROUND TRIP - TRANSFER',
    description: 'starting at',
    price: '100.00 USD',
  },
];

const passengerOptions = Array.from({ length: 8 }, (_, i) => ({ value: i + 1, label: `${i + 1} passenger${i === 0 ? '' : 's'}` }));

const hotelOrAirbnbOptions = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'airbnb', label: 'Airbnb' },
];
const resortOptions = [
  { value: 'cancun', label: 'Cancun' },
  { value: 'playa-del-carmen', label: 'Playa del Carmen' },
  { value: 'tulum', label: 'Tulum' },
];
const basePrices = {
  'airport-hotel': 50,
  'hotel-airport': 50,
  'round-trip': 100,
};

export default function TransportationForm() {
  const [values, setValues] = useState({
    transferType: 'airport-hotel',
    name: '',
    lastName: '',
    passengers: 1,
    hotelOrAirbnb: 'hotel',
    resortDestination: 'cancun',
    airbnbAddress: '',
    arrivingDate: '',
    arrivingTime: '',
    airline: '',
    flightNumber: '',
    total: 50,
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value: string | number = e.target.value;
    if (field === 'passengers') value = Number(value);
    setValues((prev) => {
      const newValues = { ...prev, [field]: value };
      if (field === 'transferType') {
        newValues.total = basePrices[value as keyof typeof basePrices];
      }
      return newValues;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Print all form details to the console
    console.log('Transportation Form Details:', values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'container',
        'mx-auto',
        'max-w-5xl',
        'py-8',
        'px-2',
        'bg-white',
        'rounded-lg',
        'shadow',
        'mt-8',
        'text-lg'
      )}
    >
      <RadioGroup
        name="transferType"
        value={values.transferType}
        onChange={handleChange('transferType') as any}
        options={transferOptions}
        className={clsx(
          'mb-10',
          'flex',
          'flex-col',
          'gap-4',
          'sm:flex-row',
          'sm:gap-8',
          'md:gap-10',
          'items-stretch',
        )}
      />
      <div
        className={clsx(
          'form-sections',
          'flex',
          'flex-col',
          'md:flex-row',
          'gap-12',
          'mb-6'
        )}
      >
        <div className={clsx('flex-1', 'min-w-[300px]')}>
          <h3 className={clsx('text-xl', 'font-semibold', 'mb-4', 'text-blue-800')}>
            GENERAL
          </h3>
          <Input
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            placeholder="Enter your name"
            name="name"
            className="text-lg"
          />
          <Input
            label="Last name"
            value={values.lastName}
            onChange={handleChange('lastName')}
            placeholder="Enter your last name"
            name="lastName"
            className="text-lg"
          />
          <Select
            label="Number of passengers"
            value={values.passengers}
            onChange={handleChange('passengers') as any}
            options={passengerOptions}
            name="passengers"
            className="text-lg"
          />
          <small className={clsx('block', 'mb-2', 'text-base', 'text-blue-800')}>
            Maximum eight passengers per van
          </small>
          <Select
            label="Hotel or Airbnb"
            value={values.hotelOrAirbnb}
            onChange={handleChange('hotelOrAirbnb') as any}
            options={hotelOrAirbnbOptions}
            name="hotelOrAirbnb"
            className="text-lg"
          />
          <Select
            label="Resort destination"
            value={values.resortDestination}
            onChange={handleChange('resortDestination') as any}
            options={resortOptions}
            name="resortDestination"
            className="text-lg"
          />
          {values.hotelOrAirbnb === 'airbnb' && (
            <Input
              label="Airbnb address"
              value={values.airbnbAddress}
              onChange={handleChange('airbnbAddress')}
              placeholder="Enter your Airbnb address"
              name="airbnbAddress"
              className="text-lg"
            />
          )}
        </div>
        <div className={clsx('flex-1', 'min-w-[300px]')}>
          <h3 className={clsx('text-xl', 'font-semibold', 'mb-4', 'text-blue-800')}>
            ARRIVING
          </h3>
          <Input
            label="Arriving date"
            type="date"
            value={values.arrivingDate}
            onChange={handleChange('arrivingDate')}
            name="arrivingDate"
            className="text-lg"
          />
          <Input
            label="Arriving time in Cancun"
            type="time"
            value={values.arrivingTime}
            onChange={handleChange('arrivingTime')}
            name="arrivingTime"
            className="text-lg"
          />
          <Input
            label="Airline"
            value={values.airline}
            onChange={handleChange('airline')}
            placeholder="Enter your airline"
            name="airline"
            className="text-lg"
          />
          <Input
            label="Flight number"
            value={values.flightNumber}
            onChange={handleChange('flightNumber')}
            placeholder="Enter your flight number"
            name="flightNumber"
            className="text-lg"
          />
          <small className={clsx(
            'block',
            'mt-2',
            'text-base',
            'text-gray-400'
            )}>
            *In case you have connecting flights, please make sure you provide the info for your actual flight arriving in Cancun
          </small>
        </div>
      </div>
      <div
        className={clsx(
          'total-section',
          'text-center',
          'mt-8',
          'text-xl',
          'font-semibold',
          'text-blue-800'
        )}
      >
        Total <span className={clsx('text-yellow-600')}>{values.total.toFixed(2)} USD</span>
      </div>
      <div className={clsx('flex', 'justify-center', 'mt-8')}>
        <button
          type="submit"
          className={clsx(
            'bg-yellow-500',
            'hover:bg-yellow-600',
            'text-white',
            'font-bold',
            'py-3',
            'px-8',
            'rounded-md',
            'shadow',
            'transition',
            'duration-150',
            'ease-in-out',
            'text-lg',
            'tracking-wide',
            'uppercase',
          )}
        >
          Buy Now
        </button>
      </div>
    </form>
  );
} 
