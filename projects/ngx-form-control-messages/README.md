# NgxFormControlMessages

[Demo](https://varrmcault.github.io/ngx-form-control-messages/)

Built on Angular 15 but should work with any previous version (feel free to fork).

NgxFormControlMessages is a component used to show a `FormField` or `FormGroup` error messages without repeating yourself accross the application.

## Usage

The examples below use Angular Material components but `ngx-form-control-messages` can work with any library or custom design. The component only handles the text content and has no design requirements.

### Default error messages

```
<form [formGroup]="form">
    <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" required>
        <mat-error>
            <ngx-form-control-messages [field]="form.controls.email"></ngx-form-control-messages>
        </mat-error>
    </mat-form-field>
</form>
```

### Custom error messages

```
<form [formGroup]="form">
    <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" required>
        <mat-error>
            <ngx-form-control-messages [field]="form.controls.password" [messages]="customErrors"></ngx-form-control-messages>
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

### Filtering/Sorting errors

By default, the component will select the first error found for the field. The `handledErrors` property allows you to filter messages and/or manually select which message is the most important to show. Be aware that you have to set an exhaustive list of the errors you want to handle if you use this property.

```
<form [formGroup]="form">
    <mat-form-field>
        <mat-label>Some custom field</mat-label>
        <input matInput formControlName="customField" required>
        <mat-error>
            <ngx-form-control-messages [field]="form.controls.password" [messages]="customErrors" [handledErrors]=['required', 'customError']></ngx-form-control-messages>
        </mat-error>
    </mat-form-field>
</form>
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
