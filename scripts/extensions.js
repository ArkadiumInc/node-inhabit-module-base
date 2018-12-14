const path = require('path');
const fs = require('fs');
const { createBlobService } = require('azure-storage');

const blobContainerName = 'extensions';
const typesDir = path.resolve(__dirname, '../types') + '/';

const blob = createBlobService(`DefaultEndpointsProtocol=https;AccountName=inhabitmainlive;AccountKey=tri1gc6aCDZJTyV9JnVat+eKhK94tTZVlpcuT2srOOFvtJ25ZwBAtgxWBN/u9EYHUybnxOJbFdzoRpGtX5JJGw==;EndpointSuffix=core.windows.net`);

const resolver = (fn) => (resolve, reject) => fn((err, result) => err ? reject(err) : resolve(result));

const lsblob = (name) => new Promise(resolver((fn) => blob.listBlobDirectoriesSegmented(name, null, fn)));
const lsblobprefix = (name) => (prefix) => new Promise(resolver((fn) => blob.listBlobDirectoriesSegmentedWithPrefix(name, prefix, null, fn)));
const dlblob = (name) => ({ from, to }) => new Promise(resolver((fn) => blob.getBlobToLocalFile(name, from, to, fn)));

const lens = (prop) => (obj) => obj[prop];
const map = (fn) => (arr) => arr.map(fn);
const all = (fn) => (arr) => Promise.all(map(fn)(arr));
const tail = (arr) => arr[arr.length - 1];

// Accepts strings like "betting/20181213.3/"
const toDTS = (name) => name.replace(/\/.+/, '.d.ts');

const toFiles = (dest) => (name) => ({ from: name + toDTS(name), to: dest + toDTS(name) });

// Sorry ^_^
lsblob(blobContainerName)
    .then(lens('entries'))
    .then(map(lens('name')))
    .then(all(lsblobprefix(blobContainerName)))
    .then(map(lens('entries')))
    .then(map(tail))
    .then(map(lens('name')))
    .then(map(toFiles(typesDir)))
    .then(all(dlblob(blobContainerName)))
    .then(map(lens('name')))
    .then((res) => {
        debugger;
    })
    .catch((err) => console.error(err));

// const withLastEntry = (fn) => (err, { entries }) => handleError(err) || fn(entries[entries.length - 1].name);

// const getLastDir = (fn) => mapEntries(({ name }) =>
//     blobService.listBlobDirectoriesSegmentedWithPrefix(blobContainerName, name, withLastEntry(fn(name))));

// const downloadTyping = (name) => (blobDir) => {
//     const fileName = name.replace('/', '') + '.d.ts';
//     const blobPath = path.join(blobDir, fileName);
//     const localPath = path.join(typesDir, fileName);
//     blobService.getBlobToLocalFile(blobContainerName, blobPath, localPath,  (err, result) => {
//         if (err) console.error(err);
//         console.log(`Downloaded types: ${typesDir + fileName}`)
//     });
// }

// const lsBlob = pify(blobService.listBlobDirectoriesSegmented)
//     .then()

// listDirs(getLastDir(downloadTyping))