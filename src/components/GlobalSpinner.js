// src/components/GlobalSpinner.js
import React from 'react';
import Spinner from './Spinner';
import { useLoading } from '../context/LoadingContext';

const GlobalSpinner = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}>
      <Spinner />
    </div>
  );
};

export default GlobalSpinner;
