import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {saveAs} from "file-saver";
//import ProductService from "../services/product.service.ts";
@Component({
  selector: 'app-chattydownload',
  templateUrl: './chattydownload.component.html',
  styleUrls: ['./chattydownload.component.css']
})
export class ChattydownloadComponent implements OnInit {




  constructor(private http:HttpClient) { }




  ngOnInit() {

  }

    // This data will be generated in the CSV file



}
