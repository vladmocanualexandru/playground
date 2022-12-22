controlFactory["control.slider"] = function(je, config){
    je.find(".value").css("color", config.color)
    je.find(".dot").css("background-color", config.color)

    return je
}

let targetSlider = null
function slider_inputStart(e) {
    targetSlider = $(e.currentTarget).parents(".control.slider")

    targetSlider.addClass("clicked")
    if (e.type == 'touchstart') {
        $("body").addClass("scrollLocked")
    }
}

function slider_inputMove(e) {
    let clientY = e.clientY

    if (e["type"]=="touchmove"){
        clientY = e.touches[0].clientY 
    } 
    clientY += $(window).scrollTop()

    let dotContainer = targetSlider.find(".dotContainer")
    let rail = dotContainer.siblings(".rail")
    let slot = dotContainer.siblings(".slot")
    let offset = dotContainer.parent().offset()
    let height = dotContainer.height()

    slotHeight = slot.height()
    distance = Math.max(0,Math.min(Math.round(clientY-offset.top-height/2), slotHeight))

    dotContainer.css("margin-top", distance+"px")

    rail.css("margin-top", (distance+15)+"px")
    rail.css("height", (slot.height()-distance)+"px")

    rail.parent().siblings(".value").html(Math.round((1-distance/slotHeight)*100))

}

function slider_inputEnd(e) {
    targetSlider.removeClass("clicked")
    $("body").removeClass("scrollLocked")

    targetSlider.find("img.loading").fadeIn(200)

    setTimeout(function(){
        $('.control.slider').find('img.loading').fadeOut(200)
    }, 1000)
}

$('.control.slider .dotContainer').on({ 'touchstart' : slider_inputStart});
$('.control.slider .dotContainer').on({ 'mousedown' : slider_inputStart});
$('.control.slider .dotContainer').on({ 'touchmove' : slider_inputMove});
$('.control.slider .dotContainer').on({ 'mousemove' : slider_inputMove});
$('.control.slider .dotContainer').on({ 'touchend' : slider_inputEnd});
$('.control.slider .dotContainer').on({ 'mouseup' : slider_inputEnd});