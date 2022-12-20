import { InjectionToken } from '@angular/core';

export type NgxFormControlMessages = { [key: string]: string };

export const NGX_DEFAULT_ERROR_MESSAGES = new InjectionToken(
  'NGX_DEFAULT_ERROR_MESSAGES'
);
