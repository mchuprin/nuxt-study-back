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

module.exports.saveFiles = (req: any, res: any) => {
  const { files } = req;
  Object.values(files).forEach((file: any) => {
    fs.appendFile(`./public/${uid()}${path.extname(file.name)}`, file.data, ((err: any) => Error(err)))
  })
  new Promise((resolve) => {
    fs.readdir('public', (err: any, files: any): any => {
      resolve(files.map((file: any) => `http://${process.env.url}/${file}`))
    })
  }).then((value: any) => res.send(value))
}
