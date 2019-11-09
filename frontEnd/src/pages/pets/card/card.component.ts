import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  @Input()
  data: {
    name: String,
    kind:String,
    character:String, 
    gender: Boolean,
    vaccineUpToDate: Boolean,
    provider: String,
    age:Number,
    price:Number,
    img: String,
  };

  isVisible = false;
  detailVisible = false;


  validateForm: FormGroup;
  confirmModal: NzModalRef; // For testing by now
  constructor(
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group({
      name: [''],
      gender: [''],
      age: [''],
      vaccine: [''],
      price: [''],
      character:  [''],
      image:  [''],
      provider:  ['']
    });
   }

  detailClick(): void{
    this.detailVisible=true
  }

  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.handleOk()
  }


  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');  
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.detailVisible=false
  }

  ngOnInit() {
  }

}
