import { Ord, Ordering } from './ord';

export const map = <A, B>(f: (elem: A, index: number, target: Array<A>) => B) => (list: Array<A>) => (
  list.map(f)
);

export const sort = <A>(ord: Ord<A>) => (list: Array<A>): Array<A> => {
  return list.sort((x, y) => {
    const comparison = ord.compare(x, y);
    return comparison === Ordering.less ?
      -1 : comparison === Ordering.greater ? 1 : 0
  });
}