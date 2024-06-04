import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({
      status: "success",
      message: "Api server working fine."
    });
  }
}
