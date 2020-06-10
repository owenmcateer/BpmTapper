
/**
 * BPM Tapper
 *
 * A simple module to find music's BPM by tapping along.
 *
 * Usage:
 * Create a new instance with your animations FPS
 * and an optional starting BPM.
 * `const bpm = new BpmTapper(fps, 120);`
 * Now click the mouse or press "t" to time BPM.
 *
 * Methods:
 * // Returns the current BPM.
 * `bpm.getBpm()`
 *
 * // Returns how many frames per-beat.
 * `bpm.getBpmFps()`
 *
 * // Transistion speed is 1/2 of BPM tick.
 * `bpm.getSpeed()`
 *
 * // A BPM start offset for syncing animations.
 * `bpm.getBpmOffset()`
 */
class BpmTapper {
  /**
   * BPM Tapper
   * @param {int} framerate Your animations framerate
   * @param {int} bpm Optional default bpm
   */
  constructor(framerate, bpm = 0) {
    this.frameRate = framerate;
    this.bpm = bpm;
    this.bpmOffset = 0;

    this.tapCount = 0;
    this.tapMsFirst = 0;
    this.tapMsPrevious = 0;

    this.paused = false;
    this.pausedBpm = this.bpm;

    // Events
    document.addEventListener('mousedown', () => { this.tap(); });
    document.addEventListener('keydown', (e) => { this.handleKeyDown(e); });
  }

  /**
   * Handle Key Down event.
   * t = tap
   * [space] = pause/play
   *
   * @param {KeyboardEvent} e Keyboard press
   */
  handleKeyDown(e) {
    // "T"
    if (e.keyCode === 84) {
      this.tap();
    }
    // [space]
    else if (e.keyCode === 32) {
      if (this.paused) {
        // Unpause
        this.bpm = this.pausedBpm;
        this.bpmOffset = frameCount;
        this.paused = false;
      }
      else {
        // Pause
        this.pausedBpm = this.bpm;
        this.bpm = 0;
        this.paused = true;
      }
    }
  }

  /**
   * Speed
   *
   * @return {int} Transistion speed is 1/2 of BPM tick.
   */
  getSpeed() {
    return (HALF_PI / this.getBpmFps()) * 2;
  }

  /**
   * Return the current BPM
   *
   * @return {int} Current BPM.
   */
  getBpm() {
    return this.bpm;
  }

  /**
   * Return BPM FPS.
   *
   * @return {int} Returns how many frames per-beat.
   */
  getBpmFps() {
    return round((this.frameRate * 60) / this.bpm);
  }

  /**
   * Return BPM offset frames
   *
   * A BPM start offset for syncing animations.
   *
   * @return {int} Offset frames
   */
  getBpmOffset() {
    return this.bpmOffset;
  }

  /**
   * Handle tap event
   *
   * Record taps and calculate BPM tempo.
   * There is a 1 second reset timeout.
   */
  tap() {
    const timestamp = new Date();
    const ms = timestamp.getTime();

    // Reset counter?
    if ((ms - this.tapMsPrevious) > 1000) {
      this.tapCount = 0;
      this.bpmOffset = frameCount;
    }

    // First tap?
    if (this.tapCount === 0) {
      this.tapCount = 1;
      this.tapMsFirst = ms;
      this.bpm = 0;
    }
    else {
      const bpmAvg = (60000 * this.tapCount) / (ms - this.tapMsFirst);
      this.tapCount++;
      this.bpm = round(bpmAvg);
    }
    this.tapMsPrevious = ms;
  }
}
