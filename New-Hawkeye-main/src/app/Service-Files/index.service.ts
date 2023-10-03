import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import {Photo} from '../models/image.model';

import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { ServerURLService } from "./server-url.service";
// import { ServerURLService } from "./server-url.service";


@Injectable({ providedIn: "root" })
export class ChattyPhotoSubmit {
  private photo: Photo[] = [];
  private photo$ = new Subject<Photo[]>();
  readonly url = this.su.serverURL+"/api/profiles";


  constructor(private http: HttpClient, private router: Router,private su: ServerURLService) {}






}
