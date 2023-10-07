import 'reflect-metadata';
import { MetadataKey } from './MetadataKey';
export function bodyValidator(...fields: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKey.validator, fields, target, key);
  };
}
