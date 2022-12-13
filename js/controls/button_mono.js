controlFactory["control.button.mono"] = function(newControl, positionTileId, sizeRatio, color, label, tileSize, ...customData){
    let icon = customData[0]
    
    newControl.attr("data-size-ratio", sizeRatio)
    
    let position = $("#"+positionTileId).position()
    
    newControl.css("left", position.left+"px")
    newControl.css("top", position.top+"px")
    newControl.attr("data-position-tile", positionTileId)
    
    newControl.css("width", (tileSize*sizeRatio-10)+"px")
    newControl.css("height", (tileSize*sizeRatio-10)+"px")
    
    newControl.find(".icon").addClass("glyphicon-"+icon)
    newControl.find(".icon").css("color", color)
    
    newControl.find(".label").text(label)
    
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