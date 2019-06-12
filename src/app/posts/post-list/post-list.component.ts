import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.servie';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 /* posts = [
    { title: 'First Post', content: 'This is the first post\'s content'},
    { title: 'Second Post', content: 'This is the second post\'s content'},
    { title: 'Third Post', content: 'This is the third post\'s content'}
  ]*/
  /* @Input() */ posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    // Angular will automatically execute when angular creates this component  , It is recommended to use basic initializaiton tasks in this
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
          this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
