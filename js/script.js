let currentRow = 0

function addControl(positionTileId, type, color, icon, label, tileSize) {
    controlFactory[type](positionTileId, type, color, icon, label, tileSize).appendTo("#controlContainer")
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
let windowHeight = $(window).height()

for (i=0; i<windowHeight/tileSize; i++) {
    addRowsOfTiles(1)
} 

addControl("tile_0_0", "control.button.mono", "#FF8800", "object-align-vertical", "Align middle", tileSize)
addControl("tile_0_3", "control.button.mono", "#FF8800", "object-align-horizontal", "Align center", tileSize)
addControl("tile_0_6", "control.button.mono", "#00E000", "volume-down", "Volume -", tileSize)
addControl("tile_0_9", "control.button.mono", "#00E000", "volume-up", "Volume +", tileSize)

addControl("tile_3_0", "control.button.mono", "#EEE000", "save", "Pull", tileSize)
addControl("tile_3_3", "control.button.mono", "#EEE000", "open", "Push", tileSize)
addControl("tile_3_6", "control.button.mono", "#00E000", "play", "Play/Pause", tileSize)
addControl("tile_3_9", "control.button.mono", "#00E000", "step-forward", "Next", tileSize)

addControl("tile_6_0", "control.knob", "#FF8800", "", "Brightness", tileSize)
addControl("tile_6_4", "control.knob", "#EEE000", "", "Contrast", tileSize)
addControl("tile_6_8", "control.knob", "#00E000", "", "Saturation", tileSize)

adjustTileSize(tileSize)
adjustControls(tileSize)