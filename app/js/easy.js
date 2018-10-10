$(document).ready(function() {  
	

	if($(".easy").length > 0 ) {

		//show explications
		$('.easy_exo-container .left .button').off("click")
		$('.easy_exo-container .left .button').on("click",function(){
			$('.code-content ul').addClass("hide")
			$('.easy_exo-container').toggleClass("show_explication");
			
		})

		//show drawing selector
		$('.easy_buttons .easy_other').off("click")
		$('.easy_buttons .easy_other').on("click",function(){
			$('#visualizer').empty();
			$('.easy_exo').addClass('hide');
			$('.easy_home').removeClass('hide');
		});


		//go to hard mode
		$('.easy_buttons .go_to_hard').off("click")
		$('.easy_buttons .go_to_hard').on("click",function(){
			$('#visualizer').empty();
			$('.easy_exo').addClass('hide');
			$('.easy_home').removeClass('hide');
			$('.easy').addClass('hide').removeClass('current');
			$('.footer').addClass('purple')
			$('.hard').removeClass('hide').addClass('current');
			animateHard();
		});


		//display selected drawing
		$('.easy_home .draw_btn').off("click")
		$('.easy_home .draw_btn').on("click",function(){

			$('.easy_exo-container').removeClass('show_explication');
			$('.easy_exo-container .left img').attr('src','./img/draw_easy_'+$(this).data('exo')+'.png')
			$('.exo_explication').hide();
			$('.exo_explication'+$(this).data('exo')).show();
			$('.easy_exo').removeClass('hide');
			$('.easy_home').addClass('hide');
			drawWithCode($(this).data('exo'))
		
			
		});
		
	}

	
});
