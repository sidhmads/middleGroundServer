import { DbService } from '../../infrastructure/db';
import jwtSimple from 'jwt-simple';
import { encode, verify } from './Hasher';

const secret = '9f3be5394b64d14fe1a1915a37723949';

export class TokenService {
  constructor(private db: DbService) { }

  async readTokenEmail(token: string, type: string): Promise<string> {
    try {
      const email = jwtSimple.decode(token, secret);
      return await this.userExists(email, type) ? email : null;
    } catch {
      return null;
    }
  }

  async createToken(email: string, password: string, type: string): Promise<string | null> {
    return (
      await this.userExists(email, type)
      && await this.verifyPassword(email, password, type)) ? jwtSimple.encode(email, secret) : null;
  }

  private async userExists(email: string, type: string): Promise<boolean> {
    return await this.countActiveUsers(email, type) > 0;
  }

  private async verifyPassword(email: string, password: string, type: string): Promise<boolean> {
    const existingPassword = await this.retrievePassword(email, type);
    const parts = existingPassword.split('$');
    const iterations = parseInt(parts[1]);
    const salt = parts[2];
    const hashedPassword = encode(password, iterations, salt);

    return hashedPassword === existingPassword;
  }

  private async countActiveUsers(email: string, type: string): Promise<number> {
    const result = await this.db.query(
      `SELECT count(1) as count FROM ${type} WHERE email = $1 AND is_active = $2`, [email, 't']);
    return result['rows'][0]['count'];
  }

  private async retrievePassword(email: string, type: string): Promise<string> {
    const result = await this.db.query(
      `SELECT password as password FROM ${type} WHERE email = $1 AND is_active = $2`, [email, 't']);
    return result['rows'][0]['password'];
  }
}
