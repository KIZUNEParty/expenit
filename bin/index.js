#! /usr/bin/env node

const { exec } = require("child_process")
const fs = require("fs")
const http = require("https")

require("yargonaut")
  .style('blue')
  .style('yellow', 'required')
  .help('Cybermedium')
  .helpStyle('green')
  .errorsStyle('red.bold.underline')

let opt = require("yargs")
  .usage(
    "Just a solution for your EXPRESS Project :D"
  )

  .command('run', 'setting up EXPRESS Project')

  .option('n', {
    alias: 'name',
    describe: 'setting up ur project name',
    demand: true
  })

  .option('j', {
    alias: 'jade',
    describe: "want jade? just add '-j 1'",
    choices: [0, 1],
    default: 0
  })

  .example('$0 run -n untitled-project', "Created 'expressjs' project named [untitled-project]")
  .example('$0 run -n untitled-project -j 1', "Created 'jade + expressjs' project named [untitled-project]")

  .wrap(null)
  .showHelpOnFail(true)
  .strict()

  .argv


let name = `${opt.n}`
let jade = `${opt.j}`

console.log('');
console.log('\x1b[36m' ,'yarn Checking~')
console.log('');

exec('yarn --version', (error, stdout) => {
  if(error) {
    console.log('\x1b[31m', 'yarn not found')
    console.log('\x1b[0m', "please install 'yarn' first!")
  }

  if(stdout) {
    console.log('\x1b[32m', 'yarn Ready!')
    console.log('')
    console.log('\x1b[36m', 'Creating project~')
    console.log('\x1b[0m', "Tooltips: if it's struck, just 'CTRL+C' or using anything that can used to stop this process")
    console.log('')
    console.log('')

    function finished() {
      console.log('');
      console.log('\x1b[36m', "now this project is finished, so it's your coding time :D");
      console.log('\x1b[36m', `now just run : `);
      console.log('');
      console.log('\x1b[36m', `      cd ${name}`);
      console.log('\x1b[36m', `      yarn`);
      console.log('\x1b[36m', `      yarn dev`);
      console.log('');
    }

    if(fs.existsSync(`./${name}`)) {
      console.log('Folder is already exist :(');
    } else {
      fs.mkdirSync(`./${name}`)

      if(jade == 1) {
        function package() {
          let package = {
              "name": `${name}`,
              "version": "1.0.0",
              "description": "",
              "main": "app.js",
              "scripts": {
                "dev": "nodemon app.js",
              },
              "keywords": [],
              "author": "deth's",
              "license": "MIT",
              "dependencies": {
                "express": "^4.17.2",
                "jade": "^1.11.0"
              }
            }

          let string = JSON.stringify(package, null, 4)

          fs.writeFile(`./${name}/package.json`, string, 'utf8', function (err) {
            if (err) {
                console.log('\x1b[31m', "failed to created package.json");
                return console.log(err);
            }
          
            console.log('\x1b[32m', "package.json has been created successful!");
            console.log('');
          })
        }

        function appJS() {
          let file = fs.createWriteStream(`./${name}/app.js`)
          let req = http.get('https://raw.githubusercontent.com/kizunai-Template/express-jade-js/main/app.js', function(rsp) {
            rsp.pipe(file)

            file.on("finish", () => {
              file.close()
              console.log('\x1b[32m', 'finished calling app.js')
              console.log('');
            })
          })
        }

        function view() {
          fs.mkdirSync(`./${name}/views`)

          let file = fs.createWriteStream(`./${name}/views/index.jade`)
          let req = http.get('https://raw.githubusercontent.com/kizunai-Template/express-jade-js/main/views/index.jade', function(rsp) {
            rsp.pipe(file)

            file.on("finish", () => {
              file.close()
              console.log('\x1b[32m', 'finished calling views folder')
              console.log('');
              finished()
            })
          })
        }    

        package()
        appJS()
        view()

      } else {
        function package() {
          let package = {
              "name": `${name}`,
              "version": "1.0.0",
              "description": "",
              "main": "app.js",
              "scripts": {
                "dev": "nodemon app.js",
              },
              "keywords": [],
              "author": "deth's",
              "license": "MIT",
              "dependencies": {
                "express": "^4.17.2"
              }
            }

          let string = JSON.stringify(package, null, 4)

          fs.writeFile(`./${name}/package.json`, string, 'utf8', function (err) {
            if (err) {
                console.log('\x1b[31m', "failed to created package.json");
                return console.log(err);
            }
          
            console.log('\x1b[32m', "package.json has been created successful!");
            console.log('');
          })
        }

        async function appJS() {
          let file = fs.createWriteStream(`./${name}/app.js`)
          let req = http.get('https://raw.githubusercontent.com/kizunai-Template/express-js-starter/main/server.js', function(rsp) {
            rsp.pipe(file)

            file.on("finish", () => {
              file.close()
              console.log('\x1b[32m', 'finished calling app.js')
              console.log('');
              finished()
            })
          })
        }

        package()
        appJS()
      }
    }

    

    
  }
})