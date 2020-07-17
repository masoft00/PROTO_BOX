import { Component, OnInit, Injectable } from '@angular/core';
import { SendmailService } from 'src/app/services/sendmail/sendmail.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.css']
})
export class SendmailComponent implements OnInit {

  constructor(
    private router     : Router,
    private sendService: SendmailService
    ){}

  ngOnInit() {
   
  }

  onSend(data) {
    this.sendService.sendMessage(data)
      .subscribe(resp => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Message sent',
          showConfirmButton: false,
          timer: 1500
        })
      }
       
    );
  }
  
}
  
