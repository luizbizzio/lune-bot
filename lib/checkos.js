const { platform } = require('node:process');
const checkOs = platform.toString();

const isOs = (osI) => {
  return checkOs.toLowerCase() === osI.toLowerCase();
};

const threatOsName = () => {
  return checkOs.toString()
    .replace('win32', 'Windows');
    .replace('aix', 'Advanced Interactive eXecutive');
    .replace('darwin', 'MacOS');
    .replace('freebsd', 'FreeBSD')
    .replace('linux', 'Linux')
    .replace('openbsd', 'OpenBSD')
    .replace('sunos', 'SunOS');
}

module.exports = {
  isOs,
  threatOsName
};
