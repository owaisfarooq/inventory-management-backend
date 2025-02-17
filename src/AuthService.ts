import jwt, { SignOptions } from 'jsonwebtoken';
import ms, { StringValue } from 'ms';

class AuthService {
  private static JWT_SECRET: string = process.env['JWT_SECRET'] || 'your_secret_key';
  private static JWT_EXPIRES_IN: StringValue = '1D';

  /**
   * Generates a JWT token
   * @param userId - ID of the authenticated user
   * @returns JWT token as a string
   */
  static generateToken(userId: string): string {
    const expiresInValue = ms(AuthService.JWT_EXPIRES_IN);

    if (!expiresInValue) {
      throw new Error('Invalid JWT_EXPIRES_IN format. Use "1h", "30m", "15s", etc.');
    }

    const options: SignOptions = {
      expiresIn: expiresInValue,
      algorithm: 'HS256'
    };

    return jwt.sign({ userId }, this.JWT_SECRET as jwt.Secret, options);
  }
}

export default AuthService;
