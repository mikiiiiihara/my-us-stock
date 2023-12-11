import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    // srcディレクトリ内のversion.jsonのパスを指定
    const versionFilePath = path.join(__dirname, 'version.json');

    if (!fs.existsSync(versionFilePath)) {
      console.log('version.json file not found');
      return 'Hello World!';
    }

    try {
      const versionInfo = fs.readFileSync(versionFilePath, 'utf8');
      return JSON.parse(versionInfo);
    } catch (error) {
      console.error('Error reading version.json:', error);
      return 'Hello World!';
    }
  }
}
