
var timerHome;
var currentLg = "fr";
$( document ).ready(function() {


    fillTxtWithSelectedLanguage('fr')


    //clear timeout on click
    $(document).on('click',function(){
    	clearTimeout(timerHome);
    	TweenMax.killTweensOf($('.wait'));
    	$('.wait').css('opacity',0);
    	//reinit timeout if not home
    	if ($('.home').hasClass('hide')) {
    		timerHome = setTimeout(initHome,90000);
    	}
    })

	

	$('.easy_exo .code').mCustomScrollbar();
	$('.documentation').mCustomScrollbar();
	$('.explication').mCustomScrollbar();
    

    //back to tuto with selected language
    $('.footer li').on('click',function(){

    	$(".intro .button").css('opacity',0);

    	$('.footer li').css('pointer-events',"none")

    	$('.expert_exo-container textarea.code-content').val("")

    	$('.doc').addClass("hide")

    	currentLg = $(this).data('lang')

	    fillTxtWithSelectedLanguage($(this).data('lang'))

	    $('.doc-'+currentLg).removeClass('hide')


	    console.log('footer click');
	    $(".home .button, .intro .button, .tuto1 .button, .tuto2 .button, .easy_home .draw_btn, .hard_home .draw_btn, .expert_home .draw_btn").addClass('disable').addClass('animate').css('opacity',0);

		$('.home, .tuto, .tuto .current, .easy, .hard, .expert').addClass("hide").removeClass('current');
		currentTuto = 2;
		$('.easy_exo, .hard_exo, .expert_exo, .expert_end').addClass('hide');
		$('.easy_home, .hard_home, .expert_home, .intro, .footer, .tuto1').removeClass("hide");
		$('.footer').removeClass('orange').removeClass('purple').removeClass('red')
		animateIntro()
		$("#visualizer").empty()


		eraseImages()
    })


	$('a').click(function(e) {
		e.preventDefault();
	});
	$('button').click(function(e) {
		e.preventDefault();
	});


	//credits
	$('.credits-btn').on("click",function(){
		$('.credits').removeClass("hide")
	})
	$('.credits .close-btn').on("click",function(){
		$('.credits').addClass("hide")
	});


});

$('html').bind('mousewheel DOMMouseScroll', function (e) {

	$('textarea').blur()
  
});
$('textarea').bind('input propertychange', function() {
	if($(".current").hasClass("expert")){
		$('.current .code').mCustomScrollbar();
	}
	
    setHeightTextarea($(this))
});
function setHeightTextarea(textarea){
	textarea.css("height",textarea[0].scrollHeight)

}
function fillTxtWithSelectedLanguage(lg){


	var translate = new Translate();
    var currentLng = lg;//'fr','en','es'
    var attributeName = 'data-tag';
    translate.init(attributeName, currentLng);
    translate.process(); 
}


var animationMainTitle = new Animation("Algographe", 'main-title');
function animateHome(){

	$("#main-title").empty()
    animationMainTitle.reset();
    animationMainTitle.start();


	$(".home .button").removeClass('animate');
	$(".home .button").css('opacity',1);
	// TweenMax.staggerFrom(chars, 0.8, {opacity:0, y:-80, ease:Back.easeOut}, 0.1);
	TweenMax.from(".home .subtitle", 0.3, {opacity:0, x:-80, ease:Power0.easeOut, delay:1});

	TweenMax.staggerFrom(".home .button",0.3, {opacity:0, y:+40, ease: Power0.easeOut, delay:1,onComplete:function(){
		$(this.target).removeClass('disable');
	}}, 0.3);
}

function animateIntro(){
	clearTimeout(timerHome);
	timerHome = setTimeout(initHome,90000);
	$(".intro h2").removeClass('grey');
	var mySplitTextIntro = new SplitText(".intro h2", {type:"chars"}), 
	charsIntro = mySplitTextIntro.chars;

	var mySplitTextIntroH3 = new SplitText(".intro h3", {type:"lines"}), 
	charsIntroH3 = mySplitTextIntroH3.lines;
	
	$(".intro .button").removeClass('animate');
	$(".intro .button").css('opacity',0);

	TweenMax.staggerFrom(charsIntro, 0.8, {opacity:0, y:-80, ease:Back.easeOut,delay:1}, 0.1, function(){
		$(".intro h2").addClass('grey');

	});
	TweenMax.staggerFrom(charsIntroH3,0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:3}, 0.2);
	TweenMax.staggerFromTo(".intro .button",0.3,{opacity:0, y:+40}, {opacity:1, y:0, ease:Back.easeOut, delay:4,onComplete:function(){
		$(this.target).removeClass('disable');
		
	}}, 0.3);

	setTimeout(function(){$('.footer li').css('pointer-events',"inherit")}, 5000)
}
function animateTuto(){
	$(".tuto1 h1").removeClass('grey');
	var mySplitTextTuto = new SplitText(".tuto1 h1", {type:"chars"}), 
	charsTuto = mySplitTextTuto.chars;

	var mySplitTextTutoP = new SplitText(".tuto1 p", {type:"lines"}), 
	charsTutoP = mySplitTextTutoP.lines;
	
	$(".tuto1 .button").removeClass('animate');
	$(".tuto1 .button").css('opacity',1);

	TweenMax.staggerFrom(charsTuto, 0.8, {opacity:0, y:-80, ease:Back.easeOut,delay:1}, 0.1, function(){
		$(".tuto1 h1").addClass('grey');
	});
	TweenMax.staggerFrom(charsTutoP,0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:3}, 0.2);
	TweenMax.staggerFrom(".tuto1 .button",0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:4,onComplete:function(){
		$(this.target).removeClass('disable');
	}}, 0.2);
}
function animateTuto2(){


	TweenMax.from(".tuto .circle", 0.8, {opacity:0, scale:0, transformOrigin:"50% 50%", ease:Back.easeOut,delay:1});
	TweenMax.from(".tuto2 .content", 0.8, {opacity:0, y:+40, ease:Back.easeOut,delay:2});
	
	$(".tuto2 .button").removeClass('animate');
	$(".tuto2 .button").css('opacity',1);
	TweenMax.from(".tuto2 .button", 0.8, {opacity:0, y:+40, ease:Back.easeOut,delay:3,onComplete:function(){
		$(this.target).removeClass('disable');
	}});
}
function animateEasy(){
	$(".easy_home h2").removeClass('grey');
	var mySplitTextEasy = new SplitText(".easy_home h2", {type:"chars"}), 
	charsEasy = mySplitTextEasy.chars;

	var mySplitTextEasyH3 = new SplitText($("#easyH3"), {type:"lines"}), 
	charsEasyH3 = mySplitTextEasyH3.lines;
	console.log(charsEasyH3);
	$(".easy_home .draw_btn").removeClass('animate');
	$(".easy_home .draw_btn").css('opacity',1);

	TweenMax.staggerFrom(charsEasy, 0.8, {opacity:0, y:-80, ease:Back.easeOut,delay:1}, 0.1, function(){
		$(".easy_home h2").addClass('grey');
	});
	TweenMax.staggerFrom(charsEasyH3,0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:3}, 0.2);
	TweenMax.staggerFrom(".easy_home .draw_btn",0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:4,onComplete:function(){
		$(this.target).removeClass('disable');
	}}, 0.2);
}
function animateHard(){
	$(".hard_home h2").removeClass('grey');
	var mySplitTextHard = new SplitText(".hard_home h2", {type:"chars"}), 
	charsHard = mySplitTextHard.chars;

	var mySplitTextHardH3 = new SplitText(".hard_home h3", {type:"lines"}), 
	charsHardH3 = mySplitTextHardH3.lines;
	
	$(".hard_home .draw_btn").removeClass('animate');
	$(".hard_home .draw_btn").css('opacity',1);

	TweenMax.staggerFrom(charsHard, 0.8, {opacity:0, y:-80, ease:Back.easeOut,delay:1}, 0.1, function(){
		$(".hard_home h2").addClass('grey');
	});
	TweenMax.staggerFrom(charsHardH3,0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:3}, 0.2);
	TweenMax.staggerFrom(".hard_home .draw_btn",0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:4,onComplete:function(){
		$(this.target).removeClass('disable');
	}}, 0.2);
}
function animateExpert(){
	$(".expert_home h2").removeClass('grey');
	var mySplitTextExpert = new SplitText(".expert_home h2", {type:"chars"}), 
	charsExpert = mySplitTextExpert.chars;

	var mySplitTextExpertH3 = new SplitText(".expert_home h3", {type:"lines"}), 
	charsExpertH3 = mySplitTextExpertH3.lines;
	
	$(".expert_home .button").removeClass('animate');
	$(".expert_home .button").css('opacity',1);

	TweenMax.staggerFrom(charsExpert, 0.8, {opacity:0, y:-80, ease:Back.easeOut,delay:1}, 0.1, function(){
		$(".expert_home h2").addClass('grey');
	});
	TweenMax.staggerFrom(charsExpertH3,0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:3}, 0.2);
	TweenMax.staggerFrom(".expert_home .button",0.3, {opacity:0, y:+40, ease: Back.easeOut, delay:4,onComplete:function(){
		$(this.target).removeClass('disable');
	}}, 0.2);
}
function initHome(){

	switch (currentLg) {
	  case 'fr':
	  	$('.wait img').attr('src','./img/timeOut.png')
	    break;
	  case 'en':
	  	$('.wait img').attr('src','./img/timeOut-En.png')
		break;
	  case 'it':
	  	$('.wait img').attr('src','./img/timeOut-It.png')
	  
	  default:
	    console.log('do nothing')
	}

	TweenMax.fromTo($('.wait'),5,{opacity:0},{opacity:1,ease: CustomEase.create("custom", "M0,0 C0,0 0,1 0,1 0,1 1,1 1,1"),onComplete:function(){


		$('.expert_exo-container textarea.code-content').val("")

		currentLg = 'fr'
		
 		fillTxtWithSelectedLanguage('fr')

	    $('.wait').css('opacity',0);
		$('.home').removeClass("hide").addClass('current');


		//play video at 0
		$('.video_container').removeClass('hide');
		document.getElementById("videoId").play(0);

		$(".home .button, .intro .button, .tuto1 .button, .tuto2 .button, .easy_home .draw_btn, .hard_home .draw_btn, .expert_home .draw_btn").addClass('disable').addClass('animate').css('opacity',0);
		$('.intro, .tuto, .tuto .current, .easy, .hard, .expert').addClass("hide").removeClass('current');
		currentTuto = 2;
		$('.easy_exo, .hard_exo, .expert_exo, .expert_end, .intro, .footer').addClass('hide');
		$('.easy_home, .hard_home, .expert_home, .tuto1').removeClass("hide");

		
		$('.footer').removeClass('orange').removeClass('purple').removeClass('red')
		$("#visualizer").empty()
		animateHome()

		eraseImages()



	}})
	

}

function eraseImages(){

		//erase img in images folder
		$.ajax({
			type: 'POST',
			url: './php/eraseImageFolder.php',
			async: false,
			success: function(html) {
				console.log("images successfully deleted")
			} 
		});
}

function writeFile(cfdg) {

	$(".loader").removeClass("hide")


	//recover code 
	var txt;

	if($(".current").hasClass('hard')){

		txt = $('#areaHard').val()

	}else if ($(".current").hasClass('expert')){

		txt = $('#areaexpert').val()

	}else{
		txt = $('.current .code-content')[0].innerHTML;
	}

	
	//remove chars tuto 4 particular case
	if($('.current').hasClass('tuto4')){
		txt = txt.replace('<var id="plus">+</var>','');
		var spe = $("#tri")[0].outerHTML;
		var speValue = $("#tri")[0].innerHTML;
		txt = txt.replace(spe, speValue)
		console.log("plsu ?",$("#plus").length)
		if($("#plus").length > 0){
			txt = txt.replace("TRIANGLE [ x 1.5 y 0.3 size 0.5]","")
		}
	}



	//from txt to cfdg code
	var arraySelectToRemove = [];
	var arrayVar = []
	var arrayValue = []

	
	$('.current .code-content ul.listVar').each(function(){
		var ul = $(this)[0].outerHTML;
		arraySelectToRemove.push(ul)
	})

	$('.current .code-content ul.listVars').each(function(){
		var ul = $(this)[0].outerHTML;
		arraySelectToRemove.push(ul)
	})

	$('.current .code-content var').each(function(){
		var htmlVar = $(this)[0].outerHTML;
		var value = $(this)[0].innerHTML;
		arrayVar.push(htmlVar)
		arrayValue.push(value)
	})


	$('.current .code-content vars').each(function(){
		var htmlVar = $(this)[0].outerHTML;
		var value = $(this)[0].innerHTML;
		arrayVar.push(htmlVar)
		arrayValue.push(value)
	})

	for (var i = 0; i < arraySelectToRemove.length; i++) {
		txt = txt.replace(arraySelectToRemove[i], '');
	}
	for (var i = 0; i < arrayVar.length; i++) {
		txt = txt.replace(arrayVar[i],arrayValue[i]);
	}

	//tuto 4 particular case
	if($('.current').hasClass('tuto4')){

		if($("#plus").length > 0){
			txt = txt.replace("TRIANGLE [ x 1.5 y 0.3 size 0.5]","")
		}
	}



	$.ajax({
		type: 'POST',
		url: './php/writeFile.php',
		data: {file:cfdg, data:txt},
		async: false,
		success: function(html) {
			getContextArt(cfdg);
		} 
	});

 }

function getContextArt(cfdg) {

	//Set new SESSION var
	$.ajax({
		type: 'POST',
		url: './php/session.php',
		data: {current_cfdg:cfdg},
		async: false,
		success:function(html) {

			//Exec context art cmd and display output
			$.get('./php/getContextArt.php', function(data){


				//add drawing in visualizer block
				$('#visualizer').empty();
				$('#visualizer').append(data);

			});
		}
	});

}
function Animation(text, id){
    var handler     = undefined;
    var mistakesNb  = 0;
    var mistakes    = "qndsrghbkhlopbilatdgycxche";
    var currentText = "_";
    var currentPos  = 0;
    var correcting  = false;
    var running     = false;
    var cpt         = 0;
    var dom         = document.getElementById(id);

    var self        = this;
    
    function setAnimateTimeout()
    {
        handler = setTimeout(animate, 100 + Math.ceil( Math.random() * 300 ) );
    }

    function setCursorTimeout()
    {
        handler = setTimeout(animate, 700 );
    }

    function animate()
    {
        // the algorithm try to correct a mistake. We backtrack until
        // the mistake is reached.
        if(correcting)
        {
            currentText = currentText.slice(0, -1);
            currentPos--;                        

            // The mistake is here.
            if(currentText[currentPos] != text[currentPos])
            {
                correcting = false;
                mistakesNb--;
            }
            
            // If the cursor is on a space character we do not print
            // an underscore to preserve the word length.
            if(text[currentPos + 1] == ' ')
                currentText = currentText.slice(0, -1) + car + ' ';
            else
                currentText = currentText.slice(0, -1) + '_';

            setAnimateTimeout();
            cpt = 0;
        }
        else
        {
            // We check if we have a mistake to correct.
            // With a probability of 90% the algorithm backtrack to correct it.
            if(mistakesNb > 0 && Math.random() < 0.9)
            {
                setAnimateTimeout();
                correcting = true;
                cpt = 0;
            }
            else if(currentPos < text.length)
            {
                var car = text[currentPos];
                var code = text.charCodeAt(currentPos);
                
                // With a probability of 10%, the algorithm do a mistake.
                if(Math.random() < 0.1)
                {
                    // Upper case
                    if(code > 64 && code < 91)
                    {
                        car = mistakes[code - 'A'.charCodeAt(0)].toUpperCase();
                        mistakesNb++;
                    }
                    
                    // Lower case
                    if(code > 96 && code < 123)
                    {
                        car = mistakes[code - 'a'.charCodeAt(0)];
                        mistakesNb++;
                    }
                    
                }      

                // If the cursor is on a space character we do not print
                // an underscore to preserve the word length.
                if(text[currentPos + 1] == ' ')
                    currentText = currentText.slice(0, -1) + car + ' ';
                else
                    currentText = currentText.slice(0, -1) + car + "_";
                    
                // Go to the next character.
                currentPos++;
                cpt = 0;

                setAnimateTimeout();
            }
            else
            {
                // Underscore blinking
                if(currentText[currentPos] == '_')
                    currentText = currentText.slice(0, -1) + ' ';
                else
                    currentText = currentText.slice(0, -1) + '_';
                    
                // When the text is fully printed we wait a moment then we restart the animation.   
                if(++cpt == 20)
                    self.reset();
                
                setCursorTimeout();
            }
            
            
        }
        
        var textAfter = text.slice(currentText.length);
        
        var toPrint = `${currentText}<span style="opacity: 0">${textAfter}</span>`;
        
        dom.innerHTML = toPrint;
    }
    
    self.reset = function()
    {
        cpt = 0;
        currentPos = 0;
        currentText = '_';
        mistakesNb = 0;
        correcting = false;
    }
 
    self.start = function()
    {
        if(running) return;

        running = true;
        self.reset();
        animate();
    }
    
    
    self.stop = function()
    {
        running = false;
        clearTimeout(handler);
        dom.innerHTML = text;
    }
 
}
