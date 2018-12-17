export enum ExitTrigger {
  ESCAPE_KEY_PRESS = 'EscapeKey',
  SPACE_KEY_PRESS = 'SpaceBarKey',
  ANY_KEY_PRESS = 'AnyKey',
  MOUSE_MOVES = 'MouseMoved',
  MOUSE_AWAY = 'MouseAway',
  CLICK_AWAY = 'ClickAway',
  CLICK_ANYWHERE = 'ClickAnywhere',
  CANCEL_BUTTON = 'CancelButton',
  OK_BUTTON = 'OkButton',
  TAP_GESTURE = 'TapGesture',
  SWEEP_GESTURE = 'SweepGesture',
  IDLE_DURATION = 'IdleDuration', // ** Requires a parameter to qualify
  TIME_LAPSE = 'TimeLapse', // ** Requires a parameter to qualify
}
