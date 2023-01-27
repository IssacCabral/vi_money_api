import { IHash } from 'src/data/protocols/hash';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHashAdapter implements IHash {
  async generateHash(value: string): Promise<string> {
    return await bcrypt.hash(value, 12);
  }
  compareHash(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
