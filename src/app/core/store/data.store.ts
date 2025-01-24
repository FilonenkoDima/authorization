import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Observable, of, switchMap, tap } from 'rxjs';

interface ApiState<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
}

const createInitialState = <T>(defaultData?: T): ApiState<T> => ({
  data: defaultData ?? ({} as T),
  isLoading: false,
  error: null,
});

export function createApiStore<T, P = unknown>(
  fetchData: (params: P) => Observable<T>,
  defaultData?: T
) {
  const initialState = createInitialState(defaultData);

  return signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
      _setLoading() {
        patchState(store, () => ({ isLoading: true, error: null, data: defaultData ?? ({} as T) }));
      },
      _setError(error: Error) {
        patchState(store, () => ({ error, isLoading: false, data: defaultData ?? ({} as T) }));
      },
      _setData(data: T) {
        patchState(store, () => ({ data, isLoading: false, error: null }));
      },
    })),
    withMethods((store) => ({
      loadData(input?: P) {
        const params$ = input ? of(input) : of({} as P);
        params$.pipe(
          tap(() => store._setLoading()),
          switchMap((params) => fetchData(params)),
          tap({
            next: (result) => store._setData(result),
            error: (err) => store._setError(err),
          })
        ).subscribe();
      },
    }))
  );
}
