const fs = require( 'fs' )
const HyperExpress = require( 'hyper-express' )
const LiveDirectory = require( 'live-directory' )
const ejs = require( 'ejs' )
const server = new HyperExpress.Server()

const Public = new LiveDirectory( 'public', {
  filter: {
    keep: { extensions: [ 'css', 'js', 'json', 'png', 'jpg', 'jpeg' ] },
    ignore: ( path ) => { return path.startsWith( '.' ) },
  },

  cache: {
    max_file_count: 250, // Files will only be cached up to 250 MB of memory usage
    max_file_size: 1024 * 1024, // All files under 1 MB will be cached
  },
} )

server.get( '/*', ( request, response ) => {
  const path = request.path.replace( '/public', '' )
  const file = Public.get( path )
  if ( file === undefined ) return response.status( 404 ).send( "404 - File not found" )

  const fileParts = file.path.split( "." )
  const extension = fileParts[ fileParts.length - 1 ]

  const content = file.content
  if ( content instanceof Buffer ) {
    return response.type( extension ).send( content )
  } else {
    return response.type( extension ).stream( content )
  }
} )

server.get( '/plain', ( request, response ) => {
  response.send( 'Responds with text/plain' ) // Respond with a plain string
} )

server.get( '/html', ( request, response ) => {
  response.html( request.path ) // Respond with an HTML doc-type
} )

server.get( '/html-with-tag', ( request, response ) => {
  response.html( `<h1>${ request.path }<h1>` ) // Respond with an HTML doc-type and h1 tag
} )

server.get( '/html-from-file', ( request, response ) => {
  response.html( fs.readFileSync( './from-file.html' ) )
} )

server.get( '/html-from-template', ( request, response ) => {
  let people = [ 'geddy', 'neil', 'alex', 'nicolas' ]
  let html = ejs.render( '<%= people.join(", "); %>', { people: people } )
  response.html( html, { people } )
} )

server.get( '/html-from-template-file', ( request, response ) => {
  let people = [ 'geddy', 'neil', 'alex', 'nicolas' ]
  response.html( ejs.render( fs.readFileSync( './from-template-file.ejs' ).toString(), { people: people } ) )
} )


server.get( '/json', ( request, response ) => {
  response.json( { json: true } ) // Respond with a JSON object
} )

server.listen( 3000 )
  .then( ( socket ) => console.log( 'Webserver started on port 3000' ) )
  .catch( ( error ) => console.log( 'Failed to start webserver on port 3000' ) )
