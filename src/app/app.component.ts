import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  provinceModel: { id: number, name: string, type: 'central' | 'province' };
  formGroup: FormGroup;
  provinceControl = new FormControl();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      province: [null]
    })
  }

  getControl(key: string): AbstractControl {
    return this.formGroup.get(key);
  }
}
