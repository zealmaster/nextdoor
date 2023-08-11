'use client'
import React from 'react';
import styles from './page.module.css'

const LoadingComponent = () => {
   
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
