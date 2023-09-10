import Confirmation, { type Props as ConfirmationProps } from '../components/Confirmation'
import { createReactTreeMounter, createConfirmationCreater, createMountPoint } from 'react-confirm'

export function DatesAreSame (date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
};

const mounter = createReactTreeMounter()

export const createConfirmation = createConfirmationCreater(mounter)
export const MountPoint = createMountPoint(mounter)

const defaultConfirmation = createConfirmation(Confirmation)

export async function confirm (confirmation: string, options: ConfirmationProps): Promise<boolean> {
  return await defaultConfirmation({ confirmation, ...options })
}
