import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public defaultFormMessages = new FormGroup<{
    email: FormControl<string | null>;
  }>({
    email: new FormControl<string>('name@domain.com', [
      Validators.required,
      Validators.email,
    ]),
  });

  public customFormMessages = new FormGroup<{
    email: FormControl<string | null>;
    birthYear: FormControl<number | null>;
  }>({
    email: new FormControl<string>('name@domain.com', [
      Validators.required,
      Validators.email,
    ]),
    birthYear: new FormControl<number>(1999, [
      Validators.required,
      Validators.max(1999),
      Validators.min(1900),
    ]),
  });

  public customErrors: { [key: string]: string } = {
    max: 'Damn gen Z',
    min: 'You are not that old... Are you?',
  };

  public configurationHtml = `
  NgxFormControlMessagesModule.forRoot({
    required: 'Field required',
    email: 'Invalid email format',
  }),`;

  public defaultExampleHtml = `
  <form [formGroup]="defaultFormMessages">
    <mat-form-field>
      <mat-label>Email</mat-label>
      <input matInput type="email" formControlName="email" required />
      <mat-error>
        <ngx-form-control-messages
          [field]="defaultFormMessages.controls.email"
        ></ngx-form-control-messages>
      </mat-error>
    </mat-form-field>
  </form>`;

  public customExampleHtml = `
  <form [formGroup]="customFormMessages">
    <mat-form-field>
      <mat-label>Email</mat-label>
      <input matInput type="email" formControlName="email" required />
      <mat-error>
        <ngx-form-control-messages
          [field]="customFormMessages.controls.email"
        ></ngx-form-control-messages>
      </mat-error>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Birth year</mat-label>
      <input matInput type="number" formControlName="birthYear" required />
      <mat-hint>Try to be younger than that!</mat-hint>
      <mat-error>
        <ngx-form-control-messages
          [field]="customFormMessages.controls.birthYear"
          [messages]="customErrors"
        ></ngx-form-control-messages>
      </mat-error>
    </mat-form-field>
  </form>`;
  public customExampleConfigHtml = `
  customErrors: { [key: string]: string } = {
    max: 'Damn gen Z',
    min: 'You are not that old... Are you?',
  };`;

  public showDefaultErrorMessagesCode = false;
  public showCustomErrorMessagesCode = false;
}
