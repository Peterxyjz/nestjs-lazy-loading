import { LazyModuleLoader } from '@nestjs/core';

/**
 * Helper function to lazy-load a module and get a service from it
 * @param lazyModuleLoader The LazyModuleLoader instance
 * @param modulePath Path to the module
 * @param servicePath Path to the service
 * @param moduleName Name of the module class
 * @param serviceName Name of the service class
 * @returns The service instance
 */
export async function lazyLoadService<T>(
  lazyModuleLoader: LazyModuleLoader,
  modulePath: string,
  servicePath: string,
  moduleName: string,
  serviceName: string,
): Promise<T> {
  const moduleImport = await import(modulePath);
  const moduleClass = moduleImport[moduleName];

  const moduleRef = await lazyModuleLoader.load(() => moduleClass);
  
  const serviceImport = await import(servicePath);
  const serviceClass = serviceImport[serviceName];
  
  return moduleRef.get(serviceClass);
}
