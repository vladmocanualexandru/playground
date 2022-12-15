controlFactory["control.button.mono"] = function(newControl, color, ...customData){
    let icon = customData[0]
    
    newControl.find(".icon").addClass("glyphicon-"+icon)
    newControl.find(".icon").css("color", color)
    
    return newControl
}

$(".control.button.mono").click(function(){
    let jt = $(this)
    jt.find("img.loading").fadeIn(200)
    jt.addClass("clicked")
    
    setTimeout(function(){
        jt.find("img.loading").fadeOut(200)
        jt.removeClass("clicked")
    }, 1000)
})