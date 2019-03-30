const fs = require('fs');
const path = require('path');

/* const fullFileName = path.resolve(__dirname, 'files', 'a.json')
fs.readFile(fullFileName, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data.toString())
  // console.log(JSON.parse(data.toString()))
}) */

/* function getFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  fs.readFile(fullFileName, (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    callback(
      JSON.parse(data.toString())
    )
  })
}
// callback-hell
getFileContent('a.json', aData => {
  console.log('aaa', aData)
  getFileContent(aData.next, bData => {
    console.log('bbb', bData)
    getFileContent(bData.next, cData => {
      console.log('ccc', cData)
    })
  })
}); */


function getFileContent(fileName) {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(
        JSON.parse(data.toString())
      )
    })
  })
}
/* getFileContent('a.json').then(aData => {
  console.log(aData)
  return getFileContent(aData.next)
}).then(bData => {
  console.log(bData)
}) */
async function readFileData() {
  try {
    let aData = await getFileContent('a.json')
    console.log('a data', aData)
    let bData = await getFileContent(aData.next)
    console.log('b data', bData)
    let cData = await getFileContent(bData.next)
    console.log('c data', cData)
  } catch(err) {
    console.error(err)
  }
}
readFileData();



/* const getRepoData  = (fileName) => {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(
        JSON.parse(data.toString())
      )
    })
  })
}
async function getFileContent() {
  const value = await getRepoData('a.json')
  return value
}
getFileContent().then(aData => {
  console.log(aData)
  return getRepoData(aData.next)
}).then(bData => {
  console.log(bData)
}) */


console.log('----------------------------')