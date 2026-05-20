# lemonteapot.com

A holding page while the real site gets built.

## What is this place

It started as a placeholder. Then I added a fireplace. Then some creatures on a sofa. Then a clock that shows real time. It got away from me a bit.

There's a room. Three small fluffy things huddle under a blanket. Rain on the window. Pine trees outside. Something warm in a cup on the side table. It's cosy in a way that probably took longer to build than it should have.

## The music

Four piano pieces, all made with Suno.ai. No copyright — take them, use them, do whatever.

| Track | Download |
|-------|----------|
| Cloud Veil I | [cloud-veil-1.mp3](https://github.com/lemon-teapot/home/raw/main/cloud-veil-1.mp3) |
| Cloud Veil II | [cloud-veil-2.mp3](https://github.com/lemon-teapot/home/raw/main/cloud-veil-2.mp3) |
| Rain on Glass I | [rain-on-glass-1.mp3](https://github.com/lemon-teapot/home/raw/main/rain-on-glass-1.mp3) |
| Rain on Glass II | [rain-on-glass-2.mp3](https://github.com/lemon-teapot/home/raw/main/rain-on-glass-2.mp3) |
| Soft Pedal Drift I | [soft-pedal-drift-1.mp3](https://github.com/lemon-teapot/home/raw/main/soft-pedal-drift-1.mp3) |
| Soft Pedal Drift II | [soft-pedal-drift-2.mp3](https://github.com/lemon-teapot/home/raw/main/soft-pedal-drift-2.mp3) |

The rain is from a free sound library.

## Curtain and sound

Click the window or the curtain to open it. Rain fades in over the piano. Click again and it closes. Piano only.

The button at the top right mutes everything. The LED display on the bookshelf scrolls the current track name, your city and temperature if you allow location, and today's date. The little skip arrows jump to the next track. The clock above the fireplace is real — it reads your local time.

## How it's built

One HTML file. No framework, no build tools, nothing installed. The scene is inline SVG. Audio uses the Web Audio API with regular HTML audio elements. The MP3s live in the same folder as the page.

Claude (Anthropic) built it. All of it. The source is there if you want to read through it.

## Hosted and open

GitHub Pages at [lemon-teapot/home](https://github.com/lemon-teapot/home), served through Cloudflare. No analytics, no cookies, nothing tracked.

## Credits

Made by bunbun.
