import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  {
    path: 'login',
    loadChildren: './pages/user/auth/login/login.module#LoginPageModule'
  },
  {
    path: 'signup',
    loadChildren: './pages/user/auth/signup/signup.module#SignupPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
