import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { UserIconsDirective } from './directives/user-icons.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PostCommentFormComponent } from './components/post/post-comment-form/post-comment-form.component';
import { PostCommentComponent } from './components/post/post-comment/post-comment.component';
import { SinglePostComponent } from './components/post/single-post/single-post.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    AddButtonComponent,
    UserIconsDirective,
    PostCommentFormComponent,
    PostCommentComponent,
    SinglePostComponent
  ],
  imports: [ 
    CommonModule,
    MatProgressSpinnerModule,
    MatFabButton,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SpinnerComponent,
    AddButtonComponent,    
    UserIconsDirective,
    SinglePostComponent
  ]
})
export class SharedModule { }
