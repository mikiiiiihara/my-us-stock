import * as util from 'util';
import { exec } from 'child_process';

const execPromisify = util.promisify(exec);

// DBのマイグレーションリセットを実行します
export const migrateResetTest = async () => {
  await execPromisify('npx prisma migrate reset --force');
};
