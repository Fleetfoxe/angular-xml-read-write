import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  targetText: any;
  fileUrl: any;
  showDownloadButton: boolean = false;

  constructor(private http:HttpClient, private sanitizer: DomSanitizer) { }


  //Function to get data from XML-file and activate parsing
  loadXML()   {
    /*Read Data*/
    this.http.get('assets/sma_gentext.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then(() => {
          });
      });
  }

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
            //console.log("Found object with id: " + metaData.id)
            //console.log("Value of target is: " + valueToFind);
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
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}
