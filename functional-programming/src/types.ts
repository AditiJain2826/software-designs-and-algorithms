import { Maybe } from './fp/maybe';

export interface Point {
  x: number;
  y: number;
}

export interface User {
  name: string;
  position: Point;
}

export enum Demand {
  Driving = 'Driving',
  Fighting = 'Fighting',
  Fishing = 'Fishing'
}

export interface ClientUser extends User {
  // demands: Maybe<Array<Demand>>;
  demands: Maybe<Demand[]>; // Update the type here
  reward: number;
}

export interface ExecutorUser extends User {
  possibilities: Array<Demand>;
}

