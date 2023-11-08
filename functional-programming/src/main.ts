import { Either, fromPromise, ap, right, getOrElse, flatten, left } from './fp/either';
import { pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, ExecutorUser } from './types';
import { some } from './fp/maybe';

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
export const getClients = (): Response<Array<ClientUser>> => (
  fromPromise(fetchClient().then(data => data.map(client => ({
    ...client,
    demands: some(client.demands)
  })))
  ));

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
  const filterByDemands = (client: ClientUser) => {
    return client.demands._tag === 'Some' && client.demands.value ?
      client.demands.value.every(demand => executor.possibilities.includes(demand)) : true;

  };

  const filterClients = clients.filter(filterByDemands);

  const calculateDistance = (client: ClientUser) => {
    const dx = client.position.x - executor.position.x;
    const dy = client.position.y - executor.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const sortByDistance = (a: ClientUser, b: ClientUser) => calculateDistance(a) - calculateDistance(b);
  const sortByReward = (a: ClientUser, b: ClientUser) => b.reward - a.reward;

  const sortedClients = sortBy === SortBy.distance
    ? filterClients.sort(sortByDistance)
    : filterClients.sort(sortByReward);

  const clientsInfo = sortedClients.map(client => `name: ${client.name}, distance: ${calculateDistance(client).toFixed(3)}, reward: ${client.reward}`);

  return filterClients.length === 0 ?
    left(`This executor cannot meet the demands of any client!`) :
    filterClients.length === clients.length ? right(`This executor meets all demands of all clients!`) :
      right(`This executor meets the demands of only ${filterClients.length} out of ${clients.length} clients\n\nAvailable clients sorted by ${sortBy === SortBy.distance ? 'distance to executor' : 'highest reward'}:
${clientsInfo.join('\n')}`);

};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);
