module.exports = function(grunt) {


grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
    		css: {
    			files:{
    				'./css-concat/main.css': [
			            './css/vendors/*.css',
			            './css/include/*.css',
			            './css/*.css', 
				    ]
    			}
		        
    		},
    		js: {
    			files:{
    				'./js-concat/main.js':[
			            './js/vendors/*.js',
			            './js/include/*.js',
			            './js/*.js'
				    ]
    			}
		        
    		}
        
    },
    less: {
    	development: {
		    options: {
		      	paths: ['assets/css']
		    },
		    files: {
		      	'./css/style.css': './less/style.less'
		    }
		},

    },
    processhtml: {
	    options: {
	      
	    },
	    dist: {
	      files: {
	      	'./templates/tuto-compiled.html': ['./templates/tuto.html'],
	      	'./templates/easy-compiled.html': ['./templates/easy.html'],
	      	'./templates/hard-compiled.html': ['./templates/hard.html'],
	      	'./templates/expert-compiled.html': ['./templates/expert.html'],
	      	'./templates/hard_exo-compiled.html': ['./templates/hard/hard_exo.html'],
	      	'./templates/expert_exo-compiled.html': ['./templates/expert/expert_exo.html'],
	        './index.php': ['./templates/index.php'],
	        
	      }
	    }

	    
	  },
	  uglify: {
	    dist: {
	      files: {
	        './js-concat/main.min.js': ['./js-concat/main.js']
	      }
	    }
	  },
    
	cssmin: {
	  options: {
	    shorthandCompacting: false,
	    roundingPrecision: -1
	  },
	  target: {
	    files: {
	        './css-concat/main.min.css': ['./css-concat/main.css']
	    }
	  }
	},
	watch: {
		less: {
	        files: ['./less/*.less', './less/include/*.less'],
	        tasks: ["less"],
	        options: {
	            spawn: false
	        }
	    },
	    css: {
	        files: ['./css/*.css', './css/vendors/*.css', './css/include/*.css', './less/*.less', './less/include/*.less'],
	        tasks: ['concat:css'],
	        options: {
	            spawn: false
	        }
	    },
	    js: {
	        files: [ './js/*.js','./js/vendors/*.js','./js/include/*.js'],
	        tasks: ['concat:js'],
	        options: {
	            spawn: false
	        }
	    },
	    html: {
	        files: ['./templates/*.html','./templates/*.php', './templates/include/*.html', './templates/process/*.html','./templates/tuto/*.html','./templates/easy/*.html','./templates/hard/*.html','./templates/expert/*.html'],
	        tasks: ["processhtml:dist"],
	        options: {
	            spawn: false
	        }
	    }
	}

});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-processhtml');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['less','concat', "processhtml:dist", 'watch']);
};