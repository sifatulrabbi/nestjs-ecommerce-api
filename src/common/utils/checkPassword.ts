import * as bcrypt from 'bcrypt';

export const checkPassword = async (
  password: string,
  encryptedHash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, encryptedHash);
  } catch (err) {
    console.log('unable to complete password check in auth service', err);
    process.exit(1);
  }
};
