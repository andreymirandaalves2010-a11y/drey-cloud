'use client';

import { useEffect, useState, useCallback } from 'react';

export const useGamepad = () => {
  const [gamepadState, setGamepadState] = useState({
    buttons: {
      A: false,
      B: false,
      X: false,
      Y: false,
      LB: false,
      RB: false,
      LT: 0,
      RT: 0,
      back: false,
      start: false,
      leftStickClick: false,
      rightStickClick: false,
    },
    leftStick: { x: 0, y: 0 },
    rightStick: { x: 0, y: 0 },
    dpad: { up: false, down: false, left: false, right: false },
    connected: false,
  });

  const getGamepadState = useCallback((gamepad) => {
    if (!gamepad) return null;

    const buttons = {
      A: gamepad.buttons[0]?.pressed || false,           // 0: A
      B: gamepad.buttons[1]?.pressed || false,           // 1: B
      X: gamepad.buttons[2]?.pressed || false,           // 2: X
      Y: gamepad.buttons[3]?.pressed || false,           // 3: Y
      LB: gamepad.buttons[4]?.pressed || false,          // 4: LB
      RB: gamepad.buttons[5]?.pressed || false,          // 5: RB
      LT: gamepad.buttons[6]?.value || 0,                // 6: LT (trigger)
      RT: gamepad.buttons[7]?.value || 0,                // 7: RT (trigger)
      back: gamepad.buttons[8]?.pressed || false,        // 8: Back
      start: gamepad.buttons[9]?.pressed || false,       // 9: Start
      leftStickClick: gamepad.buttons[10]?.pressed || false,  // 10: Left stick click
      rightStickClick: gamepad.buttons[11]?.pressed || false, // 11: Right stick click
    };

    const leftStick = {
      x: gamepad.axes[0] || 0,
      y: gamepad.axes[1] || 0,
    };

    const rightStick = {
      x: gamepad.axes[2] || 0,
      y: gamepad.axes[3] || 0,
    };

    const dpadValue = gamepad.buttons[12]?.value || 0;
    const dpad = {
      up: gamepad.buttons[12]?.pressed || false,   // D-Pad Up
      down: gamepad.buttons[13]?.pressed || false, // D-Pad Down
      left: gamepad.buttons[14]?.pressed || false, // D-Pad Left
      right: gamepad.buttons[15]?.pressed || false,// D-Pad Right
    };

    return { buttons, leftStick, rightStick, dpad };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const updateGamepadState = () => {
      const gamepads = navigator.getGamepads();
      
      if (gamepads && gamepads.length > 0) {
        const gamepad = gamepads[0];
        if (gamepad) {
          const state = getGamepadState(gamepad);
          setGamepadState((prevState) => ({
            ...prevState,
            ...state,
            connected: true,
          }));
        }
      }

      animationFrameId = requestAnimationFrame(updateGamepadState);
    };

    const handleGamepadConnect = (event) => {
      console.log('🎮 Gamepad conectado:', event.gamepad.id);
    };

    const handleGamepadDisconnect = (event) => {
      console.log('🎮 Gamepad desconectado');
      setGamepadState((prevState) => ({
        ...prevState,
        connected: false,
      }));
    };

    window.addEventListener('gamepadconnected', handleGamepadConnect);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnect);

    // Inicia polling de gamepad
    animationFrameId = requestAnimationFrame(updateGamepadState);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('gamepadconnected', handleGamepadConnect);
      window.removeEventListener('gamepaddisconnect', handleGamepadDisconnect);
    };
  }, [getGamepadState]);

  return gamepadState;
};
