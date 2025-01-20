import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { UserDataModel } from '../shared/models/user-data.model';
import { inject } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type UsersState = {
  users: UserDataModel[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    _setLoading() {
      patchState(store, (state) => ({ isLoading: true, error: null, users: [] }));
    },
    _setError(error: Error) {
      patchState(store, (state) => ({ error, isLoading: false, users: [] }));
    },
    _setUsers(users: UserDataModel[]) {
      patchState(store, (state) => ({ users: users, isLoading: false, error: null }));
    }
  })),
  withMethods((store, httpService = inject(HttpService)) => ({
    loadUsers: rxMethod<void>(
      pipe(
        tap(() => store._setLoading()),
        switchMap(() => httpService.getUsers$()),
        tap({
          next(items) {
            store._setUsers(items);
          },
          error(error) {
            store._setError(error);
          }
        })
      ))
  })),
  withHooks({
    onInit(store) {
      store.loadUsers();
    }
  })
)
