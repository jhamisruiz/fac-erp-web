import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from './views/inicio/app-login/app-login.component';
import { AuthGuard } from './shared/guards/guards/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   //loadChildren: (): Promise<any> => import('./tools/tools.module').then(m => m.ToolsModule),
  //   //component: AppLoginComponent,
  //   loadChildren: (): any => import('./views/inicio/inicio.module').then(m => m.InicioModule),
  // },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: AppLoginComponent,
  },
  {
    path: '',
    loadChildren: (): any => import('./views/views.routing')
      .then(m => m.ViewsRoutingModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: false,
        onSameUrlNavigation: 'reload',
        canceledNavigationResolution: 'replace',
        initialNavigation: 'enabledBlocking',
        paramsInheritanceStrategy: 'always',
      },
    ),
    RouterModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }

