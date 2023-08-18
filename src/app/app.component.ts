import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  targetText: any;
  savedFileUrl: any;
  showDownloadButton: boolean = false;
  importFileData: any;
  showParseButton: boolean = false;


  constructor(private http:HttpClient, private sanitizer: DomSanitizer) { }

  parseXML = (data: any) => {
    var valueToFind: string;
    return new Promise(resolve => {
      var k: string | number,
        arr :any[] = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err:any, result:any) {
        const listOftransUnits :[] = result.root.file[0].body[0][`trans-unit`];
        listOftransUnits.forEach((element) => {
          var metaData :any = (element[`$`])
          if (metaData.id == 42007) {
            valueToFind = element[`target`][0]
          }
        });
        resolve(arr);
      });
      this.targetText = valueToFind;
      this.updateFileData();
      this.showDownloadButton = true;
    });
  }

  updateFileData() {
    const blob = new Blob([this.targetText], { type: 'application/octet-stream' });
    this.savedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

   selectFile(event:any) {
    var file: File = event.target.files[0];
    var fileExtension:string = file.name.substring(file.name.lastIndexOf('.') + 1);

    if (fileExtension !== 'xml') {
      alert("Wrong filetype");
      window.location.reload();
    } else {
      this.extractText(file);
    }
  }

  extractText(file:any) {
    var reader = new FileReader();
    reader.onload = () => {
      this.importFileData = reader.result;
      console.log(this.importFileData)
    };
    reader.readAsText(file);
    this.showParseButton = true;
   }

   activateParsing() {
     this.parseXML(this.importFileData)
   }

}
