import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "./auth.service";
import {UserStorageService} from "../_services/user-storage.service";
import {Router} from "@angular/router";

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
                private authService: AuthService,
                private userStorageService: UserStorageService,
                private router: Router,
                private fb: FormBuilder) {
        this.authForm = this.fb.group({
            email: ['ionic@app.com', [Validators.required, Validators.email]],
            password: ['ionic', [Validators.required, Validators.minLength(4)]],
        });
    }

    ngOnInit() {
    }

    submit() {
        this.presentLoading().then(() => {
            if (this.authForm.valid) {
                this.authService.auth(this.authForm.value).subscribe((response) => {
                    if (response.success) {
                        this.userStorageService.setToLocalStorageUserAuthInfo(response)
                        this.router.navigate(['/'])
                    } else {
                        this.presentAlert(response.error).then()
                    }
                })
            } else {
                this.presentAlert('Please fill correctly auth fields').then()
            }
        });
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'please wait...',
            duration: 500
        });
        await loading.present();

        const {role, data} = await loading.onDidDismiss();
    }

    async presentAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Authentication Failed',
            subHeader: 'invalid credentials!',
            message: `${message}`,
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
