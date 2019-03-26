import { DbService } from '../../infrastructure/db';
import jwtSimple from 'jwt-simple';
import { encode, verify } from './Hasher';

const secret = '9f3be5394b64d14fe1a1915a37723949';

export class TokenService {
  constructor(private db: DbService) {}

  async readTokenEmail(token: string): Promise<string> {
    try {
      const email = jwtSimple.decode(token, secret);
      return await this.userExists(email) ? email : null;
    }
    catch {
      return null;
    }
  }

  async createToken(email: string, password: string): Promise<string | null> {
    return (await this.userExists(email) && await this.verifyPassword(email, password)) ? jwtSimple.encode(email, secret) : null;
  }

  private async userExists(email: string): Promise<boolean> {
    return await this.countActiveUsers(email) > 0;
  }

  private async verifyPassword(email: string, password: string): Promise<boolean> {
    const existingPassword = await this.retrievePassword(email);
    const parts = existingPassword.split('$');
    const iterations = parseInt(parts[1]);
    const salt = parts[2];
    const hashedPassword = encode(password, iterations, salt);

    return hashedPassword === existingPassword;
  }

  private async countActiveUsers(email: string): Promise<number> {
    const result = await this.db.query('SELECT count(1) as count FROM users WHERE email = $1 AND is_active = $2', [email, 't']);
    return result['rows'][0]['count'];
  }

  private async retrievePassword(email: string): Promise<string> {
    const result = await this.db.query('SELECT password as password FROM users WHERE email = $1 AND is_active = $2', [email, 't']);
    return result['rows'][0]['password'];
  }
}
