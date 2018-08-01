const BaseModel = require('./BaseModel')

class DevConsole extends BaseModel {
  constructor (props, opts) {
    super(props, opts)

    if (typeof window !== 'undefined') {
      if (!window.hasOwnProperty('help')) {
        Object.defineProperty(window, 'help', {
          get: () => {
            this.showHelp()
          }
        })
      }

      if (!window.hasOwnProperty('component')) {
        Object.defineProperty(window, 'component', {
          get: () => {
            return this.component.$instance
          }
        })
      }

      if (!window.hasOwnProperty('stage')) {
        Object.defineProperty(window, 'stage', {
          get: () => {
            const $stage = window.document.getElementById('haiku-stage')
            return $stage && $stage.children[0]
          }
        })
      }

      if (!window.hasOwnProperty('exit')) {
        Object.defineProperty(window, 'exit', {
          get: () => {
            if (console.clear) {
              console.clear()
            }

            this.component.project.setInteractionMode(
              0,
              this.component.project.getMetadata(),
              () => {}
            )
          }
        })
      }
    }
  }

  showHelp () {
    console.log([
      `Haiku ${process.env.HAIKU_RELEASE_VERSION} (${process.env.NODE_ENV})`,
      'Usage:',
      '  help - Prints this message',
      '  component - Returns your component (HaikuComponent)',
      '  stage - Returns the stage element (HTMLElement)',
      '  exit - Exit preview'
    ].join('\n'))
  }

  logBanner () {
    if (console.clear) {
      console.clear()
    }

    console.log([
      'Welcome to the Haiku Console! 🤖',
      '',
      'Here we show live info about your Haiku as you preview it. 👩‍💻',
      '',
      'You can use this to…',
      '  - Debug Actions 💡',
      '  - Try out code snippets 🍀',
      '  - Just watch the logs go by 🌇',
      '',
      'Want help? Type \'help\' at the prompt (at the bottom, below) and press enter.',
      '',
      'Have fun! 🏖',
      '',
      '…'
    ].join('\n'))
  }
}

DevConsole.DEFAULT_OPTIONS = {
  required: {
    component: true
  }
}

BaseModel.extend(DevConsole)

module.exports = DevConsole
