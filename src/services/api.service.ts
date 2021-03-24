import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // apiUrl = 'http://127.0.0.1:8000/api/';
  apiUrl = 'https://tcobros.com/web_app/public/api/'//'https://t-cobro.com/tcobro/public/api/';

  header = new HttpHeaders({
    "Content-Type": "application/json, multipart/form-data",
  });

  constructor(
    private http: HttpClient,
    private iab: InAppBrowser,
    private transfer: FileTransfer
  ) {
  }  

  showMap(latlng?) {
    var url;

    if (latlng) {
      url = 'http://maps.google.com/?q=' + latlng
    } else {
      url = 'http://maps.google.com/?q=' + '34.1535454,-119.2186259';
    }

    const options: InAppBrowserOptions = {
      clearcache: "yes",
      footer: "no",
      fullscreen: "yes",
      hardwareback: "yes",
      hidespinner: "no",
      presentationstyle: "pagesheet",
      toolbar: "no",
      hidden: "yes",
      closebuttoncaption: "Close",
      hidenavigationbuttons: "yes",
      hideurlbar: "yes",
      beforeload: "yes",
      location: "yes",
      usewkwebview: "yes",
    }

    const browser = this.iab.create(url, '_system', options);

    browser.on('loadstart').subscribe(event => {
    })

    browser.on('loadstop').subscribe(event => {
      browser.show();
    });

    browser.on('exit').subscribe(event => {
      browser.close();
    })
  }

  requestPostData(api_name, data): Observable<any> {
    return this.http.post(this.apiUrl + api_name, data, { headers: this.header });
  }

  requestGetData(api_name): Observable<any> {
    return this.http.get(this.apiUrl + api_name, { headers: this.header });
  }   

  makeNewLoan(data): Promise<any> {
    var base64encodedData = btoa('admin_sip' + ':' + 'Jm070184230008');
    var headerOption = new HttpHeaders({
      "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + base64encodedData,
      // "Authorization": "Basic " + base64encodedData
    });

    let options: FileUploadOptions;
    var media: any;
    return new Promise<any>((resolve, reject) => {
      // if (data.files) {
      //   const { files, file_type, ...otherData } = data;
      //   if (file_type.includes('image')) {
      //     options = {
      //       fileKey: 'postPhotos',
      //       chunkedMode: false,
      //       httpMethod: 'POST',
      //       fileName: files.name,
      //       params: otherData,
      //       mimeType: "image/*",
      //       headers: {}
      //     };
      //   } else {
      //     options = {
      //       fileKey: 'postPhotos',
      //       chunkedMode: false,
      //       httpMethod: 'POST',
      //       fileName: files.name,
      //       params: otherData,
      //       mimeType: "application/*",
      //       headers: {}
      //     };
      //   }
      //   media = data.files
      //   const fileTransfer: FileTransferObject = this.transfer.create();

      //   fileTransfer.upload(media, this.apiUrl + 'makeNewLoan', options).then(result => {
      //     if (result.responseCode == 200) {
      //       resolve(result.response);
      //     } else {
      //       console.log('ooo == ', result);
      //       reject(result);
      //     }
      //   }).catch(error => {
      //     reject(error);
      //   })
      // } else {
        this.http.post(this.apiUrl + 'makeNewLoan', data).subscribe(result => {
          resolve(result);
        }, error => {
          reject(error);
        });
      // }
    });
  }

  getRecipeId(data): Observable<any> {
    return this.http.post(this.apiUrl + 'getRecipeId', {loan_id: '101'}, { headers: this.header })
  }  
}