module.exports = function(grunt) {
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
        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ],
                alias: {
                    'client': './server/react/client.jsx'
                }
            },
            build: {
                src: ['server/react/**/*.jsx'],
                dest: 'public/js/site.js',
                expose: 'react'
            }
        },
        sass: {
            options: {
                includePaths: [
                    'node_modules/node.normalize.scss',
                    'node_modules/font-awesome/scss'
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
        uglify: {
            options: {
                mangle: false,
                compress: true
            },
            client: {
                files: {
                    'public/js/site.js': ['public/js/site.js']
                }
            }
        },
        watch: {
            clientjs: {
                files: ['server/react/**/*.jsx'],
                tasks: ['browserify']
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-i18n-abide');

    grunt.registerTask('default', ['jshint', 'sass', 'concat', 'copy', 'browserify', 'abideCompile']);
    grunt.registerTask('prod', ['default', 'uglify']);
    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('locales', ['abideExtract', 'abideMerge']);
};
