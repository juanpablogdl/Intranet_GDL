module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		phpunit: {
			classes: {}
		},

		githooks: {
			all: {
				'pre-commit': 'default'
			}
		},
		// concat: {
		// 	options: {
		// 		stripBanners: true,
		// 		// banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
		// 		// 	' * <%= pkg.homepage %>\n' +
		// 		// 	' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
		// 		// 	' * Licensed GPLv2+' +
		// 		// 	' */\n'
		// 	},
		// 	'': {
		// 		src: [
		// 			'js/cmb2.js',
		// 			'js/cmb2.js',
		// 		],
		// 		dest: 'assets/js/{%= dir_name %}.js'
		// 	}
		// },

		cssmin: {
			options: {
				// banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				// 	' * <%= pkg.homepage %>\n' +
				// 	' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
				// 	' * Licensed GPLv2+' +
				// 	' */\n'
			},
			minify: {
				expand: true,
				src: ['css/cmb2.css'],
				// dest: '',
				ext: '.min.css'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded',
					lineNumbers: true
				},
				files: {
				  'css/cmb2.css': 'css/cmb2.scss',
				}
			}
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'js/cmb2.js'
			],
			options: {
				curly   : true,
				eqeqeq  : true,
				immed   : true,
				latedef : true,
				newcap  : true,
				noarg   : true,
				sub     : true,
				unused  : true,
				undef   : true,
				boss    : true,
				eqnull  : true,
				globals : {
					exports : true,
					module  : false
				},
				predef  :['document','window','jQuery','cmb2_l10','wp','tinyMCEPreInit','tinyMCE','console']
			}
		},

		asciify: {
			banner: {
				text    : 'CMB!',
				options : {
					font : 'isometric2',
					log  : true
				}
			}
		},

		uglify: {
			all: {
				files: {
					'js/cmb2.min.js': ['js/cmb2.js']
				},
				options: {
					// banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					// 	' * <%= pkg.homepage %>\n' +
					// 	' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					// 	' * Licensed GPLv2+' +
					// 	' */\n',
					mangle: false
				}
			}
		},

		watch:  {
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin']
			},
			scripts: {
				files: ['js/cmb2.js'],
				tasks: ['js'],
				options: {
					debounceDelay: 500
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-phpunit');
	grunt.loadNpmTasks('grunt-githooks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-asciify');
	// grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('js', ['asciify', 'jshint', 'uglify']);
	grunt.registerTask('tests', ['asciify', 'jshint', 'phpunit']);
	grunt.registerTask('default', ['js', 'sass', 'cssmin', 'phpunit']);
};
