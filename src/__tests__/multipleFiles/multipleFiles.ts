import { readFileSync, rmdirSync } from 'fs';

import { convertFromDirectory } from '../../index';

const typeOutputDirectory = './src/__tests__/multipleFiles/interfaces';

describe('can files reference interfaces between schema files', () => {
  beforeEach(() => {
    rmdirSync(typeOutputDirectory, { recursive: true });
  });

  test('multipleFiles', async () => {
    const result = await convertFromDirectory({
      schemaDirectory: './src/__tests__/multipleFiles/schemas',
      typeOutputDirectory
    });

    expect(result).toBe(true);

    const oneContent = readFileSync(`${typeOutputDirectory}/One.ts`).toString();

    expect(oneContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { Person } from '.';

export interface Item {
  /**
   * Female Zebra
   */
  femaleZebra?: Zebra;
  /**
   * Male Zebra
   */
  maleZebra?: Zebra;
  name: string;
}

/**
 * A list of People
 */
export type People = Person[];

/**
 * a test schema definition
 */
export interface Test {
  name?: string;
  /**
   * A list of People
   */
  people?: People;
  propertyName1: boolean;
}

export interface Zebra {
  name?: string;
}
`
    );
  });
});
