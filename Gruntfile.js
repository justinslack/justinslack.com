module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
        'assets/js/script.js',
        ],
        dest: '_site/assets/js/app.js',
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: false
      },
      build: {
        src: '_site/assets/js/app.js',
        dest: '_site/assets/js/app.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '_site/assets/img/'
        }],
        options: {
          cache: false
        }
      }
    },


   svgmin: {
   options: {
      plugins: [
            { removeViewBox: true },
            { removeUselessStrokeAndFill: false }
        ]
      },
      multiple: {
        files: [{
        expand:true,
        cwd: 'assets/img/',
        src: ['**/*.svg'],
        dest: '_site/assets/img/'
        }]
      }
    },

  htmlmin: {
   dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: [{
        expand: true,
        cwd: '_site',
        src: '**/*.html',
        dest: '_site/'
      }]
    }
  }


  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');


  grunt.registerTask('default',['concat', 'uglify', 'imagemin', 'svgmin', 'htmlmin']);

};