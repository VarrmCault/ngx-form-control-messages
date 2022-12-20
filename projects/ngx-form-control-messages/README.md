# NgxFormControlMessages

Built on Angular 15 but should work with any previous version (feel free to fork).

NgxFormControlMessages is a component used to show a `FormField` or `FormGroup` error messages without repeating yourself accross the application.

## Usage

The examples below use Angular Material components but `ngx-form-field-errors` can work with any library or custom design. The component only handles the text content and has no design requirements.

### Default error messages

```
<form [fromGroup]="form">
    <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" required>
        <mat-error>
            <ngx-form-field-errors [field]="form.controls.email"></ngx-form-field-errors>
        </mat-error>
    </mat-form-field>
</form>
```

### Custom error messages

```
<form [fromGroup]="form">
    <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" required>
        <mat-error>
            <ngx-form-field-errors [field]="form.controls.password" [messages]="customErrors"></ngx-form-field-errors>
        </mat-error>
    </mat-form-field>
</form>
```

With `customErrors` defined in the component's Typescript file:

```
customErrors: { [key: string]: string } = {
    passwordStrength: 'Password must be at least 10 characters long'
};
```

## Configuration

The component isn't preconfigured with default messages, you have to configure your own when importing the module:

```
/* ... */
import { NgxFormControlMessagesModule, NgxFormControlMessages } from '@varrmcault/ngx-form-control-messages';

const defaultMessages: NgxFormControlMessages = {
    required: 'Field required',
    email: 'Invalid email',
    /* ... */
};

@NgModule({
  /* ... */
  imports: [
    /* ... */
    NgxFormControlMessagesModule.forRoot(defaultMessages)
  ]
})
export class AppModule { }
```
