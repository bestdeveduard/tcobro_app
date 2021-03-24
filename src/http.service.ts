import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenRequest, TokenResponse } from "../src/interface/TokenResponse";
import { APIResponse } from "../src/interface/APIResponse";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  baseURL: string;
  token: string;
  tokenExp: number;
  header: any;
  constructor(private http: HttpClient, private storage: Storage) {
    let req = new TokenRequest();
    req.password = "admin123";
    req.username = "admin";
    this.baseURL = "http://api.auraconnect.co.za/";//the api.auraconnect.co.za,

    storage.get("yTokenExp").then((expVal) => {
      var date = new Date();
      console.log("token expire time", expVal);
      if (expVal < date.getTime() / 1000) {
        console.log("The token has expired");
        this.header = new HttpHeaders({
          "Content-Type": "application/json",          
        });
        this.generateToken("token/generate.php", req);
      } else {
        console.log("The token is still valid");
        storage.get("yToken").then((tokenVal) => {
          console.log("actual token from storage", tokenVal);
          this.header = new HttpHeaders({
            "Content-Type": "application/json",            
            "Authorization": "Bearer " + tokenVal,
          });
        });
      }
    });
  }
  generateToken(url: any, tokenRequest: TokenRequest) {
    this.commonPost(url, tokenRequest).subscribe(
      (apiResponse: TokenResponse) => {
        if (apiResponse.code == 1) {
          var tokenRes = apiResponse.document;
          this.token = tokenRes.access_token;
          this.tokenExp = tokenRes.expires_in;
          this.storage.set("yToken", this.token);
          this.storage.set("yTokenExp", this.tokenExp);
          this.header = new HttpHeaders({
            "Content-Type": "application/json",            
            "Authorization": "Bearer " + this.token,
          });
        } else {
        }
      }
    );
  }
  commonGet(url) {
    return this.http.get(this.baseURL + url);
  }
  commonPost(url, payLoad) {
    console.log('payLoad == ', JSON.stringify(payLoad))
    console.log('header == ', JSON.stringify(this.header))
    return this.http.post(this.baseURL + url, payLoad, {
      headers: this.header,
    });
  }
  commonpdfpost(url, payLoad) {
    return this.http.post(this.baseURL + url, payLoad);
  }
  commonPut(url, payLoad) {
    return this.http.put(this.baseURL + url, payLoad, { headers: this.header });
  }
}
