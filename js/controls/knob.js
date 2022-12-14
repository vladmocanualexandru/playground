controlFactory["control.knob"] = function(newControl, positionTileId, sizeRatio, color, label, tileSize, ...customData){
    let isInfinite = customData[0][0]

    newControl.attr("data-size-ratio", sizeRatio)
    newControl.attr("data-is-infinite", isInfinite)
    
    let position = $("#"+positionTileId).position()
    
    newControl.css("left", position.left+"px")
    newControl.css("top", position.top+"px")
    newControl.attr("data-position-tile", positionTileId)
    
    newControl.css("width", (tileSize*sizeRatio-10)+"px")
    newControl.css("height", (tileSize*sizeRatio-10)+"px")

    newControl.find(".rotatingLayer").addClass(isInfinite?"infinite":"fixed")

    newControl.find(".wheel").css("border-color", color)
    newControl.find(".value").css("color", color)
    // newControl.find(".dot").css("background-color", color)
    
    newControl.find(".label").text(label)
    
    return newControl
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

let rotationEnabled = false
let prevAngle = -1
let targetWheel = null
$('.control.knob > .wheel').on({ 'touchstart' : function(e){ 
    // console.log("start")
    prevAngle = 0
    targetWheel = $(e.currentTarget)
    rotationEnabled = true
    $("body").addClass("scrollLocked")
    targetWheel.removeClass("unclicked")
} });

$('.control.knob > .wheel').on({ 'touchmove' : function(e){ 
    if (rotationEnabled) {
        let isInfinite = targetWheel.parent().attr("data-is-infinite") == "true"

        let offset = targetWheel.offset()
        let width = targetWheel.width()
        let height = targetWheel.height()
        
        let wheelCenterX = offset.left + width / 2
        let wheelCenterY = offset.top + height / 2
        
        let clientX = e.touches[0].clientX
        let clientY = e.touches[0].clientY + $(window).scrollTop()
        // let clientY = e.touches[0].clientY;
        
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
}});

$('.control.knob > .wheel').on({ 'touchend' : function(){ 
    // console.log("end")
    rotationEnabled = false
    $("body").removeClass("scrollLocked")
    
    targetWheel.parent().addClass("loading")
    targetWheel.addClass("unclicked")
    targetWheel.parent().find("img.loading").fadeIn(200)
    
    setTimeout(function(){
        // jt.find("img.loading").fadeOut(200)
        $('.control.knob').find('img.loading').fadeOut(200)
        $('.control.knob').removeClass("loading")
    }, 1000)
}});
