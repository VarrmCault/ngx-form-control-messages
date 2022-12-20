import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  NgxFormControlMessages,
  NGX_DEFAULT_ERROR_MESSAGES,
} from './default-messages.token';
import { NgxFormControlMessagesComponent } from './ngx-form-control-messages.component';

@NgModule({
  declarations: [NgxFormControlMessagesComponent],
  imports: [],
  exports: [NgxFormControlMessagesComponent],
})
export class NgxFormControlMessagesModule {
  static forRoot(
    defaultMessages: NgxFormControlMessages
  ): ModuleWithProviders<NgxFormControlMessagesModule> {
    return {
      ngModule: NgxFormControlMessagesModule,
      providers: [
        {
          provide: NGX_DEFAULT_ERROR_MESSAGES,
          useValue: defaultMessages,
        },
      ],
    };
  }
}
