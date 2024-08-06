import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  { path: '', component: FeaturesComponent, children: [ 
    { 
      path: 'users', 
      loadChildren: () => import('./user/user.module')
    },
    { 
      path: 'posts', 
      loadChildren: () => import('./post/post.module')
    },
    { 
      path: 'errors', 
      loadChildren: () => import('./errors/errors.module')
    },
    { path: '', redirectTo: 'users', pathMatch: 'full' }
   ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
