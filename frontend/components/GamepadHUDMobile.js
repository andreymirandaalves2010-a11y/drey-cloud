'use client';

import { useState, useEffect } from 'react';
import styles from './GamepadHUDMobile.module.css';

export default function GamepadHUDMobile() {
  const [showHUD, setShowHUD] = useState(true);
  const [touches, setTouches] = useState({});

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

  const dpadWidth = 150;
  const dpadHeight = 150;
  const dpadX = 30;
  const dpadY = screenHeight - dpadHeight - 30;

  const buttonsRadius = 40;
  const buttonsX = screenWidth - 120;
  const buttonsY = screenHeight - 120;

  const triggerWidth = 100;
  const triggerHeight = 60;
  const triggerLTX = 20;
  const triggerRTX = screenWidth - triggerWidth - 20;
  const triggerY = 20;

  useEffect(() => {
    const handleDoubleClick = (e) => {
      const centerX = screenWidth / 2;
      const centerY = screenHeight / 2;
      const tolerance = 150;

      if (
        Math.abs(e.clientX - centerX) < tolerance &&
        Math.abs(e.clientY - centerY) < tolerance
      ) {
        setShowHUD((prev) => !prev);
      }
    };

    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, [screenWidth, screenHeight]);

  const handleTouchStart = (e) => {
    const newTouches = {};
    for (let touch of e.touches) {
      const x = touch.clientX;
      const y = touch.clientY;

      if (
        x >= dpadX &&
        x <= dpadX + dpadWidth &&
        y >= dpadY &&
        y <= dpadY + dpadHeight
      ) {
        const relX = x - (dpadX + dpadWidth / 2);
        const relY = y - (dpadY + dpadHeight / 2);

        if (relY < -30) newTouches.dpadUp = true;
        if (relY > 30) newTouches.dpadDown = true;
        if (relX < -30) newTouches.dpadLeft = true;
        if (relX > 30) newTouches.dpadRight = true;
      }

      const distToButtons = Math.sqrt(
        Math.pow(x - buttonsX, 2) + Math.pow(y - buttonsY, 2)
      );
      if (distToButtons < buttonsRadius + 20) {
        const angle = Math.atan2(y - buttonsY, x - buttonsX);
        if (angle > -Math.PI / 4 && angle < Math.PI / 4)
          newTouches.buttonB = true;
        if (angle > Math.PI / 4 && angle < (3 * Math.PI) / 4)
          newTouches.buttonA = true;
        if (angle > (-3 * Math.PI) / 4 && angle < (-Math.PI) / 4)
          newTouches.buttonY = true;
        if (Math.abs(angle) > (3 * Math.PI) / 4)
          newTouches.buttonX = true;
      }

      if (
        x >= triggerLTX &&
        x <= triggerLTX + triggerWidth &&
        y >= triggerY &&
        y <= triggerY + triggerHeight
      ) {
        newTouches.LT = true;
      }
      if (
        x >= triggerRTX &&
        x <= triggerRTX + triggerWidth &&
        y >= triggerY &&
        y <= triggerY + triggerHeight
      ) {
        newTouches.RT = true;
      }
    }
    setTouches(newTouches);
  };

  const handleTouchEnd = () => {
    setTouches({});
  };

  if (!showHUD) {
    return (
      <div
        onClick={() => setShowHUD(true)}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          width: '40px',
          height: '40px',
          background: 'rgba(0, 212, 255, 0.7)',
          border: '2px solid var(--cyan)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          fontSize: '20px',
        }}
      >
        gamepad
      </div>
    );
  }

  return (
    <div
      className={styles.hudMobileContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          position: 'fixed',
          left: dpadX + 'px',
          top: dpadY + 'px',
          width: dpadWidth + 'px',
          height: dpadHeight + 'px',
          background: 'rgba(0, 212, 255, 0.1)',
          border: '2px solid rgba(0, 212, 255, 0.5)',
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          alignItems: 'center',
          justifyItems: 'center',
          zIndex: 9000,
        }}
      >
        <div style={{
          gridColumn: 2,
          gridRow: 1,
          width: '40px',
          height: '40px',
          background: touches.dpadUp ? 'var(--cyan)' : 'rgba(0, 212, 255, 0.3)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>UP</div>
        <div style={{
          gridColumn: 1,
          gridRow: 2,
          width: '40px',
          height: '40px',
          background: touches.dpadLeft ? 'var(--cyan)' : 'rgba(0, 212, 255, 0.3)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>LEFT</div>
        <div style={{
          gridColumn: 3,
          gridRow: 2,
          width: '40px',
          height: '40px',
          background: touches.dpadRight ? 'var(--cyan)' : 'rgba(0, 212, 255, 0.3)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>RIGHT</div>
        <div style={{
          gridColumn: 2,
          gridRow: 3,
          width: '40px',
          height: '40px',
          background: touches.dpadDown ? 'var(--cyan)' : 'rgba(0, 212, 255, 0.3)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>DOWN</div>
      </div>

      <button
        onClick={() => setShowHUD(false)}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          width: '40px',
          height: '40px',
          background: 'rgba(255, 0, 0, 0.6)',
          border: '2px solid rgba(255, 0, 0, 0.8)',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10000,
          fontSize: '18px',
        }}
      >
        X
      </button>
    </div>
  );
}