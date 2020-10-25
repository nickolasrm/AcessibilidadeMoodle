function addToFontZoomCookie(value)
{
    Cookies.set('fontZoom', parseFloat(Cookies.get('fontZoom')) + value)
}

function setFontZoomCookie(value){Cookies.set('fontZoom', value)}

function getFontZoomCookie(){ return parseFloat(Cookies.get('fontZoom')) }

function parseBoolToInt(val) { return val ? 1 : 0 }

function parseBool(val) { return val == 'true' }

function setHighContrastCookie(value) { Cookies.set('isHighContrast', value) }

function isHighContrastCookie() { return parseBool(Cookies.get('isHighContrast'))}

function setGrayscaleCookie(value) { Cookies.set('isGrayscale', value) }

function isGrayscaleCookie() { return parseBool(Cookies.get('isGrayscale'))}



function resetFonts()
{
    setFontZoomCookie(1)
    zoomFonts(0)
}

function zoomFonts(addToFactor)
{
    const lLimit = 0.7
    const hLimit = 1.3

    addToFontZoomCookie(addToFactor)
    let zCookie = getFontZoomCookie()

    if(zCookie < lLimit)
        setFontZoomCookie(lLimit)
    else if(zCookie > hLimit)
        setFontZoomCookie(hLimit)

    $('html').css('zoom', zCookie)
}





function applyHighContrast()
{
    setHighContrastCookie(true)
    $('<style id="styleHighContrast">').text(
        `
            /*Geral e chat*/
            .highContrastBlackBackground, .yui-layout-bd, .chat-message, 
            .card-body, .list-group-item, card-footer, .bg-white, .message,
            .dropdown-menu, .popover-header, .popover-body
            {
                background-color: black !important;
            }
            .progress-bar
            {
                background: yellow !important;
            }
            .highContrastWhiteText, .text, .time, .event, .text-truncate,
            .dropdown-item, .popover-body
            {
                color: white !important;
            }
            .highContrastYellowText, .chat-message-meta, a[target="_blank"], 
             .calendar-controls a
            {
                color: yellow !important;
            }
            .highContrastPlaceholder::placeholder
            {
                color: white !important;
                font-style: italic !important;
            }
            .highContrastBorder, .message, .dropdown-menu
            {
                border: 1px solid white !important;
            }

            /*Vlibras*/
            .vw-text
            {
                color: white;
            }
            .vw-text:hover
            {
                color: yellow;
            }
            .vw-text-active
            {
                font-weight: 700;
            }
            div[vw] #gameContainer canvas
            {
                background: #E8E8E8;
            }
        </style>
        
        `).appendTo('head');
}


function removeHighContrast()
{
    setHighContrastCookie(false)
    $('#styleHighContrast').remove()
}

function toggleHighContrast()
{
    if(isHighContrastCookie())
    {
        //enableHighContrastIcon()
        removeHighContrast()
    }
    else
    {
        //disableHighContrastIcon()
        applyHighContrast()
    }
}




function applyGrayscale(factor)
{
    $('html').css('filter', `grayscale(${factor})`)
}

function toggleGrayscale()
{
    setGrayscaleCookie(!isGrayscaleCookie())
    applyGrayscale(parseBoolToInt(isGrayscaleCookie()))
}



function initializeMenuTag()
{
    $(`
        <div id="accessibilityDiv">
            <div id="accessibilityMenu">
                <span><strong>Acessibilidade</strong></span>
                <ul>
                    <li id="accessibilityHighContrastBtn" 
                        class="accessibilityMenuLi">
                        <span class="accessibilityMenuLiIcons">brightness_medium</span>
                        <span>Alto contraste</span></li>
                    <li id="accessibilityGrayscaleBtn" 
                        class="accessibilityMenuLi">
                        <span class="accessibilityMenuLiIcons">filter_b_and_w</span>
                        <span>Escala de cinza</span></li>
                    <li id="accessibilityIncreaseFontBtn"
                        class="accessibilityMenuLi">
                        <span class="accessibilityMenuLiIcons">zoom_in</span>
                        <span>Ampliar</span></li>
                    <li id="accessibilityResetFontBtn"
                        class="accessibilityMenuLi">
                        <span class="accessibilityMenuLiIcons">youtube_searched_for</span>
                    <span>Redefinir</span></li>
                    <li id="accessibilityDecreaseFontBtn"
                        class="accessibilityMenuLi">
                        <span class="accessibilityMenuLiIcons">zoom_out</span>
                        <span>Reduzir</span></li>
                </ul>
            </div>
            <div id="accessibilityToggleMenuBtn">accessibility</div>
        </div>
    `).appendTo('html')
}

function initializeMenuStyle()
{
    $(`
        <style>
            #accessibilityDiv
            {
                position: fixed;
                z-index: 1000;
                display: flex;
                left: -185px;
                top: 60%;
                transition: left 0.7s;
            }

            #accessibilityMenu
            {
                padding: 10px 20px 10px 20px;
                background: white;
                outline: 1px solid rgba(0,0,0,0.2);
                z-index: 1001;
                font-size: 17px;
                width: 185px;
            }

            #accessibilityMenu ul
            {
                    list-style: none;
                    padding-left: 0;
                    margin: 0;
                    margin-top: 6px;
                    z-index: 1005;
            }

            .accessibilityMenuLi
            {
                list-style-type: none;
                cursor: pointer;
                margin-top: 10px;
                user-select: none;
            }

            .accessibilityMenuLiIcons
            {
                font-family: 'Material Icons';
                list-style-type: none;
            }

            #accessibilityToggleMenuBtn
            {
                font-family: 'Material Icons';
                width: 40px;
                height: 40px;
                font-size: 20px;
                background: rgba(50,70,130);
                box-shadow: 0px 1px 7px rgba(0,0,0,0.6);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 0 50% 50% 0;
                cursor: pointer;
                user-select: none;
            }
        </style>
    `).appendTo('head')
}

function initializeMenu()
{
    initializeMenuTag()
    initializeMenuStyle()
}

function initializeZoom()
{
    if(Cookies.get('fontZoom') == undefined)
        setFontZoomCookie(1)
    else
        zoomFonts(0)
}

function initializeHighContrastCookie()
{
    if(isHighContrastCookie() == undefined)
        Cookies.set('isHighContrast', false, {expires: 365})
    else
        if(isHighContrastCookie())
            applyHighContrast()
}

function initializeGrayscale()
{
    if(isGrayscaleCookie == undefined)
        Cookies.set('isGrayscale', false, {expires: 365})
    else
        applyGrayscale(parseBoolToInt(isGrayscaleCookie()))
}

function initializeHighContrastStyle()
{
    //regular text
    $('body, #accessibilityDiv').find('*').not(
        'script, style, head').addClass('highContrastBlackBackground')
    $('html, #accessibilityDiv').find('*').not(
        'script, style, a').addClass('highContrastWhiteText')
    //links
    $('html').find('a').addClass('highContrastYellowText')
    //inputs
    $('input').addClass('highContrastPlaceholder')
    //borders
    $(`section, nav, button, input, .card-body, .drag, .drop, .alert
        , .card-header, footer, dropdown-menu, #accessibilityDiv div,
        .body-container, .header-container, .p-2
        `).addClass('highContrastBorder')
    $('.active').find('span').addClass('highContrastBorder')

    //vlibras
    $('#canvas').attr('style', 'background-color: white !important')
    $('.vw-text:after').attr('style', 'color: white !important')
}

function initializeHighContrast()
{
    initializeHighContrastCookie()
    initializeHighContrastStyle()
}

function initialize()
{
    initializeMenu()
    initializeHighContrast()
    initializeGrayscale()
    initializeZoom()
}

function toggleMenu()
{
    if(parseInt($('#accessibilityDiv').css('left')) < 0)
        $('#accessibilityDiv').css('left', 0)
    else
    {
        let size = parseInt($('#accessibilityMenu').css('width'))
        $('#accessibilityDiv').css('left', -size)
    }
}

$(document).ready(function() {
    const zoomStep = 0.05

    initialize()

    $('#accessibilityHighContrastBtn').click(function () {
        toggleHighContrast()
    })

    $('#accessibilityIncreaseFontBtn').click(function () {
        zoomFonts(zoomStep)
    })

    $('#accessibilityDecreaseFontBtn').click(function () {
        zoomFonts(-zoomStep)
    })

    $('#accessibilityResetFontBtn').click(function () {
        resetFonts()
    })

    $('#accessibilityToggleMenuBtn').click(function(){
        toggleMenu()
    })

    $('#accessibilityGrayscaleBtn').click(function(){
        toggleGrayscale()
    })
})