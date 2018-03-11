import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';

@Component({
  selector: 'app-facedetection',
  templateUrl: './facedetection.component.html',
  styleUrls: ['./facedetection.component.css']
})
export class FaceDetectionComponent implements OnInit {

faceDetect: string[];


imageURL: string = "";

  constructor(private service: TinderService) { }

  ngOnInit(){

  }

  submitFaceDetection(){
    this.faceDetection();
  }

  faceDetection(){
    this.service.faceDetection(this.imageURL).subscribe(data => {
      console.log("face detection");
      console.log(data);

      this.faceDetect = data;
    })
  }

  clearFaceDetection(){
    this.imageURL = "";
  }

}
