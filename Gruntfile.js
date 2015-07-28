module.exports = function(grunt) {
    var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");

    grunt.initConfig({
        jshint: {
            files: ['client/js/**/*.js', 'server/**/*.js', 'test/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                latedef: true,
                noarg: true,
                trailing: true,
                ignores: ['public/**/*.js']
            },
            client: {
                options: {
                    browser: true,
                    globals: {
                        jQuery: true
                    }
                },
                files: {
                    src: ['client/js/**/*.js']
                }
            },
            server: {
                options: {
                    node: true
                },
                files: {
                src: [
                        'Gruntfile.js',
                        'cluster.js',
                        'server/**/*.js',
                        'test/*.js'
                    ]
                }
            }
        },
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                )
            },
            "build-dev": {
                devtool: "sourcemap",
                debug: true
            }
        },
        sass: {
            options: {
                includePaths: [
                    'node_modules/font-awesome/scss',
                    'node_modules/bootstrap-sass/assets/stylesheets'
                ]
            },
            dest: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    '/tmp/styles.css': 'client/scss/styles.scss'
                }
            }
        },
        concat: {
            css: {
                src: [
                    'client/vendor/css/**/*.css',
                    '/tmp/styles.css'
                ],
                dest: 'public/css/site.css'
            }
        },
        copy: {
            font: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: [
                    'node_modules/font-awesome/fonts/*',
                    'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
                    'client/fonts/*'
                ],
                dest: 'public/fonts/'
            },
            img: {
                expand: true,
                cwd: 'client/img',
                src: ['**'],
                dest: 'public/img'
            }
        },
        watch: {
            clientjs: {
                files: ['react/**/*.jsx'],
                tasks: ['webpack:build-dev'],
                options: {
                    spawn: false
                }
            },
            server: {
                files: ['Gruntfile.js', 'cluster.js', 'server/**/*.js', 'test/**/*.js'],
                tasks: ['jshint:server']
            },
            scss: {
                files: ['client/scss/**/*.scss'],
                tasks: ['sass', 'concat:css']
            }
        },
        abideExtract: {
            js: {
                src: 'server/**/*.js',
                dest: 'server/locale/templates/LC_MESSAGES/messages.pot',
                options: {
                    keyword: '__'
                }
            },
            client: {
                src: 'public/js/*.js',
                dest: 'server/locale/templates/LC_MESSAGES/messages.pot',
                options: {
                    keyword: '__'
                }
            },
            jade: {
                src: 'server/views/**/*.jade',
                dest: 'server/locale/templates/LC_MESSAGES/messages.pot',
                options: {
                    language: 'jade',
                    keyword: '__'
                }
            }
        },
        abideMerge: {
            messages: {
                options: {
                    template: 'server/locale/templates/LC_MESSAGES/messages.pot',
                    localeDir: 'server/locale'
                }
            }
        },
        abideCompile: {
            json: {
                dest: 'public/js/',
                options: {
                    type: 'json',
                    localeDir: 'server/locale'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-i18n-abide');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['jshint', 'sass', 'concat', 'copy', 'abideCompile', 'webpack:build-dev']);
    grunt.registerTask('prod', ['jshint', 'sass', 'concat', 'copy', 'abideCompile', 'webpack:build']);
    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('locales', ['webpack:build-dev', 'abideExtract', 'abideMerge', 'abideCompile']);
};
