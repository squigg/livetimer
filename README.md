# Live Timer

A small hobby project as part of organising a Hackathon. Used for remotely controlling a countdown timer over
websockets so that it can be started/stopped/paused by an operator, with the output simultaneously displayed
on multiple screens controlled from different sources.

Built with PHP/Laravel providing the back-end API and pushing real-time updates to the front-end built with Angular.

Features include timer control, templated timers, sound/colour effects.

Code works and was successfully used at the Hackathon for controlling timings for final pitch and judges questions, but is not perfect / fully tested etc.

## TODO
- Better error handling for websocket failures
- Better sync of timing in the event of high latency
- Upload of new sound effects
- Library of timers per user, ability to quick switch
- Ability to redirect the client to a different timer
- Ability to share timers publicly whilst maintaining secure admin control

