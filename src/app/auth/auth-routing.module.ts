import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from "./auth.component";
import {OauthGuard} from "./oauth.guard";

const routes: Routes = [
    {path: 'auth', component: AuthComponent, canActivate: [OauthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
