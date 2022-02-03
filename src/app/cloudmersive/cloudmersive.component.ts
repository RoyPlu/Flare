import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cloudmersive',
  templateUrl: './cloudmersive.component.html',
  styleUrls: ['./cloudmersive.component.css']
})
export class CloudmersiveComponent implements OnInit {



image: string = "";
form: FormGroup;
loading: boolean = false;
cloudmersiveData;

@ViewChild('fileInput') fileInput: ElementRef;

  constructor(private service: TinderService, private fb: FormBuilder) 
  {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      imageFile: null
    });
  }

  ngOnInit(){

  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('imageFile').setValue(file);

      const reader = new FileReader();
        reader.onload = e => this.image = reader.result;

        reader.readAsDataURL(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('imageFile', this.form.get('imageFile').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)

    this.service.cloudmersiveDetect(formModel).subscribe(data => {
      this.cloudmersiveData = data;
    })
  }

}
