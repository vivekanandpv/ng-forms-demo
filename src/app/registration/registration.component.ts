import {Component, OnInit} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl, AbstractControl, ValidationErrors,
} from '@angular/forms';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            id: [-1],
            username: ['default', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            phonenumber: [
                '',
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(11),
                ],
            ],
            dateOfBirth: [''],
            password: ['', [Validators.required], [this.validatePassword.bind(this)]],
            startDate: [''],
            endDate: ['']
        });
    }

    ngOnInit() {
        this.form.patchValue({
            username: 'Rajesh',
            email: 'rajesh@gmail.com',
            phonenumber: 9988445511,
            dateOfBirth: '1980-03-25',
            password: '12456789'
        });

        this.password.valueChanges.subscribe(v => {
            console.log('Current Password', v);
        });

        this.startDate.setValidators([this.validateDateRange.bind(this)]);
        this.endDate.setValidators([this.validateDateRange.bind(this)]);
    }

    validatePassword(ctrl: AbstractControl): Observable<ValidationErrors | null> {
        const regex = /^[0-9]{8}$/;
        const value = ctrl.value;

        if (value.match(regex)) {
            return of(null);
        }

        return of({password_error: true});
    }

    public get password(): FormControl {
        return this.form.controls['password'] as FormControl;
    }

    public get id(): FormControl {
        return this.form.controls['id'] as FormControl;
    }

    get startDate(): FormControl {
        return this.form.controls['startDate'] as FormControl;
    }

    get endDate(): FormControl {
        return this.form.controls['endDate'] as FormControl;
    }

    validateDateRange(ctrl: AbstractControl): ValidationErrors | null {
        const start = this.startDate.value;
        const end = this.endDate.value;

        if (!!start && !!end) {
            if (start > end) {
                return {date_range_error: true};
            }
        }

        return null;
    }

    onSubmit() {
        if (this.form.valid) {
            console.log('Form Posted', this.form.value);
        } else {
            console.log('Not valid');
        }
    }
}
