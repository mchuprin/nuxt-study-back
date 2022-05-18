import { uid } from 'uid';
const path = require('path');
const fs = require('fs');

module.exports.getFiles = async (req: any, res: any) => {
    new Promise((resolve) => {
      fs.readdir('public', (err: any, files: any): any => {
        resolve(files.map((file: any) => `http://${process.env.url}/${file}`))
      })
    }).then((value: any) => res.send(value))
}

module.exports.saveFiles = async (req: any, res: any) => {
  const { files } = req;
  const result = [];
  await Promise.all([Object.values(files).forEach((file) => {
    new Promise((resolve) => {
      const imageName = `${ uid() }${ path.extname(file.name) }`;
      result.push(`http://${process.env.url}/${ imageName }`);
      resolve(fs.appendFile(`./public/${ imageName }`, file.data, ((err: any) => Error(err))))
    })
  })])
  res.send(result)
}
