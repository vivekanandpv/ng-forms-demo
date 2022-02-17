import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css']
})
export class RformComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      on: ['', Validators.required],
      items: new FormArray([])
    });
  }

  get todos(): FormArray {
    return this.form.controls['items'] as FormArray;
  }

  get items(): FormGroup[] {
    return this.todos.controls as FormGroup[];
  }

  addItem() {
    // this.form.patchValue({ on: '2018-01-01' });

    this.todos.push(
      this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['default']
      })
    );
  }

  removeItem(index: number) {
    this.todos.removeAt(index);
  }

  ngOnInit() {}

  onSubmitHandler() {
    console.log('Form posted', this.form.value);
  }
}
