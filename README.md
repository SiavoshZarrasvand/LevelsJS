# LevelsJS

A JavaScript template to replicate [Pieter Levels'](https://github.com/levelsio) tech stack in NodeJS

## Background

I've been following Pieter Levels for some time, and I've often felt that the JavaScript ecosystem lacks a tech stack with the simplicity of a vanilla PHP installation, which is how Pieter builds his apps.

It seems that projects in the JavaScript world inevitably trend towards convolution and over-complexity.

This is evident in frameworks and libraries like Angular, SvelteKit, Next.js, and even Express, in my opinion.

After watching Pieter's [video](https://www.youtube.com/watch?v=oFtjKbXKqbg) with Lex Fridman, I decided it is time to build LevelsJS.

## How to Use

1. Clone the repository
2. Run `npm install`
3. Run `npm start`

That's it! To make changes, simply edit the files in the repository. The server will automatically restart when you save a file, but you'll need to manually reload the page to see the changes.

The code is intentionally self-documenting, allowing you to understand its functionality by reading it directly, without the need to sift through extensive documentation.

## AJAX Requests

The only thing that is not self-explanatory is the AJAX request. To make an AJAX request, you can use the `fetch` API, which is built into the browser, but ideally, you should install JQuery (what Pieter uses) or htmx (what I would personally recommend).

## Bonus

As I am using Hyper-Express, which is built on top of uWebSockets.js, this server should totally murder any php servers in existence... ;-)

Happy hacking!

### License

MIT
