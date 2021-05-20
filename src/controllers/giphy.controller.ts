import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Giphy} from '../models';
import {GiphyRepository} from '../repositories';

export class GiphyController {
  constructor(
    @repository(GiphyRepository)
    public giphyRepository : GiphyRepository,
  ) {}

  @post('/giphies')
  @response(200, {
    description: 'Giphy model instance',
    content: {'application/json': {schema: getModelSchemaRef(Giphy)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Giphy, {
            title: 'NewGiphy',
            exclude: ['id'],
          }),
        },
      },
    })
    giphy: Omit<Giphy, 'id'>,
  ): Promise<Giphy> {
    return this.giphyRepository.create(giphy);
  }

  @get('/giphies/count')
  @response(200, {
    description: 'Giphy model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Giphy) where?: Where<Giphy>,
  ): Promise<Count> {
    return this.giphyRepository.count(where);
  }

  @get('/giphies')
  @response(200, {
    description: 'Array of Giphy model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Giphy, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Giphy) filter?: Filter<Giphy>,
  ): Promise<Giphy[]> {
    return this.giphyRepository.find(filter);
  }

  @patch('/giphies')
  @response(200, {
    description: 'Giphy PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Giphy, {partial: true}),
        },
      },
    })
    giphy: Giphy,
    @param.where(Giphy) where?: Where<Giphy>,
  ): Promise<Count> {
    return this.giphyRepository.updateAll(giphy, where);
  }

  @get('/giphies/{id}')
  @response(200, {
    description: 'Giphy model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Giphy, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Giphy, {exclude: 'where'}) filter?: FilterExcludingWhere<Giphy>
  ): Promise<Giphy> {
    return this.giphyRepository.findById(id, filter);
  }

  @patch('/giphies/{id}')
  @response(204, {
    description: 'Giphy PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Giphy, {partial: true}),
        },
      },
    })
    giphy: Giphy,
  ): Promise<void> {
    await this.giphyRepository.updateById(id, giphy);
  }

  @put('/giphies/{id}')
  @response(204, {
    description: 'Giphy PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() giphy: Giphy,
  ): Promise<void> {
    await this.giphyRepository.replaceById(id, giphy);
  }

  @del('/giphies/{id}')
  @response(204, {
    description: 'Giphy DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.giphyRepository.deleteById(id);
  }
}
