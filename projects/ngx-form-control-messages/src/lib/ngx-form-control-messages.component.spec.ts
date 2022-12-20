import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NgxFormControlMessages,
  NGX_DEFAULT_ERROR_MESSAGES,
} from './default-messages.token';

import { NgxFormControlMessagesComponent } from './ngx-form-control-messages.component';

const defaultMessages: NgxFormControlMessages = {
  required: 'Field required',
  email: 'Invalid email format',
};

const getFormControl = () => {
  const control = new FormControl();
  control.markAsTouched();
  control.setErrors({ required: true, email: true });
  return control;
};

describe('NgxFormControlMessagesComponent', () => {
  let component: NgxFormControlMessagesComponent;
  let fixture: ComponentFixture<NgxFormControlMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxFormControlMessagesComponent],
      providers: [
        { provide: NGX_DEFAULT_ERROR_MESSAGES, useValue: defaultMessages },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxFormControlMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form group errors', () => {
    const formGroup = new FormGroup({ control: getFormControl() });
    formGroup.setErrors({ required: true });
    formGroup.markAsTouched();
    component.form = formGroup;
    fixture.detectChanges();

    expect(component.mainError).toBe(defaultMessages['required']);
    expect(component.showError).toBeTrue();
  });

  it('should display the first error message', () => {
    component.field = getFormControl();
    fixture.detectChanges();

    expect(component.mainError).toBe(defaultMessages['required']);
    expect(component.showError).toBeTrue();
  });

  it('should not display errors on untouched fields', () => {
    const control = getFormControl();
    control.markAsUntouched();
    component.field = control;
    fixture.detectChanges();

    expect(component.showError).toBeFalse();
  });

  it('should display custom error messages', () => {
    const control = getFormControl();
    control.setErrors({ customError: true });
    component.field = control;
    component.messages = { customError: 'customError message' };
    fixture.detectChanges();

    expect(component.mainError).toBe('customError message');
  });

  it('should select a custom message over the default one', () => {
    component.field = getFormControl();
    component.messages = { required: 'customError message' };
    fixture.detectChanges();

    expect(component.mainError).toBe('customError message');
  });

  it('should select the message order based on the handled errors list', () => {
    component.field = getFormControl();
    component.handledErrors = ['email', 'required'];
    fixture.detectChanges();

    expect(component.mainError).toBe(defaultMessages['email']);
  });

  it('should should only display messages set in the handled errors list', () => {
    component.field = getFormControl();
    component.handledErrors = ['customError'];
    fixture.detectChanges();

    expect(component.mainError).toBeFalsy();
    expect(component.showError).toBeFalse();
  });
});
