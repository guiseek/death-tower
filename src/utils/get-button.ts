import { ButtonType } from '../interfaces/button-type'

export function getButton(selector: ButtonType) {
  return document.querySelector(`#${selector}`) as HTMLButtonElement
}
