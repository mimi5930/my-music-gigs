import { useState, useEffect } from 'react';

type Colors = {
  primary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  dark: string;
};

// component
export default function Button({
  type = 'primary',
  children
}: {
  type?: keyof Colors;
  children: string;
}) {
  const [color] = useButtonColors(type);

  return (
    <button
      type="button"
      className={`border text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline ${color}`}
    >
      {children}
    </button>
  );
}

// custom hook
function useButtonColors(type: keyof Colors) {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const colorConversion = (color: keyof Colors): string => {
      const colorsMap = {
        primary: 'border-indigo-500 bg-indigo-500 hover:bg-indigo-600',
        success: 'border-green-500 bg-green-500 hover:bg-green-600',
        danger: 'border-red-500 bg-red-500 hover:bg-red-600',
        warning: 'border-yellow-500 bg-yellow-500 hover:bg-yellow-600',
        info: 'border-teal-500 bg-teal-500 hover:bg-teal-600',
        dark: 'border-gray-500 bg-gray-500 hover:bg-gray-600'
      };
      return colorsMap[color];
    };
    setColor(colorConversion(type));
  }, [type]);

  return [color];
}
