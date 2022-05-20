import { uid } from 'uid';
import { Request, Response } from 'express';
const path = require('path');
const fs = require('fs');

interface IFilesRequest extends Request {
  files?: any;
}

interface IQuery {
  files: string;
}

module.exports.getFiles = async (req: Request, res: Response) => {
    new Promise((resolve) => {
      fs.readdir('public', (err: Error, files: string[]): void => {
        resolve(files.map((file: any) => `http://${process.env.url}/${file}`))
      })
    }).then((value: any) => res.send(value))
}

module.exports.deleteFiles = async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
  const { files } = req.query;
  try {
    await Promise.all(files.split(',').map((file: string) => {
      return new Promise((resolve) => {
        resolve(fs.unlink(`./public/${file.replace(`http://${process.env.url}/`, '')}`, () => {}));
      })
    }))
    res.status(204).send({ msg: 'Deleted' })
  } catch (e) {
    res.status(500).send({ msg: 'Server error' })
  }
}

module.exports.saveFiles = async (req: IFilesRequest, res: Response) => {
  const { files } = req;
  const result: string[] = [];
  await Promise.all([Object.values(files).forEach((file: any) => {
    new Promise((resolve) => {
      const imageName = `${ uid() }${ path.extname(file.name) }`;
      result.push(`http://${process.env.url}/${ imageName }`);
      resolve(fs.appendFile(`./public/${ imageName }`, file.data, () => {}))
    })
  })])
  res.send(result)
}
