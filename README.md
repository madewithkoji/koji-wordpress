## Local Wordpress

I recommend https://localwp.com/

## Plugin Development

### How to set things up

1. Clone the repository
2. Create a symlink of the project into Wordpress's plugins directory (/wp-content/plugins)
3. Install libs (npm install)
4. Build the files (npm run build)

### Useful commands

`npm run start:editor` - for editor development <br />
`npm run start:frontend` - for frontend script development <br />
`npm run build` - to build all the production scripts

### How to create a release

1. update version in `./index.php`
2. run `npm run build`
3. zip everything except `node_modules`
