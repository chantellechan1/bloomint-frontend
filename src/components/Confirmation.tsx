import * as React from 'react'

import '../index.css'
import { confirmable, type ConfirmDialogProps } from 'react-confirm'

export interface Props {
  okLabel?: string
  cancelLabel?: string
  title?: string
  confirmation?: string
  proceed: (value: boolean) => void
  show: boolean
}

const Confirmation = (props: Props): React.FC<ConfirmDialogProps<Props, boolean>> => {
  return (
    <div className="modal-background">
      <div className="modal">
        <p>{props.title}</p>

        {props.confirmation}

        <button className="button modal__cancel-button" onClick={() => { props.proceed(false) }}>{props.cancelLabel ?? 'cancel'}</button>
        <button className="button modal__ok-button" onClick={() => { props.proceed(true) }}>{props.okLabel ?? 'ok'}</button>
      </div>
    </div>)
}

export default confirmable(Confirmation)
