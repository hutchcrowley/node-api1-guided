// example to create 100 text files into a certain directory

const fs = require('fs')

const dir = 'my-files'
// this will make a new directory on the local file system
fs.mkdirSync(dir)

for (let i = 1; i <= 100; i++) {
  // create a new file for every iteration of the loop
  fs.writeFileSync(`${dir}/${i}.txt`, `Hello from ${i}`)
}
