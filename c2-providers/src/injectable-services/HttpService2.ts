import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService2<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
