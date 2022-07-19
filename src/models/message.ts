import { AlertColor } from '@mui/material';

export interface IMessage {
  open: boolean;
  message: string;
  severity: AlertColor;
}
