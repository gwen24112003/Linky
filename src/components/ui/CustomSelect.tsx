import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  name, value, onChange, options, placeholder = 'Sélectionner…', required,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} className="relative">
      {/* Hidden native input for form validation */}
      <input type="text" name={name} value={value} required={required} readOnly className="sr-only" tabIndex={-1} />

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between border-b py-3 text-lg transition-colors duration-300 text-left focus:outline-none"
        style={{ borderColor: value ? '#14b8a6' : '#e5e7eb' }}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-gray-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl overflow-hidden"
            style={{
              background: 'white',
              border: '1px solid rgba(15,118,110,0.15)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => { onChange(option.value); setOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-base hover:bg-teal-50 transition-colors duration-150 group"
              >
                <span className={value === option.value ? 'text-teal-700 font-semibold' : 'text-gray-700 group-hover:text-teal-700'}>
                  {option.label}
                </span>
                {value === option.value && <Check size={16} className="text-teal-500 flex-shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
