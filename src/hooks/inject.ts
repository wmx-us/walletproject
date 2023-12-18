import { FC, memo } from 'react';
import { inject, observer } from 'mobx-react';
import { GlobalStore as _GlobalStore } from '../store';

type GlobalStore = _GlobalStore;

type PickGlobalStore<K extends keyof GlobalStore> = Pick<GlobalStore, K>;

type ExtendInterface<P> = {
    [K in keyof P]: P[K];
};

export function useInject(): <P>(props: FC<P>) => FC<P>;

export function useInject<K extends keyof GlobalStore>(
    args: K[],
    useMemo?: boolean,
): <P>(props: FC<ExtendInterface<P> & PickGlobalStore<K>>) => FC<P>;

export function useInject<K extends keyof GlobalStore>(
    args?: K[],
    useMemo?: boolean,
): <P>(props: FC<ExtendInterface<P> & PickGlobalStore<K>>) => FC<P> {
    return (comp) => {
        let c;
        if (args && args.length) {
            c = inject(...args)(observer(comp));
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            c = comp as any;
        }
        return useMemo ? memo(c) : c;
    };
}