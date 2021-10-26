import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getTest(): string {
    return 'GET is working fine!';
  }

  postTest(): string {
    return 'POST is working fine';
  }

  putTest(): string {
    return 'PUT is working fine';
  }

  deleteTest(): string {
    return 'DELETE is working fine';
  }
}
