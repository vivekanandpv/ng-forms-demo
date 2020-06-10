import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
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

  public get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Posted', this.form.value);
    } else {
      console.log('Not valid');
    }
  }
}
