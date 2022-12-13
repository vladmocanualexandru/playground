let currentRow = 0

function addControl(positionTileId, type, sizeRatio, color, icon, label, tileSize) {
    controlFactory[type](positionTileId, type, sizeRatio, color, icon, label, tileSize).appendTo("#controlContainer")
}   

function adjustTileSize(tileSize){
    $(".tile").css("height", tileSize+"px")
    $(".tile").css("width", tileSize+"px")
}

function adjustControls(tileSize){
    $("#controlContainer").children(".control").each(function(index, e){
        let je = $(e)
        let position = $("#"+je.attr("data-position-tile")).position()
        je.css("left", position.left+"px")
        je.css("top", position.top+"px")

        let sizeRatio = parseInt(je.attr("data-size-ratio"))
        je.css("width", (tileSize*sizeRatio-10)+"px")
        je.css("height", (tileSize*sizeRatio-10)+"px")

    })
}

function addRowsOfTiles(rowCount) {
    for (rowIndex = 0; rowIndex<rowCount; rowIndex++){
        for (colIndex=0; colIndex<GRID_SIZE; colIndex++) {
            let coord =(currentRow+rowIndex)+"_"+colIndex
            let newElement = $("#elementFactory .tile").clone(true)

            newElement.attr("id", "tile_"+coord)

            newElement.appendTo("#tileContainer")
        }
    }

    currentRow+=rowCount
}

$( window ).resize(function() {
    let tileSize = Math.floor($(window).width()*0.99/GRID_SIZE)

    adjustTileSize(tileSize)
    adjustControls(tileSize)
});

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height()*0.9) {
        addRowsOfTiles(12)
    }
});

let tileSize = Math.floor($(window).width()*0.99/GRID_SIZE)
let windowHeight = $(window).height()*2

for (i=0; i<windowHeight/tileSize; i++) {
    addRowsOfTiles(1)
} 

addControl("tile_0_0", "control.button.mono", 3, "#0088E0", "envelope", "Mail", tileSize)
addControl("tile_0_9", "control.button.mono", 3, "#E00000", "off", "Shutdown", tileSize)

addControl("tile_3_0", "control.button.mono", 3, "#00E000", "play", "Play/Pause", tileSize)
addControl("tile_3_9", "control.button.mono", 3, "#00E000", "step-forward", "Next", tileSize)

addControl("tile_0_3", "control.knob", 6, "#00E000", "", "Volume", tileSize)

addControl("tile_6_0", "control.button.mono", 3, "#E0E000", "save", "Git pull", tileSize)
addControl("tile_6_3", "control.button.mono", 3, "#E0E000", "search", "Git status", tileSize)
addControl("tile_6_6", "control.button.mono", 3, "#E0E000", "export", "Git commit", tileSize)
addControl("tile_6_9", "control.button.mono", 3, "#E0E000", "saved", "Git push", tileSize)

addControl("tile_9_0", "control.button.mono", 4, "#E08800", "compressed", "Merge all", tileSize)
addControl("tile_9_4", "control.knob", 4, "#b7ff00", "", "Brightness", tileSize)
addControl("tile_9_8", "control.knob", 4, "#00ff33", "", "Contrast", tileSize)

addControl("tile_13_6", "control.button.mono", 6, "#E0E0E0", "apple", "Check latest iphone deals", tileSize)
addControl("tile_13_0", "control.knob", 3, "#ff8800", "", "Tolerance", tileSize)
addControl("tile_13_3", "control.knob", 3, "#00fbff", "", "Smoothness", tileSize)
addControl("tile_16_0", "control.knob", 3, "#2f00ff", "", "Pitch", tileSize)
addControl("tile_16_3", "control.knob", 3, "#80ff00", "", "Tempo", tileSize)


adjustTileSize(tileSize)
adjustControls(tileSize)