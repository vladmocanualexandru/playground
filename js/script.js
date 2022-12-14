const GLYPHICONS=['asterisk','plus','euro','euro','minus','cloud','envelope','pencil','glass','music','search','heart','star','star-empty','user','film','th-large','th','th-list','ok','remove','zoom-in','zoom-out','off','signal','cog','trash','home','file','time','road','download-alt','download','upload','inbox','play-circle','repeat','refresh','list-alt','lock','flag','headphones','volume-off','volume-down','volume-up','qrcode','barcode','tag','tags','book','bookmark','print','camera','font','bold','italic','text-height','text-width','align-left','align-center','align-right','align-justify','list','indent-left','indent-right','facetime-video','picture','map-marker','adjust','tint','edit','share','check','move','step-backward','fast-backward','backward','play','pause','stop','forward','fast-forward','step-forward','eject','chevron-left','chevron-right','plus-sign','minus-sign','remove-sign','ok-sign','question-sign','info-sign','screenshot','remove-circle','ok-circle','ban-circle','arrow-left','arrow-right','arrow-up','arrow-down','share-alt','resize-full','resize-small','exclamation-sign','gift','leaf','fire','eye-open','eye-close','warning-sign','plane','calendar','random','comment','magnet','chevron-up','chevron-down','retweet','shopping-cart','folder-close','folder-open','resize-vertical','resize-horizontal','hdd','bullhorn','bell','certificate','thumbs-up','thumbs-down','hand-right','hand-left','hand-up','hand-down','circle-arrow-right','circle-arrow-left','circle-arrow-up','circle-arrow-down','globe','wrench','tasks','filter','briefcase','fullscreen','dashboard','paperclip','heart-empty','link','phone','pushpin','usd','gbp','sort','sort-by-alphabet','sort-by-alphabet-alt','sort-by-order','sort-by-order-alt','sort-by-attributes','sort-by-attributes-alt','unchecked','expand','collapse-down','collapse-up','log-in','flash','log-out','new-window','record','save','open','saved','import','export','send','floppy-disk','floppy-saved','floppy-remove','floppy-save','floppy-open','credit-card','transfer','cutlery','header','compressed','earphone','phone-alt','tower','stats','sd-video','hd-video','subtitles','sound-stereo','sound-dolby','sound-5-1','sound-6-1','sound-7-1','copyright-mark','registration-mark','cloud-download','cloud-upload','tree-conifer','tree-deciduous','cd','save-file','open-file','level-up','copy','paste','alert','equalizer','king','queen','pawn','bishop','knight','baby-formula','tent','blackboard','bed','apple','erase','hourglass','lamp','duplicate','piggy-bank','scissors','bitcoin','btc','xbt','yen','jpy','ruble','rub','scale','ice-lolly','ice-lolly-tasted','education','option-horizontal','option-vertical','menu-hamburger','modal-window','oil','grain','sunglasses','text-size','text-color','text-background','object-align-top','object-align-bottom','object-align-horizontal','object-align-left','object-align-vertical','object-align-right','triangle-right','triangle-left','triangle-bottom','triangle-top','console','superscript','subscript','menu-left','menu-right','menu-down','menu-up']

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

function generateRandomColor() {
    let color = "#"

    let permittedDarkValues = 2
    for (i=0; i<3; i++) {
        let randVal = Math.random()

        if (randVal<0.66) {
            if (permittedDarkValues>0) {
                permittedDarkValues--
                colorComponent = (Math.round(255*randVal)).toString(16)
                color += (colorComponent.length==1?'0':'')+(Math.round(255*randVal)).toString(16)
            } else {
                color += "FF"
            }
        } else {
            color += (Math.round(255*randVal)).toString(16)
        }
    }

    return color
    // return "#"+Math.floor(3355443+Math.random()*13421772).toString(16)
}

function getRandomIcon() {
    return GLYPHICONS[Math.round(Math.random()*(GLYPHICONS.length-1))]
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

addControl("tile_0_0", "control.button.mono", 2,  generateRandomColor(), "2x2", tileSize, getRandomIcon())
addControl("tile_0_2", "control.button.mono", 2,  generateRandomColor(), "2x2", tileSize, getRandomIcon())
addControl("tile_0_4", "control.button.mono", 2,  generateRandomColor(), "2x2", tileSize, getRandomIcon())
addControl("tile_0_6", "control.button.mono", 2,  generateRandomColor(), "2x2", tileSize, getRandomIcon())
addControl("tile_0_8", "control.button.mono", 2,  generateRandomColor(), "2x2", tileSize, getRandomIcon())
addControl("tile_0_10", "control.button.mono", 2, generateRandomColor(), "2x2", tileSize, getRandomIcon())
addControl("tile_2_0", "control.button.mono", 3,  generateRandomColor(), "3x3", tileSize, getRandomIcon())
addControl("tile_2_3", "control.button.mono", 3,  generateRandomColor(), "3x3", tileSize, getRandomIcon())
addControl("tile_2_6", "control.button.mono", 3,  generateRandomColor(), "3x3", tileSize, getRandomIcon())
addControl("tile_2_9", "control.button.mono", 3,  generateRandomColor(), "3x3", tileSize, getRandomIcon())
addControl("tile_5_0", "control.knob", 4,        generateRandomColor(), "4x4 fix", tileSize, false)
addControl("tile_5_4", "control.knob", 4,        generateRandomColor(), "4x4 fix", tileSize, false)
addControl("tile_5_8", "control.knob", 4,        generateRandomColor(), "4x4 fix", tileSize, false)
addControl("tile_9_0", "control.button.mono", 4, generateRandomColor(), "4x4", tileSize, getRandomIcon())
addControl("tile_9_4", "control.button.mono", 4, generateRandomColor(), "4x4", tileSize, getRandomIcon())
addControl("tile_9_8", "control.button.mono", 4, generateRandomColor(), "4x4", tileSize, getRandomIcon())
addControl("tile_13_0", "control.knob", 4,        generateRandomColor(), "4x4 inf", tileSize, true)
addControl("tile_13_4", "control.knob", 4,        generateRandomColor(), "4x4 inf", tileSize, true)
addControl("tile_13_8", "control.knob", 4,        generateRandomColor(), "4x4 inf", tileSize, true)
addControl("tile_17_0", "control.button.mono", 6, generateRandomColor(), "6x6", tileSize, getRandomIcon())
addControl("tile_17_6", "control.button.mono", 6, generateRandomColor(), "6x6", tileSize, getRandomIcon())
addControl("tile_23_0", "control.knob", 6,        generateRandomColor(), "6x6 fix", tileSize, false)
addControl("tile_23_6", "control.knob", 6,        generateRandomColor(), "6x6 inf", tileSize, true)
addControl("tile_29_0", "control.button.mono", 12,generateRandomColor(), "12x12", tileSize, getRandomIcon())
addControl("tile_41_0", "control.knob", 12,       generateRandomColor(), "12x12 fix", tileSize, false)

// addControl("tile_9_4", "control.knob", 4, "#b7ff00", "Fixed", tileSize, false)


adjustTileSize(tileSize)
adjustControls(tileSize)