import { Component, AfterViewInit, Input } from "@angular/core"
@Component({
moduleId: module.id,
selector: "google-adsense",
template: ` <div>
        <ins class="adsbygoogle"
           style="display:block;"
            data-ad-client="ca-pub-7259492805945889"
    [attr.data-ad-slot]="data"
            data-ad-format="auto"></ins>
         </div>   
            <br>            
  `,

})

export class AdvertisementComponent implements AfterViewInit {
@Input() data;
constructor() {}
ngAfterViewInit() {
setTimeout(() => {
 try {
    (window["adsbygoogle"] = window["adsbygoogle"] || []).push({});
  } catch (e) {
    console.error(e);
  }
}, 2000);
} }