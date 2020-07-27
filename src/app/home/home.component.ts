import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customSubscription = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count > 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Error: Count greater than 3!'));
        }
        count++
      }, 1000)
    })


    this.firstSubscription = customSubscription.pipe(map((data: number ) => {
      return 'count -> ' + (data + 1);
    }))
    .subscribe(
      data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!')
    })
  }

  ngOnDestroy() {
    this.firstSubscription.unsubscribe()
  }

}
