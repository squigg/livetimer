# Live Timer

A small hobby project as part of organising a Hackathon. Used for remotely controlling a countdown timer over
websockets so that it can be started/stopped/paused by an operator, with the output simultaneously displayed
on multiple screens controlled from different sources.

Built with PHP/Laravel providing the back-end API and pushing real-time updates to the front-end built with Angular.

Features include timer control, templated timers, sound/colour effects.

It communicates via JSON API to the front-end, a custom API to the phone app, and uses Pusher service
for mobile phone notifications.

Code works and is used for my home video surveillance (watching cats), but is not perfect / fully tested etc.

## TODO
- Better error handling for websocket failures
- Better sync of timing in the event of high latency
- Upload of new sound effects
- Library of timers per user, ability to quick switch
- Ability to redirect the client to a different timer
- Ability to share timers publicly whilst maintaining secure admin control

