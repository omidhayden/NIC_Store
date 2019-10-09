import { AlertifyService } from './../../../../../../src/app/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl, NgModel, Form, AbstractControl } from '@angular/forms';
import { LoginData } from './../../_models/LoginData';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from 'src/environments/environment';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imageDir = environment.imageDir;
  data: FormGroup;
  registerData: FormGroup;
  registerT: any = false;
  
  

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    //@Inject(MAT_DIALOG_DATA) public data: FormGroup,
    private fb: FormBuilder,
    private alertify: AlertifyService) { }

  ngOnInit():void {
    this.data = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });


    this.registerData = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),

      email: new FormControl('', [Validators.email]),

      password: new FormControl('', [Validators.required,Validators.minLength(6) ]),

      confirmPassword: new FormControl('', [Validators.required , RxwebValidators.compare({fieldName: 'password'})])
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
      if(error == null) return this.alertify.error("Server doesn't response.")
      this.alertify.error(error);
    })
  }





  register(){

    if(this.registerData.invalid == true) return this.alertify.error('Please check your inputs.');

    
      const rData= {
        username: this.registerData.get('username').value,
        email: this.registerData.get('email').value,
        password: this.registerData.get('password').value
      };
  
      this.authService.register(rData).subscribe(()=>{
        this.alertify.success('Registration was successfull.')
        this.registerT = false;
      }, (e)=>{
        this.alertify.error(e);
      })
    

    
  }


  registerToggle(){
    this.registerT = !this.registerT
  }
}
