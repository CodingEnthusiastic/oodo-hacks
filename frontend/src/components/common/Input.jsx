import React from 'react'
import classNames from 'classnames'

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  className = '',
  id,
  required = false,
  onChange,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const handleChange = (e) => {
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={classNames(
          'block w-full rounded-lg border shadow-sm sm:text-sm px-3 py-2.5 transition-colors',
          'bg-white text-slate-900',
          'placeholder:text-slate-400',
          'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed',
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
        )}
        onChange={handleChange}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input