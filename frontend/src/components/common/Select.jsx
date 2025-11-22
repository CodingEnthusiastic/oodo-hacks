import React from 'react'
import classNames from 'classnames'

const Select = React.forwardRef(({
  label,
  error,
  helperText,
  className = '',
  id,
  required = false,
  children,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={inputId}
        className={classNames(
          'block w-full rounded-lg shadow-sm sm:text-sm px-3 py-2.5 transition-colors',
          'bg-white text-slate-900',
          'border',
          'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed',
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select