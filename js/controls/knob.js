controlFactory["control.knob"] = function(je, config){
    je.attr("data-is-infinite", config.data.isInfinite)

    je.find(".rotatingLayer").addClass(config.data.isInfinite?"infinite":"fixed")

    je.find(".wheel").css("border-color", config.color)
    je.find(".value").css("color", config.color)
    je.find(".dot").css("background-color", config.color)
    
    return je
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

let rotationEnabled = false
let prevAngle = -1
let targetWheel = null

function knob_inputStart(e) {
    prevAngle = 0
    targetWheel = $(e.currentTarget)
    rotationEnabled = true

    if (e.type == 'touchstart') {
        $("body").addClass("scrollLocked")
    }
    targetWheel.removeClass("unclicked")
}

function knob_inputMove(e) {
    if (rotationEnabled) {
        let isInfinite = targetWheel.parent().attr("data-is-infinite") == "true"

        let offset = targetWheel.offset()
        let width = targetWheel.width()
        let height = targetWheel.height()
        
        let wheelCenterX = offset.left + width / 2
        let wheelCenterY = offset.top + height / 2
        
        let clientX = e.clientX
        let clientY = e.clientY

        if (e["type"]=="touchmove"){
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY 
        } 
        clientY += $(window).scrollTop()
        
        let angle = 0
        if (clientY<wheelCenterY) {
            angle = 0-radians_to_degrees(Math.atan((clientX-wheelCenterX)/(clientY-wheelCenterY)))
        } else {
            angle = 180-radians_to_degrees(Math.atan((clientX-wheelCenterX)/(clientY-wheelCenterY)))
        }
        
        if (angle<0) {
            angle +=360 
        }

        // if (isInfinite || angle<136 || angle > 224)
        //     targetWheel.children(".rotatingLayer").css("rotate", angle+"deg")

        if (!isInfinite) {
            if (angle<136 || angle > 224) {
                targetWheel.children(".rotatingLayer").css("rotate", angle+"deg")
                let knobValue = Math.round(((angle+135)%360)/2.7)
                targetWheel.children(".value").html(knobValue)
            }
        } else {
            targetWheel.children(".rotatingLayer").css("rotate", angle+"deg")
            if (Math.abs(prevAngle-angle)>20){
                if (prevAngle<angle) {
                    targetWheel.children(".value").html(parseInt(targetWheel.children(".value").html())+1)
                } else {
                    targetWheel.children(".value").html(parseInt(targetWheel.children(".value").html())-1)
                }
                prevAngle=angle
            }
        }
        
        // console.log($(window).scrollTop())
        // console.log(angle)
    }
}

function knob_inputEnd(e) {
    // console.log("end")
    rotationEnabled = false
    $("body").removeClass("scrollLocked")

    targetWheel.parent().addClass("loading")
    targetWheel.addClass("unclicked")
    targetWheel.parent().find("img.loading").fadeIn(200)

    setTimeout(function(){
        $('.control.knob').find('img.loading').fadeOut(200)
        $('.control.knob').removeClass("loading")
    }, 1000)
}

$('.control.knob > .wheel').on({ 'touchstart' : knob_inputStart});
$('.control.knob > .wheel').on({ 'mousedown' : knob_inputStart});
$('.control.knob > .wheel').on({ 'touchmove' : knob_inputMove});
$('.control.knob > .wheel').on({ 'mousemove' : knob_inputMove});
$('.control.knob > .wheel').on({ 'touchend' : knob_inputEnd});
$('.control.knob > .wheel').on({ 'mouseup' : knob_inputEnd});