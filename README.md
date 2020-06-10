# BPM Tapper 🥁
A simple module to find music's BPM by tapping along.  
Example: https://owenmcateer.github.io/Motus-Art/projects/week_111.html

## Usage
Inlcude the BpmTapper script:  
`<script src="https://cdn.jsdelivr.net/gh/owenmcateer/BpmTapper/BpmTapper.js"></script>`


Create a new instance; with your animations FPS
and an optional starting BPM.  
`const bpm = new BpmTapper(fps, bpm);`

Now click the mouse or press "t" to time BPM.

### Methods
**getBpm()**  
Returns the current BPM.

**getBpmFps()**  
Returns how many frames per-beat.

**getSpeed()**  
Transistion speed is 1/2 of BPM tick.

**getBpmOffset()**   
A BPM start offset for syncing animations.
