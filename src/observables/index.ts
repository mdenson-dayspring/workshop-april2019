import { timer, Observable, throwError, of } from 'rxjs';
import { switchMap, catchError, tap, filter } from 'rxjs/operators';

interface User {
  name: string;
}

class Observables {
  checkAuth() {
    console.log("check auth...");
    return timer(2000).pipe(
      // switchMap(() => throwError('Bad Password.'))
      switchMap(() => of(true))
    );
  }

  getUser(): Observable<User> {
    console.log("get user...");
    return timer(2000).pipe(
      // switchMap(() => throwError('Bad User ID.'))
      switchMap(() => of({name: 'Max'}))
    );
  }
}

const filterOnError = (callback) => source => {
  return source.pipe(
      catchError(err => {
        callback(err);
        return of(undefined);
      }),
      filter(val => val!==undefined)
    );
}

const srv = new Observables();
srv.checkAuth().pipe(
  filterOnError(err => console.log('Authentication Error: ' + err) ),
  switchMap(auth => {
    if (auth) {
      return srv.getUser();
    } else {
      return throwError('Unexpected error.');
    }
  }),
  tap((val: User) => console.log(val.name)),
  filterOnError(err => console.log('Data Access Error: ' + err) )
).subscribe(
  next=> console.log('next', next),
  err=> console.log('error', err),
  ()=>console.log('Completed.')
);
