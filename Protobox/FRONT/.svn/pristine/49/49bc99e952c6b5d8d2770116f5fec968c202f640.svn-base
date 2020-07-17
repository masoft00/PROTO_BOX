import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private LogService: AuthenticationService, 
    private router: Router
    ) { }
  ngOnInit() {
  }
  //Cette methode me permet de se connecter à mon API
  onLogin(data) {
    this.LogService.login(data)
      .subscribe(resp => {
        const jwt = resp.body.token;
        this.LogService.saveJwtToken(jwt);
        this.router.navigateByUrl('/');

        const Toast = Swal.mixin({
          toast            : true,
          position         : 'top-end',
          showConfirmButton: false,
          timer            : 3000,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon : 'success',
          title: 'Signed in successfully'
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
