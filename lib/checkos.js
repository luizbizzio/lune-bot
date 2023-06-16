const { platform } = require('node:process');
/*
  OS LIST

  aix
  darwin
  freebsd
  linux
  openbsd
  sunos
  win32
*/

const checkOs = platform.toString();

const isOs = (osI) => {
  return checkOs.toLowerCase() === osI.toLowerCase();
};

const threatOsName = () => {
  return checkOs.toString()
    .replace('win32', 'Windows')
    .replace('aix', 'Advanced Interactive eXecutive')
    .replace('darwin', 'MacOS')
    .replace('freebsd', 'FreeBSD')
    .replace('linux', 'Linux')
    .replace('openbsd', 'OpenBSD')
    .replace('sunos', 'SunOS');
}

module.exports = {
  checkOs,
  isOs,
  threatOsName
};