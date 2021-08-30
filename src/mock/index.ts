import { Challenge } from 'src/challenge/entity/challenge.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

it('just passes', () => {
  expect(true).toBe(true);
});

export const mockedImageHelper = {
  url: 'string',
  thumb128Url: 'string',
};

export const mockedChallenge = {
  id: uuidv4(),
  description: '1asdadad',
  title: 'teste',
} as Challenge;

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    remove: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    createImage: jest.fn((entity) => entity),
    preload: jest.fn((entity) => entity),
    findAndCount: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    findByIds: jest.fn((entity) => entity),
    count: jest.fn((entity) => entity),
  }),
);
