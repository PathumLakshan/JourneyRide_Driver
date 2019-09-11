import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/authguard/auth-guard.service';

const routes: Routes = [

  { path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'trip-details-modal',
    loadChildren: './public/trip-details-modal/trip-details-modal.module#TripDetailsModalPageModule',
    canActivate: [AuthGuardService]
  },
  { path: '',
    loadChildren: './public/home/home.module#HomePageModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
