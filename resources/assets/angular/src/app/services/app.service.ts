import { Injectable } from '@angular/core';
import 'rxjs/add/observable/interval';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AppService {

    private active: BehaviorSubject<boolean>;
    private activeObservable: Observable<boolean>;

    constructor() {
        this.active = new BehaviorSubject<boolean>(true);
        this.activeObservable = this.active
            .throttleTime(500)
            .switchMap(() => this.innerObservable());
    }

    getActive(): Observable<boolean> {
        return this.activeObservable;
    }

    setActive(): void {
        this.active.next(true);
    }

    innerObservable(): Observable<boolean> {
        return Observable.merge(Observable.of(true), Observable.timer(3000).mapTo(false));
    }

}
