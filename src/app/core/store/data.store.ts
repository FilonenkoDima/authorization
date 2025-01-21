import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, of, switchMap, tap } from 'rxjs';

interface ApiState<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
}

const createInitialState = <T>(defaultData: T): ApiState<T> => ({
  data: defaultData,
  isLoading: false,
  error: null,
});

export function createApiStore<T, P>(
  fetchData: (params: P) => Observable<T>,
  defaultData: T
) {
  const initialState = createInitialState(defaultData);

  return signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
      _setLoading() {
        patchState(store, () => ({ isLoading: true, error: null, data: defaultData }));
      },
      _setError(error: Error) {
        patchState(store, () => ({ error, isLoading: false, data: defaultData }));
      },
      _setData(data: T) {
        patchState(store, () => ({ data, isLoading: false, error: null }));
      },
    })),
    withMethods((store) => ({
      loadData: rxMethod((params$: Observable<P>) =>
        params$.pipe(
          tap(() => store._setLoading()),
          switchMap((params) => fetchData(params)),
          tap({
            next: (result) => store._setData(result),
            error: (err) => {
              console.error('Error occurred:', err);
              store._setError(err);
            }
          })
        )
      ),
    })),
    withHooks({
      onInit(store) {
        store.loadData(of({} as P));
      },
    })
  );
}
