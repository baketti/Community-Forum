import { IComment } from '@/app/models/Comment';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss'
})
export class PostCommentComponent {
  @Input() comment!: IComment;
}
