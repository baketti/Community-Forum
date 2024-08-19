import { IComment } from '@/app/models/Comment';
import { IPost } from '@/app/models/Post';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent {
    @Input() post!: IPost;
    @Input() comments!: IComment[];
    showComments: boolean = false;

    constructor(
      public loadingSrv: LoadingService,
    ) { }

    toggleComments(): void {
      this.showComments = !this.showComments
    }
}
