import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    // ルートディレクトリからの相対パスでversion.jsonのパスを組み立てる
    const versionFilePath = path.join(__dirname, '..', 'version.json');

    // ファイルの存在を確認
    if (!fs.existsSync(versionFilePath)) {
      console.log('fileないよん');
      return 'Hello World!';
    }

    try {
      const versionInfo = fs.readFileSync(versionFilePath, 'utf8');
      console.log(JSON.parse(versionInfo));
      return JSON.parse(versionInfo);
    } catch (error) {
      // ファイルの読み込み中にエラーが発生した場合
      return 'Hello World!';
    }
  }
}
