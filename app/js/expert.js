$(document).ready(function() {  
	

	if($(".expert").length > 0 ) {

		//show explications
		$('.expert_exo-container .left .button_explication').off("click")
		$('.expert_exo-container .left .button_explication').on("click",function(){
			$('.expert_exo-container').toggleClass("show_explication").removeClass("show_documentation");
			
		})

		//show documentation
		$('.expert_exo-container .left .button_documentation').off("click")
		$('.expert_exo-container .left .button_documentation').on("click",function(){
			$('.expert_exo-container').toggleClass("show_documentation").removeClass("show_explication");
			
		})

		//show drawing selector
		$('.expert_buttons .expert_other').off("click")
		$('.expert_buttons .expert_other').on("click",function(){
			$('.expert_exo').addClass('hide');
			$('.expert_home').removeClass('hide');
		});


		//go to end screen
		$('.expert_buttons .go_to_end').off("click")
		$('.expert_buttons .go_to_end').on("click",function(){
			$('.current textarea.code-content').val("")
			$('.expert_exo').addClass('hide');
			$('.expert_home').addClass('hide');
			$('.expert_end').removeClass('hide');
		});


		//begin expert mode
		$('.expert_home .expert_btn_go').off("click")
		$('.expert_home .expert_btn_go').on("click",function(){
			$('.expert_exo-container').removeClass('show_explication');
			$('.expert_exo').removeClass('hide');
			$('.expert_home').addClass('hide');
		});


		//add keyboard
		$('.expert .keyboard').bind('keyboardChange', function (e, keyboard, el) {
	        
	        console.log("A key was pressed!");
	    }).keyboard({
	        appendTo:$('.expert .left .keyboard_container'),
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
	$('.expert .button_update').on('click',function(){
		writeFile('expert')
	})
	//reset draw
	$('.expert .button_redraw').on('click',function(){
		$('.current textarea.code-content').val("")
		
	})
	//remove syntax error block
	$('.expert .block-error-syntax').on('click',function(){
		$(this).addClass("hide")
	})
	
});