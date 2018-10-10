$(document).ready(function() {  
	
	

	if($(".tuto").length > 0 ) {
		initTuto();
		
	}

	
});

var currentTuto = 2;

function initTuto(){


	//begin tuto
	$('.tuto #goTuto').on("click",function(){
		$('.tuto1').addClass('hide')
		$('.tuto2').removeClass("hide").addClass("current")
		$('.circle').removeClass("hide")
		animateTuto2()
		getTutoCode()

	})

	//go to next step
	$('.tuto .understood').on("click",function(){
		$('.tuto'+currentTuto).addClass("hide").removeClass("current")
		currentTuto++
		$('.tuto'+currentTuto).removeClass("hide").addClass("current")
		if(currentTuto == 8){
			$('.circle').addClass("light")
		}else{
			getTutoCode()
		}
		

	})

	//go to easy mode
	$('.tuto #easyMode').on("click",function(){
		$('.tuto'+currentTuto).addClass("hide").removeClass("current")
		$('.easy').removeClass("hide").addClass('current')
		animateEasy();
		$('.footer').removeClass('orange')
		$('#visualizer').empty();

	});

	//go to hard mode
	$('.tuto #hardMode').on("click",function(){
		$('.tuto'+currentTuto).addClass("hide").removeClass("current")
		$('.hard').removeClass("hide").addClass('current')
		animateHard();
		$('.footer').removeClass('orange').addClass('purple')
		$('#visualizer').empty();

	});



}
function getTutoCode(){

	//get tuto code 
	$.ajax({
		type: 'GET',
		url: './algos/tuto'+currentTuto+'.txt',
		dataType: 'text',
		success: function(data) {

			//fill with code
			$('.tuto'+currentTuto+' .code-content').html(data);

			//add choice vars
			$('.tuto'+currentTuto+' vars').each(function(){
				$('.tuto'+currentTuto+' .code-content').append('<ul class="hide listVars" data-var="'+$(this).attr('id')+'">')
				var idUl = $(this).attr('id')
				var attrList = $(this).attr('class').split(/\s+/);
				var valueList = $(this).attr('values').split(/\s+/);
				var typeList = $(this).attr('types').split(/\s+/);
				$.each(attrList, function(index, item) {
				    console.log("HELLLOOO", index, item)
				    $("[data-var='"+idUl+"']" ).append('<li><span class="valueName">'+item+'</span><div class="interact-value" data-min='+types[typeList[index]].min+' data-max='+types[typeList[index]].max+' data-increment='+types[typeList[index]].increment+'><div class="less">-</div><span class="value">'+valueList[index]+'</span><div class="more">+</div></div></li>')

				});
				$("[data-var='"+idUl+"']" ).append("<div class='validate'>valider</div>")
			})

			//add choice select
			$('.tuto'+currentTuto+' var').each(function(){

				if($(this).attr('id') !== "plus"){


					$('.tuto'+currentTuto+' .code-content').append('<ul class="hide listVar" data-var="'+$(this).attr('id')+'">')
					var idUl = $(this).attr('id')
					var valueList = $(this).attr('values').split(/\s+/);
					$.each(valueList, function(index, item) {
					    $("[data-var='"+idUl+"']" ).append('<li>'+valueList[index]+'</li>')

					});
				}
			})

			//display drawing 
			writeFile('tuto'+currentTuto)


			//display choices
			$('.tuto var, .tuto vars').on("click",function(){
				$('.tuto ul').addClass("hide")
				$( "[data-var='"+$(this).attr('id')+"']" ).removeClass("hide")
				var right= 0;
				var top = 0;
				
				//particular position case
				if($(this).attr('id') == "var4specific"){
					right = $(this)[0].offsetLeft + $(this)[0].clientWidth
					top = $(this)[0].offsetTop + $(this)[0].clientHeight + 10

				}else{
					right = $( "[data-var='"+$(this).attr('id')+"']" ).width() + $(this)[0].clientWidth + $(this)[0].offsetLeft + 20
					top = $(this)[0].offsetTop
				}
				$( "[data-var='"+$(this).attr('id')+"']" ).css("right", -right)
				$( "[data-var='"+$(this).attr('id')+"']" ).css("top", top)
			});

			//close choices and display drawing with new params
			$('.tuto ul.listVar li').on("click",function(){
				$(this).parent("ul").addClass('hide')
				$('#'+$(this).parent("ul").attr('data-var')).html($(this).html())
				writeFile('tuto'+currentTuto)
				
			});


			//increment values
			$('.tuto ul.listVars .more').on("click",function(){
		

				var value = parseFloat($(this).parent('div').find(".value").html())

				if(value < $(this).parent('div').data('max')){
					value += $(this).parent('div').data('increment')
					value = Math.round(value * 100)/100
				}
				
				$(this).parent('div').find(".value").html(value)

			});

			//decrement values
			$('.tuto ul.listVars .less').on("click",function(){
				var value = parseFloat($(this).parent('div').find(".value").html())
					if(value > $(this).parent('div').data('min')){
						value -= $(this).parent('div').data('increment')
						value = Math.round(value * 100)/100
					}
					$(this).parent('div').find(".value").html(value)


			});

			//validate modifications
			$('.tuto ul.listVars .validate').on("click",function(){

				var currentVars = $('#'+$(this).parent("ul").attr("data-var")).html()
				
				//recreate code string of characters
				var txt = ""

				if(currentVars.indexOf("[") != "-1"){
					txt += "["
				}
				else if(currentVars.indexOf("{") != "-1"){
					txt += "{"
				}
				

				$(this).parent("ul").find("li").each(function(){
					
			
					txt += $(this).find(".valueName").html()
					txt += " "
					txt += $(this).find(".value").html()
					txt += " "

				})

				//remove last space
				txt = txt.substring(0, txt.length - 1);

				if(currentVars.indexOf("]") != "-1"){
					txt += "]"
				}else if(currentVars.indexOf("}") != "-1"){
					txt += "}"
				}
				

				$('#'+$(this).parent("ul").attr("data-var")).html(txt)
				$(this).parent("ul").addClass("hide")

				//display drawing with new params
				writeFile('tuto'+currentTuto)
			});

			//PARTICULAR CASE + tuto 4
			$('#plus').on("click", function(){
				$(this).remove()
				$("#tri").removeClass("hide")
				writeFile('tuto'+currentTuto)
			});


			//hide popup values on click 
			$(document).click(function(event) {
				
			    if (!$(event.target).closest(".listVar, .listVars, var, vars").length) {
			        $('ul.listVars, ul.listVar').addClass("hide")
			    }
			});
		}
	});
}
