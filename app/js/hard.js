$(document).ready(function() {  
	

	if($(".hard").length > 0 ) {

		//show explications
		$('.hard_exo-container .left .button_explication').off("click")
		$('.hard_exo-container .left .button_explication').on("click",function(){
			$('.hard_exo-container').toggleClass("show_explication").removeClass("show_documentation");
			
		})

		//show documentation
		$('.hard_exo-container .left .button_documentation').off("click")
		$('.hard_exo-container .left .button_documentation').on("click",function(){

			$('.hard_exo-container').toggleClass("show_documentation").removeClass("show_explication");
			
			
		})

		//show drawing selector
		$('.hard_buttons .hard_other').off("click")
		$('.hard_buttons .hard_other').on("click",function(){
			$(".loader").addClass('hide');
			$('#visualizer').empty();
			$('.hard_exo').addClass('hide');
			$('.hard_home').removeClass('hide');
		});


		//go to expert mode
		$('.hard_buttons .go_to_expert').off("click")
		$('.hard_buttons .go_to_expert').on("click",function(){
			$('#visualizer').empty();
			$('.hard_exo').addClass('hide');
			$('.hard_home').removeClass('hide');
			$('.hard').addClass('hide').removeClass('current');
			$('.footer').addClass('red').removeClass('purple');
			$('.expert').removeClass('hide').addClass('current');
			animateExpert();
		});

		var currentDraw;

		//display selected drawing
		$('.hard_home .draw_btn').off("click")
		$('.hard_home .draw_btn').on("click",function(){
			currentDraw = $(this).data('exo');
			$('.hard_exo-container').removeClass('show_explication');
			$('.hard_exo-container .left img').attr('src','./img/draw_hard_'+$(this).data('exo')+'.png')
			$('.exo_explication').hide();
			$('.exo_explication'+$(this).data('exo')).show();
			$('.hard_exo').removeClass('hide');
			$('.hard_home').addClass('hide');
			drawWithCode($(this).data('exo'))
		});

		//add virtual keyboard
		$('.hard .keyboard').bind('keyboardChange', function (e, keyboard, el) {
	        
	        console.log("A key was pressed!");
	    }).keyboard({
	        appendTo:$('.hard .left .keyboard_container'),
	        display: {
				'bksp'   :  "\u2190",
				'accept' : 'return',
				'normal' : 'ABC',
				'meta1'  : '.?123',
				'meta2'  : '#+=',
				's'      : 'maj.',
			},
			layout: 'custom',
			customLayout: {
				'normal': [
					'a z e r t y u i o p {bksp}',
	                'q s d f g h j k l m',
	                '{s} w x c v b n - \'',
	                '{meta1} {space} {enter}'
				],
				'shift': [
					'A Z E R T Y U I O P {bksp}',
					'Q S D F G H J K L M {enter}',
					'{s} W X C V B N - \'',
					'{meta1} {space} {meta1} '
				],
				'meta1': [
					'1 2 3 4 5 6 7 8 9 0 {bksp}',
					'- / : ; ( ) \u20ac & @ {enter}',
					'{meta2} . , ? ! \' " {meta2}',
					'{normal} {space} {normal} '
				],
				'meta2': [
					'[ ] { } # % ^ * + = {bksp}',
					'_ \\ | ~ < > $ \u00a3 \u00a5 {enter}',
					'{meta1} . , ? ! \' " {meta1}',
					'{normal} {space} {normal} '
				]
			},
	        autoAccept: 'true',
	        usePreview: false,
	        alwaysOpen: true
	    }).addTyping();
			
	}


	//drawing update
	$('.hard .button_update').on('click',function(){
		writeFile('draw'+currentDraw)
	})
	//reset drawing
	$('.hard .button_redraw').on('click',function(){
		$('.current textarea.code-content').val(currentData)
		writeFile('draw'+currentDraw)
	})
	//remove syntax error block
	$('.hard .block-error-syntax').on('click',function(){
		$(this).addClass("hide")
	})

	
});