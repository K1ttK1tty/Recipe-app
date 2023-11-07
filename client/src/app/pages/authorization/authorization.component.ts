import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatTabsModule, NgClass],
})
export class AuthorizationComponent {
    constructor(private formBuilder: FormBuilder) {}
    isRegistration = true;
    registrationForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
    loginForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
    public getRegEmailError() {
        if (this.registrationForm.controls.email.hasError('required')) return 'This field is required';
        return this.registrationForm.controls.email.hasError('email') ? 'Not a valid field' : '';
    }
    public getRegNameError() {
        return this.registrationForm.controls.name.hasError('required') ? 'This field is required' : '';
    }
    public getRegPasswordError() {
        if (this.registrationForm.controls.password.hasError('required')) return 'This field is required';
        return this.registrationForm.controls.password.hasError('minlength')
            ? 'Value must have more than 4 symbols'
            : '';
    }
    public getLoginEmailError() {
        if (this.loginForm.controls.email.hasError('required')) return 'This field is required';
        return this.loginForm.controls.email.hasError('email') ? 'Not a valid field' : '';
    }
    public getLoginPasswordError() {
        if (this.loginForm.controls.password.hasError('required')) return 'This field is required';
        return this.loginForm.controls.password.hasError('minlength') ? 'Value must have more than 4 symbols' : '';
    }
    public logIn() {
        console.log(this.loginForm.controls.email.value)
        console.log(this.loginForm.controls.password.value)
    }
    public registration() {
        console.log(this.registrationForm.controls.email.value)
        console.log(this.registrationForm.controls.name.value)
        console.log(this.registrationForm.controls.password.value)
    }
}
