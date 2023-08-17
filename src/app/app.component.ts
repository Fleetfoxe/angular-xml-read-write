import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  public xmlItems: any;
  public idToFind: any;
  public targetText: any;

  constructor(private http:HttpClient) {

    this.loadXML();
  }

  //getting data function
  loadXML()
  {
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
          .then((data) => {
            this.xmlItems = data;
          });
      });
    /*Read Data*/
  }



  //store xml data into a variable
  parseXML = (data: any) => {
    var target: string;
    return new Promise(resolve => {
      var k: string | number,
        arr :any[] = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err:any, result:any) {
        var list :[] = result.root.file[0].body[0][`trans-unit`];
        //console.log(list)
        list.forEach((element) => {
          var metaData :any = (element[`$`])
          var valueToFind :string = element[`target`][0]
          if (metaData.id == 42007) {
            console.log("Loop found id 42007")
            console.log("Value of target is: " + valueToFind);
            target = valueToFind
          }
        });
        resolve(arr);
      });
      this.targetText = target;
    });
  }
}
