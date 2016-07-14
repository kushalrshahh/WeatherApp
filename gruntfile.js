'use strict';

var fs = require('fs');

module.exports = function (grunt) {
    // Unified Watch Object
    var watchFiles = {
            serverViews: ['app/views/**/*.*'],
            serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', '!app/tests/'],
            clientViews: ['public/modules/**/views/**/*.html'],
            clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
            clientCSS: ['public/styles/*.less', 'public/modules/**/*.css', 'public/modules/**/*.less'],
            mochaTests: []//['app/tests/**/*.js']
        };

    // Project Configuration
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            watch: {
                serverViews: {
                    files: watchFiles.serverViews
                },
                serverJS: {
                    files: watchFiles.serverJS,
                    tasks: ['jshint']
                          },
                clientViews: {
                    files: watchFiles.clientViews
                },
                clientJS: {
                    files: watchFiles.clientJS,
                    tasks: ['jshint']

                },
                clientCSS: {
                    files: watchFiles.clientCSS,
                    tasks: ['less']
                }
            },
            jshint: {
                all: {
                    src: watchFiles.clientJS.concat(watchFiles.serverJS),
                    options: {
                        jshintrc: true
                    }
                }
            },
            csslint: {
                options: {
                    csslintrc: '.csslintrc'
                },
                all: {
                    src: ['public/modules/**/*.css']
                }
            },
            less: {
                production: {
                    options: {
                        paths: ['public/styles'],
                        cleancss: true,
                        compress: true,
                        relativeUrls: true
                    },
                    files: {
                        'public/dist/app.min.css': 'public/styles/application.less'
                    }
                },
                development: {
                    options: {
                        sourceMap: true,
                        sourceMapFilename: 'public/application.css.map',
                        sourceMapURL: 'application.css.map',
                        sourceMapBasepath:'public',
                        sourceMapRootpath: '/',
                        ieCompat: true,
                        dumpLineNumbers: true,
                        relativeUrls: true
                    },
                    files: {
                        'public/app.min.css': 'public/styles/application.less'
                    }
                }
            },
            nodemon: {
                dev: {
                    script: 'server.js',
                    options: {
                        nodeArgs: ['--debug'],
                        ext: 'js,html',
                        watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                    }
                }
            }/*,
            'node-inspector': {
                custom: {
                    options: {
                        'web-port': 1337,
                        'web-host': 'localhost',
                        'debug-port': 5858,
                        'save-live-edit': true,
                        'no-preload': true,
                        'stack-trace-limit': 50,
                        'hidden': []
                    }
                }
            },
            ngAnnotate: {
                production: {
                    files: {
                        'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
                    }
                }
            },
            concurrent: {
                default: ['nodemon', 'watch'],
                debug: ['nodemon', 'watch', 'node-inspector'],
                options: {
                    logConcurrentOutput: true,
                    limit: 10
                }
            },
            env: {
                test: {
                    NODE_ENV: 'test'
                },
                secure: {
                    NODE_ENV: 'secure'
                }
            },
            mochaTest: {
                src: watchFiles.mochaTests,
                options: {
                    reporter: 'spec',
                    require: 'server.js'
                }
            },
            karma: {
                unit: {
                    configFile: 'karma.conf.js'
                }
            }*/
        }
    );

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // A Task for loading the configuration object
    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function () {
        var init = require('./config/init')();
        var config = require('./config/config');

        grunt.config.set('applicationJavaScriptFiles', config.assets.js);
        grunt.config.set('applicationCSSFiles', config.assets.css);
    });

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'csslint']);

    // Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);

    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    // Secure task(s).
    grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

    // Build task(s).
    grunt.registerTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'less']);

    // Test task.
    //grunt.registerTask('test', ['env:test', 'mochaTest']);
}
;