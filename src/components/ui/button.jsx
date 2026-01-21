import React from 'react';

// Minimal Button component used by Header and other copied components.
// Props: variant ("outline"|"default"), className, children, ...rest
export const Button = ({ variant = 'default', className = '', children, ...rest }) => {
  const base = 'inline-flex items-center justify-center rounded px-3 py-1 text-sm font-medium transition';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-border bg-transparent hover:bg-primary/5',
  };

  const classes = `${base} ${variants[variant] || variants.default} ${className}`.trim();

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
// trigger
// touch
