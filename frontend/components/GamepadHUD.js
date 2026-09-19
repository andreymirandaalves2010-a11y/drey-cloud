'use client';

import { useGamepad } from '@/hooks/useGamepad';
import { useState, useEffect } from 'react';
import styles from './GamepadHUD.module.css';

export default function GamepadHUD() {
  const gamepadState = useGamepad();
  const [showHUD, setShowHUD] = useState(true);

  // Alternar visibilidade do HUD com Back + Start
  useEffect(() => {
    if (gamepadState.buttons.back && gamepadState.buttons.start) {
      setShowHUD((prev) => !prev);
    }
  }, [gamepadState.buttons.back, gamepadState.buttons.start]);

  if (!showHUD || !gamepadState.connected) {
    return null;
  }

  return (
    <div className={styles.hudContainer}>
      {/* HEADER COM STATUS */}
      <div className={styles.hudHeader}>
        <span className={styles.statusLight}>🎮</span>
        <span className={styles.statusText}>Controle Conectado</span>
      </div>

      <div className={styles.hudContent}>
        {/* LADO ESQUERDO - D-PAD E BUMPERS */}
        <div className={styles.leftSide}>
          {/* D-PAD */}
          <div className={styles.dpadContainer}>
            <div className={styles.dpadLabel}>D-PAD</div>
            <div className={styles.dpad}>
              <button className={`${styles.dpadBtn} ${styles.dpadUp} ${gamepadState.dpad.up ? styles.active : ''}`}>▲</button>
              <button className={`${styles.dpadBtn} ${styles.dpadLeft} ${gamepadState.dpad.left ? styles.active : ''}`}>◀</button>
              <button className={`${styles.dpadBtn} ${styles.dpadDown} ${gamepadState.dpad.down ? styles.active : ''}`}>▼</button>
              <button className={`${styles.dpadBtn} ${styles.dpadRight} ${gamepadState.dpad.right ? styles.active : ''}`}>▶</button>
            </div>
          </div>

          {/* BUMPERS ESQUERDO */}
          <div className={styles.bumpersLeft}>
            <div className={`${styles.bumper} ${gamepadState.buttons.LB ? styles.active : ''}`}>
              <div className={styles.bumperLabel}>LB</div>
            </div>
            <div className={`${styles.trigger} ${gamepadState.buttons.LT > 0 ? styles.active : ''}`}>
              <div className={styles.triggerLabel}>LT</div>
              <div className={styles.triggerValue}>{Math.round(gamepadState.buttons.LT * 100)}%</div>
            </div>
          </div>
        </div>

        {/* LADO DIREITO - BOTÕES E ANALÓGICOS */}
        <div className={styles.rightSide}>
          {/* BOTÕES (A, B, X, Y) */}
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonsLabel}>BUTTONS</div>
            <div className={styles.buttonGrid}>
              <button className={`${styles.btn} ${styles.btnY} ${gamepadState.buttons.Y ? styles.active : ''}`}>Y</button>
              <button className={`${styles.btn} ${styles.btnX} ${gamepadState.buttons.X ? styles.active : ''}`}>X</button>
              <button className={`${styles.btn} ${styles.btnB} ${gamepadState.buttons.B ? styles.active : ''}`}>B</button>
              <button className={`${styles.btn} ${styles.btnA} ${gamepadState.buttons.A ? styles.active : ''}`}>A</button>
            </div>
          </div>

          {/* BUMPERS DIREITO */}
          <div className={styles.bumpersRight}>
            <div className={`${styles.bumper} ${gamepadState.buttons.RB ? styles.active : ''}`}>
              <div className={styles.bumperLabel}>RB</div>
            </div>
            <div className={`${styles.trigger} ${gamepadState.buttons.RT > 0 ? styles.active : ''}`}>
              <div className={styles.triggerLabel}>RT</div>
              <div className={styles.triggerValue}>{Math.round(gamepadState.buttons.RT * 100)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKS ANALÓGICOS */}
      <div className={styles.sticksContainer}>
        {/* Left Stick */}
        <div className={styles.stickSection}>
          <div className={styles.stickLabel}>Left {gamepadState.buttons.leftStickClick && '(PRESSED)'}</div>
          <div className={styles.stickBox}>
            <div className={styles.stickDisplay} style={{ transform: `translate(${gamepadState.leftStick.x * 50}px, ${gamepadState.leftStick.y * 50}px)` }}>
              <div className={`${styles.stick} ${gamepadState.buttons.leftStickClick ? styles.stickActive : ''}`} />
            </div>
          </div>
          <div className={styles.stickValues}>X: {gamepadState.leftStick.x.toFixed(2)} Y: {gamepadState.leftStick.y.toFixed(2)}</div>
        </div>

        {/* Right Stick */}
        <div className={styles.stickSection}>
          <div className={styles.stickLabel}>Right {gamepadState.buttons.rightStickClick && '(PRESSED)'}</div>
          <div className={styles.stickBox}>
            <div className={styles.stickDisplay} style={{ transform: `translate(${gamepadState.rightStick.x * 50}px, ${gamepadState.rightStick.y * 50}px)` }}>
              <div className={`${styles.stick} ${gamepadState.buttons.rightStickClick ? styles.stickActive : ''}`} />
            </div>
          </div>
          <div className={styles.stickValues}>X: {gamepadState.rightStick.x.toFixed(2)} Y: {gamepadState.rightStick.y.toFixed(2)}</div>
        </div>
      </div>

      {/* CONTROLES CENTRAIS */}
      <div className={styles.centerControls}>
        <div className={`${styles.centerBtn} ${gamepadState.buttons.back ? styles.active : ''}`}>Back</div>
        <div className={`${styles.centerBtn} ${gamepadState.buttons.start ? styles.active : ''}`}>Start</div>
      </div>

      {/* DICA DE VISIBILIDADE */}
      <div className={styles.hudFooter}>
        <small>Pressione BACK + START para ocultar HUD</small>
      </div>
    </div>
  );
}
