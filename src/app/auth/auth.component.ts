import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  public authForm: FormGroup;

  private onComponentDestroy$: Subject<void> = new Subject();

  constructor(public alertController: AlertController,
              public loadingController: LoadingController,
              private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}

  submit(){
    this.presentLoading().then(() => {
      if (this.authForm.valid){
        console.log(this.authForm.value);
      }  else {
        this.presentAlert().then()
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Authentication Failed',
      subHeader: 'invalid credentials!',
      message: 'Please fill correctly auth fields',
      buttons: ['OK']
    });

    await alert.present();
  }
  public ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
    this.onComponentDestroy$.unsubscribe();
  }
}
