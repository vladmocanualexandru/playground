let currentRow = 0

function addControl(positionTileId, type, sizeRatio, color, label, tileSize, ...customData) {
    controlFactory[type]($("#elementFactory ."+type).clone(true), positionTileId, sizeRatio, color, label, tileSize, customData).appendTo("#controlContainer")
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
let windowHeight = $(window).height()*5

for (i=0; i<windowHeight/tileSize; i++) {
    addRowsOfTiles(1)
} 

addControl("tile_0_0", "control.button.mono", 3, "#0088E0", "Mail", tileSize, "envelope")
addControl("tile_0_9", "control.button.mono", 3, "#E00000", "Shutdown", tileSize, "off")
addControl("tile_0_3", "control.button.mono", 3, "#00E000", "Play/Pause", tileSize, "play")
addControl("tile_0_6", "control.button.mono", 3, "#00E000", "Next", tileSize, "step-forward")

addControl("tile_9_0", "control.button.mono", 4, "#E08800", "Merge all", tileSize, "compressed")
addControl("tile_19_0", "control.button.mono", 12, "#0088E0", "Big button chungus", tileSize, "apple")
addControl("tile_16_3", "control.button.mono", 2, "#f0f000", "Mullah", tileSize, "euro")
addControl("tile_18_11", "control.button.mono", 1, "#00E000", "Smol", tileSize, "heart")

addControl("tile_3_0", "control.knob", 6, "#00E088", "Infinite", tileSize, true)
addControl("tile_3_6", "control.knob", 6, "#E000E0", "Fixed", tileSize, false)

addControl("tile_9_4", "control.knob", 4, "#b7ff00", "Fixed", tileSize, false)
addControl("tile_13_7", "control.knob", 5, "#f0f0f0", "Fixed", tileSize, false)
addControl("tile_9_8", "control.knob", 4, "#00ff33", "Infinite", tileSize, true)
addControl("tile_13_0", "control.knob", 3, "#80ff00", "Fixed", tileSize, false)
addControl("tile_13_3", "control.knob", 3, "#00fbff", "Infinite", tileSize, true)
addControl("tile_16_0", "control.knob", 3, "#2f00ff", "Infinite", tileSize, true)
addControl("tile_13_6", "control.knob", 1, "#E00000", "Smol", tileSize, false)
addControl("tile_16_5", "control.knob", 2, "#8888ff", "fixed", tileSize, false)
addControl("tile_31_0", "control.knob", 12, "#8800E0", "Big knob chungus", tileSize, true)


adjustTileSize(tileSize)
adjustControls(tileSize)