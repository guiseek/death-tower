type GameCallback = (gamepad: Gamepad) => void;

export function coreGamepad(cb: GameCallback) {
  let gamepad: number;

  function runGameplay() {
    gamepad = requestAnimationFrame(runGameplay);

    for (const pad of navigator.getGamepads()) {
      if (pad) cb(pad);
    }
  }

  gamepad = requestAnimationFrame(runGameplay);

  return gamepad;
}
