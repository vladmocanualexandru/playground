const GLYPHICONS=['asterisk','plus','euro','euro','minus','cloud','envelope','pencil','glass','music','search','heart','star','star-empty','user','film','th-large','th','th-list','ok','remove','zoom-in','zoom-out','off','signal','cog','trash','home','file','time','road','download-alt','download','upload','inbox','play-circle','repeat','refresh','list-alt','lock','flag','headphones','volume-off','volume-down','volume-up','qrcode','barcode','tag','tags','book','bookmark','print','camera','font','bold','italic','text-height','text-width','align-left','align-center','align-right','align-justify','list','indent-left','indent-right','facetime-video','picture','map-marker','adjust','tint','edit','share','check','move','step-backward','fast-backward','backward','play','pause','stop','forward','fast-forward','step-forward','eject','chevron-left','chevron-right','plus-sign','minus-sign','remove-sign','ok-sign','question-sign','info-sign','screenshot','remove-circle','ok-circle','ban-circle','arrow-left','arrow-right','arrow-up','arrow-down','share-alt','resize-full','resize-small','exclamation-sign','gift','leaf','fire','eye-open','eye-close','warning-sign','plane','calendar','random','comment','magnet','chevron-up','chevron-down','retweet','shopping-cart','folder-close','folder-open','resize-vertical','resize-horizontal','hdd','bullhorn','bell','certificate','thumbs-up','thumbs-down','hand-right','hand-left','hand-up','hand-down','circle-arrow-right','circle-arrow-left','circle-arrow-up','circle-arrow-down','globe','wrench','tasks','filter','briefcase','fullscreen','dashboard','paperclip','heart-empty','link','phone','pushpin','usd','gbp','sort','sort-by-alphabet','sort-by-alphabet-alt','sort-by-order','sort-by-order-alt','sort-by-attributes','sort-by-attributes-alt','unchecked','expand','collapse-down','collapse-up','log-in','flash','log-out','new-window','record','save','open','saved','import','export','send','floppy-disk','floppy-saved','floppy-remove','floppy-save','floppy-open','credit-card','transfer','cutlery','header','compressed','earphone','phone-alt','tower','stats','sd-video','hd-video','subtitles','sound-stereo','sound-dolby','sound-5-1','sound-6-1','sound-7-1','copyright-mark','registration-mark','cloud-download','cloud-upload','tree-conifer','tree-deciduous','cd','save-file','open-file','level-up','copy','paste','alert','equalizer','king','queen','pawn','bishop','knight','baby-formula','tent','blackboard','bed','apple','erase','hourglass','lamp','duplicate','piggy-bank','scissors','bitcoin','btc','xbt','yen','jpy','ruble','rub','scale','ice-lolly','ice-lolly-tasted','education','option-horizontal','option-vertical','menu-hamburger','modal-window','oil','grain','sunglasses','text-size','text-color','text-background','object-align-top','object-align-bottom','object-align-horizontal','object-align-left','object-align-vertical','object-align-right','triangle-right','triangle-left','triangle-bottom','triangle-top','console','superscript','subscript','menu-left','menu-right','menu-down','menu-up']

function getTileSize() {
    return $(window).width()*0.9999/GRID_SIZE
} 

// function addControl(line, column, type, sizeRatio, color, label, ...customData) {
function addControl(config) {
    let newControl = $("#controlPrototypeContainer ."+config.type).clone(true)

    if (config.hasOwnProperty("sizeRatio")) {
        newControl.attr("data-size-ratio", config.sizeRatio)
    } else {
        newControl.attr("data-width-ratio", config.widthRatio)
        newControl.attr("data-height-ratio", config.heightRatio)
    }

    newControl.attr("data-position-line", config.line)
    newControl.attr("data-position-column", config.column)

    newControl.find(".label").text(config.label)

    controlFactory[config.type](newControl, config).appendTo("#controlContainer")
}   

function adjustControls(tileSize){
    $("#controlContainer").children(".control").each(function(index, e){
        let je = $(e)

        let line = parseInt(je.attr("data-position-line"))
        let column = parseInt(je.attr("data-position-column"))

        je.css("top", Math.round(line*tileSize)+"px")
        je.css("left", Math.round(column*tileSize)+"px")

        if (je.attr("data-size-ratio") != undefined){
            let sizeRatio = parseInt(je.attr("data-size-ratio"))
            
            // substract 10 to compensate for 5px border
            je.css("width", Math.round(tileSize*sizeRatio-10)+"px")
            je.css("height", Math.round(tileSize*sizeRatio-10)+"px")
        } else {
            let widthRatio = parseInt(je.attr("data-width-ratio"))
            let heightRatio = parseInt(je.attr("data-height-ratio"))

            // substract 10 to compensate for 5px border
            je.css("width", Math.round(tileSize*widthRatio-10)+"px")
            je.css("height", Math.round(tileSize*heightRatio-10)+"px")
        }

    })
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
}

function getRandomIcon() {
    return GLYPHICONS[Math.round(Math.random()*(GLYPHICONS.length-1))]
}

$(window).resize(function() {
    adjustControls(getTileSize())
});

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height()*0.9) {
        $("body").css("height", (parseInt($("body").css("height"))+$(window).height())+"px")
    }
});



addControl({line:0, column:0, type:"control.slider", widthRatio:2, heightRatio:10, color:generateRandomColor(), label:"Slider 2x10", data:{}})
addControl({line:0, column:2, type:"control.slider", widthRatio:2, heightRatio:10, color:generateRandomColor(), label:"Slider 2x10", data:{}})
addControl({line:0, column:4, type:"control.slider", widthRatio:2, heightRatio:10, color:generateRandomColor(), label:"Slider 2x10", data:{}})
addControl({line:0, column:6, type:"control.slider", widthRatio:2, heightRatio:10, color:generateRandomColor(), label:"Slider 2x10", data:{}})
addControl({line:0, column:8, type:"control.slider", widthRatio:2, heightRatio:10, color:generateRandomColor(), label:"Slider 2x10", data:{}})
addControl({line:0, column:10, type:"control.slider", widthRatio:2, heightRatio:10, color:generateRandomColor(), label:"Slider 2x10", data:{}})

addControl({line:10, column:0, type:"control.slider", widthRatio:3, heightRatio:8, color:generateRandomColor(), label:"Slider 3x8", data:{}})
addControl({line:10, column:3, type:"control.slider", widthRatio:3, heightRatio:8, color:generateRandomColor(), label:"Slider 3x8", data:{}})
addControl({line:10, column:6, type:"control.slider", widthRatio:3, heightRatio:8, color:generateRandomColor(), label:"Slider 3x8", data:{}})
addControl({line:10, column:9, type:"control.slider", widthRatio:3, heightRatio:8, color:generateRandomColor(), label:"Slider 3x8", data:{}})

addControl({line:18, column:0, type:"control.slider", widthRatio:4, heightRatio:6, color:generateRandomColor(), label:"Slider 4x6", data:{}})
addControl({line:18, column:4, type:"control.slider", widthRatio:4, heightRatio:6, color:generateRandomColor(), label:"Slider 4x6", data:{}})
addControl({line:18, column:8, type:"control.slider", widthRatio:4, heightRatio:6, color:generateRandomColor(), label:"Slider 4x6", data:{}})

addControl({line:24, column:0, type:"control.slider", widthRatio:6, heightRatio:4, color:generateRandomColor(), label:"Slider 6x4", data:{}})
addControl({line:24, column:6, type:"control.slider", widthRatio:6, heightRatio:4, color:generateRandomColor(), label:"Slider 6x4", data:{}})

addControl({line:28, column:0, type:"control.button.mono", sizeRatio:4, color:generateRandomColor(), label:"Button 4x4", data:{icon:getRandomIcon()}})
addControl({line:28, column:4, type:"control.button.mono", sizeRatio:4, color:generateRandomColor(), label:"Button 4x4", data:{icon:getRandomIcon()}})
addControl({line:28, column:8, type:"control.button.mono", sizeRatio:4, color:generateRandomColor(), label:"Button 4x4", data:{icon:getRandomIcon()}})
addControl({line:32, column:0, type:"control.knob", sizeRatio:6, color:generateRandomColor(), label:"Infinite knob 6x6", data:{isInfinite:true}})
addControl({line:32, column:6, type:"control.knob", sizeRatio:6, color:generateRandomColor(), label:"Fixed knob 6x6", data:{isInfinite:false}})

window.dispatchEvent(new Event('resize'))