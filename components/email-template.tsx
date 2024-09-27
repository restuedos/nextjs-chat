import * as React from 'react';
import { Stock } from './stocks';

interface EmailTemplateProps {
  symbol: string
  name: string
  price: number
  delta: number
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  symbol, name, price, delta
}) => {
  const deltaSign = delta >= 0 ? '+' : ''
  const deltaColor = delta >= 0 ? 'green' : 'red'

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
      <h2 style={{ color: '#333' }}>Stock Price Update</h2>
      <p style={{ fontSize: '18px', color: '#555' }}>
        The current price of <strong>{symbol} - {name}</strong> is:
      </p>
      <h3 style={{ color: '#333' }}>${price.toFixed(2)}</h3>
      <p style={{ fontSize: '16px', color: deltaColor }}>
        Change: <strong>{deltaSign}{delta.toFixed(2)}%</strong>
      </p>
      <p style={{ fontSize: '14px', color: '#777' }}>
        Thank you for subscribing to our stock updates!
      </p>
    </div>
  )
};
