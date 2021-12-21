import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map, tap } from 'rxjs';
import parser, { Received } from './util/parser';

type OffsetParam = string | undefined;

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  private fetchFCD(account: string, offset: OffsetParam) {
    return this.httpService
      .get<Received>('txs', {
        params: { account, offset },
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
        map((d) => d.data),
      );
  }

  getAccountTxHistory(account: string, offset: OffsetParam) {
    return this.fetchFCD(account, offset).pipe(map(parser));
  }
}
