import * as React from 'react'

import '../index.css'
import { confirmable, type ConfirmDialogProps } from 'react-confirm'

export interface Props {
  notification?: string
  proceed: () => void
}

const Notification = (props: Props): React.FC<ConfirmDialogProps<Props, void>> => {
  return (
    <div className="modal-background">
      <div className="modal">
        <p>
          {props.notification}
        </p>

        <button className="button modal__ok-button" onClick={() => { props.proceed() }}>Continue</button>
      </div>
    </div>)
}

export default confirmable(Notification)
