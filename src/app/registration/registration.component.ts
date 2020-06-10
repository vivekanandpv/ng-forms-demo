import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  standardName = 'Ajay';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
        this.validateName.bind(this),
      ],
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
      password: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  get username(): FormControl {
    return this.form.controls['username'] as FormControl;
  }

  validateName(ctl: AbstractControl): Observable<ValidationErrors> {
    const currentValue = ctl.value;

    if (currentValue === this.standardName) {
      return of(null);
    } else {
      return of({
        name_error: true,
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Posted', this.form.value);
    } else {
      console.log('Not valid');
    }
  }
}
