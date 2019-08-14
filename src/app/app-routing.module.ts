import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'trip-details-modal',
    loadChildren: './public/trip-details-modal/trip-details-modal.module#TripDetailsModalPageModule' 
  },
  { path: '',
    loadChildren: './public/home/home.module#HomePageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
