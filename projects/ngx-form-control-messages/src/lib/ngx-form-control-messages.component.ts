import { Component, DoCheck, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NgxFormControlMessages,
  NGX_DEFAULT_ERROR_MESSAGES,
} from './default-messages.token';

function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (Array.isArray(value) || typeof value === 'string') {
    return !!value.length;
  }
  if (typeof value === 'object') {
    return !!Object.keys(value).length;
  }
  return true;
}

@Component({
  selector: 'ngx-form-control-messages',
  template: '<span *ngIf="showError">{{ mainError }}</span>',
  styles: [],
})
export class NgxFormControlMessagesComponent implements DoCheck {
  /**
   * `FormControl` when using field validators.
   */
  @Input() field?: FormControl;

  /**
   * `FormGroup` when using form validators.
   */
  @Input() form?: FormGroup;

  /**
   * A list of custom messages to display for that particular field.
   */
  @Input() messages: { [key: string]: string } = {};

  /**
   * A list of error keys to filter. If empty, all messages will be processed
   * and shown if the error key matches a default or custom message. It can also
   * be used to control the order of the errors and pick the more relevant error to
   * show.
   */
  @Input() handledErrors: string[] = [];

  /**
   * Indicates if a message is visible. Errors are shown only if the field has
   * been touched by the user or the field is prefilled with an incorrect value.
   */
  public showError = false;

  /**
   * Current error. If the field has multiple errors, the first key will be used.
   */
  public mainError?: string;

  constructor(
    @Inject(NGX_DEFAULT_ERROR_MESSAGES)
    private defaultErrors: NgxFormControlMessages = {}
  ) {}

  ngDoCheck(): void {
    this.showError = false;
    const control: FormControl | FormGroup | undefined =
      this.field ?? this.form;
    if (control?.errors) {
      let errorKeys = Object.keys(control.errors as object);
      if (this.handledErrors.length) {
        const filteredAndSorted: string[] = [];
        this.handledErrors.forEach((key) => {
          if (errorKeys.includes(key)) {
            filteredAndSorted.push(key);
          }
        });
        errorKeys = filteredAndSorted;
      }
      if (errorKeys.length) {
        this.mainError =
          this.messages[errorKeys[0]] ?? this.defaultErrors[errorKeys[0]];

        if (this.field) {
          this.showError = this.field.touched || hasValue(this.field.value);
        }
        if (this.form) {
          // Form value always contains a property for each form field
          // The form is considered pre-filled when at least one form field isn't empty
          this.showError =
            this.form.touched ||
            Object.values(this.form.value).some((value) => hasValue(value));
        }
      }
    }
  }
}
