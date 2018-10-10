$(document).ready(function() {  
	

	if($(".intro").length > 0 ) {
		
		$('div[data-tag="intro_btn_tuto"]').on("click",function(){

			$('.intro').addClass("hide")
			$('.tuto').removeClass("hide")
			$('.footer').addClass('orange')
			animateTuto()
		})
		$('div[data-tag="intro_btn_easy"]').on("click",function(){

			$('.intro').addClass("hide")
			$('.easy').removeClass("hide").addClass("current")
			animateEasy()
		})
		$('div[data-tag="intro_btn_hard"]').on("click",function(){

			$('.intro').addClass("hide")
			$('.footer').addClass('purple')
			$('.hard').removeClass("hide").addClass("current")
			animateHard()
		})

		
		
	}

	
});

