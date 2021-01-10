import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.validateEmail.bind(this)],
      ],
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

  get username(): FormControl {
    return this.form.controls['username'] as FormControl;
  }

  get email(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

  get phonenumber(): FormControl {
    return this.form.controls['phonenumber'] as FormControl;
  }

  get dateOfBirth(): FormControl {
    return this.form.controls['dateOfBirth'] as FormControl;
  }

  get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  validateEmail(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.restService.validate(ctrl.value).pipe(
      map((v) => {
        if (v.valid) {
          return null;
        } else {
          return {
            emailNotValid: true,
          };
        }
      })
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Posted', this.form.getRawValue());
    } else {
      console.log('Not valid');
    }
  }
}
