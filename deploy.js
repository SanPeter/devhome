const dotenv = require('dotenv');
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const result = dotenv.config();

const config = {
  user: process.env.FTP_USER,
  // Password optional, prompted if none given
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: __dirname + '/public',
  remoteRoot: '/',
  include: ['*', '**/*'], // this would upload everything except dot files
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: ['assets/**'],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log('finished:', res))
  .catch((err) => console.log(err));
