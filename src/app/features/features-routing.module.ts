import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
//import { TableUsersComponent } from './users/components/table-users/table-users.component';

const routes: Routes = [
  { path: '', component: FeaturesComponent, children: [ 
    //{ path: 'us', component: TableUsersComponent },
    { path: 'users', loadChildren: () => 
      import('./user/user.module').then(m => 
        m.UsersModule
      ) 
    },
    { path: 'posts', loadChildren: () => 
      import('./post/post.module').then(m => 
        m.PostsModule
      ) 
    },
    { 
      path: 'errors', 
      loadChildren: () => 
        import('./errors/errors.module').then(m => 
          m.ErrorsModule
        ) 
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
