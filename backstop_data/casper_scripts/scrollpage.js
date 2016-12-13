module.exports = function(casper, scenario, vp) {
  // scenario is the current scenario object being run from your backstop config
  // vp is the current viewport object being run from your backstop config


  // Example: Adding script delays to allow for things like CSS transitions to complete.
  casper.echo( 'Close top panel' );
  casper.click( '.learningPanel__close ' );
  casper.echo( 'Scrolling page ' );
  casper.wait( 500 );
  casper.scrollToBottom();
  casper.wait( 500 );

  // ...do other cool stuff here, see Casperjs.org for a full API and many ideas.
}
