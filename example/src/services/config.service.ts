import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  async getAuthConfig() {
    return new Promise<{ model: string; policy: string }>((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          model: 'model.conf',
          policy: 'policy.csv',
        });
      }, 200);
    });
  }
}
