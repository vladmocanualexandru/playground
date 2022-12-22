controlFactory["control.button.mono"] = function(je, config){
    let icon = config.data.icon
    
    je.find(".icon").addClass("glyphicon-"+icon)
    je.find(".icon").css("color", config.color)
    
    return je
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