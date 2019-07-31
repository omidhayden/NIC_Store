import { AlertifyService } from './../../../../../../src/app/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl, NgModel, Form } from '@angular/forms';
import { LoginData } from './../../_models/LoginData';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imageDir = environment.imageDir;
  data: FormGroup

  

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    //@Inject(MAT_DIALOG_DATA) public data: FormGroup,
    private fb: FormBuilder,
    private alertify: AlertifyService) { }

  ngOnInit():void {
    this.data = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)] )
    });
    
  }
  get formControls() { return this.data.controls; }


  onNoClick(): void {
    
    this.dialogRef.close();
  }


  
  submitLogin(){
    this.authService.login(this.data.value).subscribe(next=> {
      console.log('logged in successfully!');
      this.alertify.success('You successfully logged in!');
      this.dialogRef.close();
    }, error => {
      console.log('Failed to login');
      this.alertify.error('Username and Password do not match!')
    })
  }
}
