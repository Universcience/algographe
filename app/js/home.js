$(document).ready(function() {  
	

	if($(".home").length > 0 ) {
		
		$('.start_buttons .button').on("click",function(){

			//fill txts with selected languages
			var translate = new Translate();
		    var currentLng = $(this).data('lang');
		    var attributeName = 'data-tag';
		    translate.init(attributeName, currentLng);
		    translate.process(); 

		    currentLg = $(this).data('lang')

		    $('.doc').addClass("hide")
		    $('.doc-'+currentLg).removeClass('hide')


			$('.home').addClass("hide")

			//pause and hide video
			document.getElementById("videoId").pause();
			$('.video_container').addClass('hide');

			//show and animate intro
			$('.intro, .footer').removeClass("hide")
			$('.footer li').css('pointer-events',"none")
			animateIntro();
			


		})
		animateHome();

	}

	
});

