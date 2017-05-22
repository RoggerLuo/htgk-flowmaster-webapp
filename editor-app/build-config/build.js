var webpack = require('webpack')
var webpackConfig = require('./webpack.build.config.js')
var exec = require('child_process').exec;

webpack(webpackConfig, function(err, stats) {

    if (err) throw err

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')

    exec('gulp', function(err, stdout, stderr) {
        if (!err) {
            console.log('gulp info:')
            console.log(stdout)
            // console.log('stderr: ' + stderr)
        }
        if (err)
            console.log(err)
    })
})
