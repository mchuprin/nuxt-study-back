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

module.exports.deleteFiles = async (req: any, res: any) => {
  const { files } = req.query;
  try {
    await Promise.all(files.split(',').forEach((file: any) => {
      new Promise((resolve) => {
        resolve(fs.unlink(`./public/${file.replace(`http://${process.env.url}/`, '')}`, ((err: any) => Error(err))));
      })
    }))
    res.send('Deleted').status(204)
  } catch (e) {
    res.send('Server error').status(500)
  }
}

module.exports.saveFiles = async (req: any, res: any) => {
  const { files } = req;
  const result: string[] = [];
  await Promise.all([Object.values(files).forEach((file: any) => {
    new Promise((resolve) => {
      const imageName = `${ uid() }${ path.extname(file.name) }`;
      result.push(`http://${process.env.url}/${ imageName }`);
      resolve(fs.appendFile(`./public/${ imageName }`, file.data, ((err: any) => Error(err))))
    })
  })])
  res.send(result)
}
