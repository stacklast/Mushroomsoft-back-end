import {Entity, model, property} from '@loopback/repository';

@model()
export class Giphy extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;


  constructor(data?: Partial<Giphy>) {
    super(data);
  }
}

export interface GiphyRelations {
  // describe navigational properties here
}

export type GiphyWithRelations = Giphy & GiphyRelations;
