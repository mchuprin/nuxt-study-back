const fs = require('fs');
const url = 'localhost:4000';

module.exports.getFiles = async (req: any, res: any) => {
    new Promise((resolve) => {
      fs.readdir('public', (err: any, files: any): any => {
        resolve(files.map((file: any) => `http://${url}/${file}`))
      })
    }).then((value: any) => res.send(value))
}

module.exports.saveFiles = (req: any, res: any) => {
  const { files } = req;
}
