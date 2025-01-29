import { inject, Injector } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Observable, tap } from 'rxjs';

interface ApiState<T> {
  data: T;
  isLoading: boolean;
  error: unknown | null;
}

const createInitialState = <T>(defaultData: T): ApiState<T> => ({
  data: defaultData,
  isLoading: false,
  error: null,
});

export function createApiStore<T, P = void>(
  loader: (params: P, injector: Injector) => Observable<T>,
  defaultData: T
) {
  return signalStore(
    { providedIn: 'root' },
    withState(createInitialState(defaultData)),
    withMethods((store) => {
      const injector = inject(Injector);

      return {
        load(params: P): Observable<T> {
          patchState(store, { isLoading: true, error: null });

          return loader(params, injector).pipe(
            tap({
              next: (data) => patchState(store, { data, isLoading: false }),
              error: (error) => patchState(store, { error, isLoading: false }),
            })
          );
        },
      };
    })
  );
}
