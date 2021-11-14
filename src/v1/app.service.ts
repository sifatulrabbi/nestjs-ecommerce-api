import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as md from 'markdown-it';

@Injectable()
export class AppService {
  async getHello(res: Response): Promise<void> {
    const path = __dirname + '/../../README.md';

    fs.readFile(path, 'utf-8', (err: NodeJS.ErrnoException, data: string) => {
      if (err) {
        console.log(err);
      }
      const marked = new md();
      const html = marked.render(data.toString());
      res.send(html);
    });
  }
}
