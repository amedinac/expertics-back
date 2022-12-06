import * as bcryptjs from 'bcryptjs';

async function encrypt(password: string): Promise<string> {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
}

async function compare(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compareSync(password, hash);
}

export { encrypt, compare };
