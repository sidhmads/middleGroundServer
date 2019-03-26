import crypto from 'crypto';

const algorithm = 'pbkdf2_sha256';
const len = 32;

function encode(password: string, iterations: number= 1, salt: string= ''): string {
  const key = crypto.pbkdf2Sync(password, salt, iterations, len, 'sha256');
  const hashedPassword = algorithm + '$' + iterations + '$' + salt + '$' + key.toString('base64');
  return hashedPassword;
}

function verify(password: string, hashPassword: string): boolean {
  if (!hashPassword) {
    return(false);
  }
  const parts = hashPassword.split('$');
  if (parts.length !== 4) {
    return(false);
  }

  const iterations = parseInt(parts[1]);
  const salt = parts[2];
  const value = parts[3];
  const key = crypto.pbkdf2Sync(password, salt, iterations, len, 'sha256');

  return (key.toString('base64') === value);
}

export {
  encode,
  verify,
};
