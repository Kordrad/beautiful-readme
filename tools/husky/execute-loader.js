'use strict'

const ora = require('ora')
const exec = require('child_process').exec
const cliSpinners = require('cli-spinners')
const args = process.argv.slice(2).reduce((prev, acc) => {
  const [command, value] = acc.split('=')
  return { ...prev, [command]: value }
}, {})

class Execute {
  name = ''
  _spinner

  constructor(name) {
    this.name = name
    this._spinner = ora(name)
    this._spinner.spinner = cliSpinners.dots
  }

  run(command) {
    this._spinner.start()

    exec(
      command,
      { stdio: 'inherit', env: { FORCE_COLOR: true } },
      (err, output) => {
        if (err) {
          this._spinner.fail(`${this.name}`)
          throw output
        }

        this._spinner.succeed(this.name)
      },
    )
  }
}

const execute = new Execute(args.command)
execute.run(args.run)
