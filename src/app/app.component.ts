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
  parserSearchResult: any;
  savedFileUrl: any;
  showDownloadButton: boolean = false;
  importFileData: any;
  showParseButton: boolean = false;
  parserSearchId: number = 42007;

  constructor(private http:HttpClient, private sanitizer: DomSanitizer) { }


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
    };
    reader.readAsText(file);
  }

  parseXml(xmlData:any) {
    const parser = new xml2js.Parser(
      {
        trim: true,
      });
    parser.parseString(xmlData, (err, result) => {
      const listOfTransunits :[] = result.root.file[0].body[0][`trans-unit`];
      listOfTransunits.forEach((element) => {
        const metaData :any = (element[`$`])
        if (metaData.id == this.parserSearchId) {
          this.parserSearchResult = element[`target`][0]
        }
      });
      this.updateFileData();
      this.showDownloadButton = true;
    });
  }

  updateFileData() {
    const blob = new Blob([this.parserSearchResult], { type: 'application/octet-stream' });
    this.savedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

   activateParsing() {
     this.parseXml(this.importFileData)
   }

   showParsing () {
    this.showParseButton = true;
   }

}
