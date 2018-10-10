var currentData;

function drawWithCode(id){
	$.ajax({
		type: 'GET',
		url: './algos/draw'+id+'.txt',
		dataType: 'text',
		success: function(data) {

			//save data in var for hard mode
			currentData = data

			//HARD MODE
			if($(".current").hasClass('hard')){

				$('.current textarea.code-content').val('')
				$('.current textarea.code-content').css("height",0)

				$('.current textarea.code-content').val(data)
				$('.current textarea.code-content').css("height",$('.current textarea.code-content')[0].scrollHeight)
				$('.current .code').mCustomScrollbar({
				   advanced:{
				     autoScrollOnFocus: false,
				     updateOnContentResize: true
				   }           
				});
				writeFile('draw'+id)
			}
			// EASY MODE
			else{

			
				$('.current .code-content').html(data);

				//add choice vars
				$('.current .code-content vars').each(function(){
					$('.current .code-content').append('<ul class="hide listVars" data-var="'+$(this).attr('id')+'">')
					var idUl = $(this).attr('id')
					var attrList = $(this).attr('class').split(/\s+/);
					var valueList = $(this).attr('values').split(/\s+/);
					var typeList = $(this).attr('types').split(/\s+/);
					var coord = $(this).attr('coord')
					$.each(attrList, function(index, item) {
					    $("[data-var='"+idUl+"']" ).append('<li><span class="valueName">'+item+'</span><div class="interact-value" data-coord='+coord+' data-min='+types[typeList[index]].min+' data-max='+types[typeList[index]].max+' data-increment='+types[typeList[index]].increment+'><div class="less">-</div><span class="value">'+valueList[index]+'</span><div class="more">+</div></div></li>')

					});
					$("[data-var='"+idUl+"']" ).append("<div class='validate'>valider</div>")
				})

				//add choice select
				$('.current .code-content var').each(function(){
					$('.current .code-content').append('<ul class="hide listVar" data-var="'+$(this).attr('id')+'">')
					var idUl = $(this).attr('id')
					var valueList = $(this).attr('values').split(/\s+/);
					$.each(valueList, function(index, item) {
					    $("[data-var='"+idUl+"']" ).append('<li>'+valueList[index]+'</li>')

					});
		
				})


				writeFile('draw'+id)


				//open selected area
				$('.code-content ul.listVar li').on("click",function(){
					$(this).parent("ul").addClass('hide')
					$('#'+$(this).parent("ul").attr('data-var')).html($(this).html())
					writeFile('draw'+id)
					
				});
				//close selected area
				$('.code-content var, .code-content vars').on("click",function(){
					$('.code-content ul').addClass("hide")
					$( "[data-var='"+$(this).attr('id')+"']" ).removeClass("hide")
					var right = $( "[data-var='"+$(this).attr('id')+"']" ).width() + $(this)[0].clientWidth + $(this)[0].offsetLeft + 20
					$( "[data-var='"+$(this).attr('id')+"']" ).css("right", -right)
					var top = $(this)[0].offsetTop
					$( "[data-var='"+$(this).attr('id')+"']" ).css("top", top)
				});



				//increment vars 
				$('.code-content ul.listVars .more').on("click",function(){
					var value = parseFloat($(this).parent('div').find(".value").html())

					if(value < $(this).parent('div').data('max')){
						value += $(this).parent('div').data('increment')
						value = Math.round(value * 100)/100
					}
					
					$(this).parent('div').find(".value").html(value)
				});
				//decrement var
				$('.code-content ul.listVars .less').on("click",function(){
					var value = parseFloat($(this).parent('div').find(".value").html())
					if(value > $(this).parent('div').data('min')){
						value -= $(this).parent('div').data('increment')
						value = Math.round(value * 100)/100
					}
					$(this).parent('div').find(".value").html(value)


				});

				//validate modifications
				$('.code-content ul.listVars .validate').on("click",function(){

					var currentVars = $('#'+$(this).parent("ul").attr("data-var")).html()
					

					//recreate code string of characters
					var txt = ""

					if(currentVars.indexOf("[") != "-1"){
						txt += "["
					}
					else if(currentVars.indexOf("{") != "-1"){
						txt += "{"
					}else if(currentVars.indexOf("(") != "-1"){
						txt += "("
					}
					

					$(this).parent("ul").find("li").each(function(){
						
						if($(this).find('.interact-value').data('coord') == true){
											

							txt += $(this).find(".value").html()
							txt += ","
						}else{

							if($(this).find(".valueName").html() == "var"){
								txt += $(this).find(".value").html()
								txt += " "
							}else{
								txt += $(this).find(".valueName").html()
								txt += " "
								txt += $(this).find(".value").html()
								txt += " "
							}
							
						}


					})

					//remove last space

					txt = txt.substring(0, txt.length - 1);

					if(currentVars.indexOf("]") != "-1"){
						txt += "]"
					}else if(currentVars.indexOf("}") != "-1"){
						txt += "}"
					}else if(currentVars.indexOf(")") != "-1"){
						txt += ")"
					}
					

					$('#'+$(this).parent("ul").attr("data-var")).html(txt)
					$(this).parent("ul").addClass("hide")


					writeFile('draw'+id)
				});

			}
		}
	});
}