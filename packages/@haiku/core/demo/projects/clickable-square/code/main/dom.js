var creation = require('@haiku/core/dom')
module.exports = creation(require('./code'), {
  onHaikuComponentDidMount: function (instance) {
    // var tl = instance.getDefaultTimeline()
    // tl.on('update', function (frame, time) {
    //   console.log(
    //     frame,
    //     Math.round(time),
    //     tl.getUnboundedFrame(),
    //     Math.round(tl.getElapsedTime()),
    //     tl.isPlaying()
    //   )
    // })
  }
})
