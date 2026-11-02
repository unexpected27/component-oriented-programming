import './FormField.css';

function FormField({
  label,
  htmlFor,
  error,
  helperText,
  required = false,
  children,
  className = ''
}) {
  return (
    <div className={`ds-form-field ${className}`.trim()}>
      {label && (
        <label htmlFor={htmlFor} className="ds-form-field-label">
          {label}
          {required && <span className="ds-form-field-required" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error && (
        <span className="ds-form-field-error" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="ds-form-field-helper">
          {helperText}
        </span>
      )}
    </div>
  );
}

export default FormField;
