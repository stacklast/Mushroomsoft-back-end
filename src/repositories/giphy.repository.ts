import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Giphy, GiphyRelations} from '../models';

export class GiphyRepository extends DefaultCrudRepository<
  Giphy,
  typeof Giphy.prototype.id,
  GiphyRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Giphy, dataSource);
  }
}
