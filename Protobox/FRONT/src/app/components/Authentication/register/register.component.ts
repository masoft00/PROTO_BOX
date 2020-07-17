import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  constructor(
    private router     : Router, 
    private regService : AuthenticationService,
    ) { }

  ngOnInit() {
   
  }

  onSubmit(data) {
    this.regService.creatUser(data)
      .subscribe(resp => {
        console.log(data)
        this.router.navigateByUrl('/login');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Sign Up  successfull'
        })
      }, err => {
        Swal.fire(
          'Veuillez mettre vos identifiants',
          'SVP',
          'error'
        )
      });
  }
}