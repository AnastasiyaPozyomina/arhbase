import React from 'react';

export default function Root({ children }) {
  return (
    <div style={{
      // fontFamily: `'Roboto'`,
      // // fontSize: '1rem',
      // // transition: 'background-color 0.3s ease, color 0.3s ease'
      //  fontWeight: '200',
      //  font:`'var(--ifm-font-size-base) / var(--ifm-line-height-base) var(--ifm-font-family-base)'`
    }}>
      {children}
    </div>
  );
}