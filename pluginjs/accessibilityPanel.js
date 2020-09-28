function addToFontZoomCookie(value)
{
    Cookies.set('fontZoom', parseFloat(Cookies.get('fontZoom')) + value)
}

function setFontZoomCookie(value){Cookies.set('fontZoom', value)}

function getFontZoomCookie(){ return parseFloat(Cookies.get('fontZoom')) }

function parseBool(val) { return val == 'true' }

function setHighContrastCookie(value) { Cookies.set('isHighContrast', value) }

function isHighContrastCookie() { return parseBool(Cookies.get('isHighContrast'))}




function resetFonts()
{
    cookie = getFontZoomCookie()
    if(cookie != 0)
    {
        $('body').find('*').each(function(){
            fsize = parseFloat($(this).css('font-size')) - cookie
            $(this).css('font-size',fsize)
        })
        Cookies.set('fontZoom', 0)
    }
}

function zoomFonts(factor, addToCookie=true)
{
    const lLimit = -5.0
    const hLimit = 10.0

    if(addToCookie)
        addToFontZoomCookie(factor)
    let zCookie = getFontZoomCookie()

    if(zCookie >= lLimit && 
        zCookie <= hLimit)
    {
        $('body').find('*').each(function(){
            fsize = parseFloat($(this).css('font-size')) + factor
            $(this).css('font-size',fsize)
        })
    }
    else
    {
        if(zCookie < lLimit)
            setFontZoomCookie(lLimit)
        else if(zCookie > hLimit)
            setFontZoomCookie(hLimit)
    }
}

function applyHighContrast()
{
    setHighContrastCookie(true)
    $('<style id="styleHighContrast">').text(
        `
            .highContrastBlackBackground
            {
                background-color: black !important;
            }
            .highContrastWhiteText
            {
                color: white !important;
            }
            .highContrastYellowText
            {
                color: yellow !important;
            }
            .highContrastPlaceholder::placeholder
            {
                color: white !important;
                font-style: italic !important;
            }
            .highContrastBorder
            {
                border: 1px solid white !important;
            }
        `).appendTo('head');
}


function removeHighContrast()
{
    setHighContrastCookie(false)
    $('#styleHighContrast').remove()
}

/*
function enableHighContrastIcon()
{
    $('#accessibilityHighContrastBtn').text("visibility")
}

function disableHighContrastIcon()
{
    $('#accessibilityHighContrastBtn').text("visibility_off")
}
*/

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




function addBarStyle()
{
    $('<style>').text(`
        #accessibilityBar
        {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #accessibilityBar a
        {
            padding-right: 2vmin;
        }
    `).appendTo('head')
}

function generateBarButtons()
{
    return `
            <a href="#" class="material-icons" 
                id="accessibilityHighContrastBtn">brightness_medium</a>
            <a href="#" class="material-icons" 
                id="accessibilityDecreaseFontBtn">zoom_out</a>
            <a href="#" class="material-icons" 
                id="accessibilityResetFontBtn">youtube_searched_for</a>
            <a href="#" class="material-icons" 
                id="accessibilityIncreaseFontBtn">zoom_in</a>
            `
}

function addDashboardBar()
{
    $('.popover-region-notifications').parent().before(
        `<li id="accessibilityBar" class="
            navItem highContrastBlackBackground highContrastWhiteText">
            ${generateBarButtons()}
        </li>`)
}

function addLoginBar()
{
    $('#region-main').before(
        `<nav id="accessibilityBar">
            <a>Precisando de ajuda?</a>
            ${generateBarButtons()}
        </nav>`)
    $('#accessibilityBar').css({
        "justify-content" : "flex-end",
        "padding-top" : "2vh"})
}

function initializeBar()
{
    addBarStyle()
    if(window.location.pathname.includes('login/index.php'))
        addLoginBar()
    else
        addDashboardBar()
}

function initializeZoom()
{
    zoomFonts(0, false)
}

function initializeHighContrast()
{
    //regular text
    $('body').find('*').not('script, style').addClass('highContrastBlackBackground')
    $('body').find('*').not('script, style, a').addClass('highContrastWhiteText')
    //links
    $('body').find('a').addClass('highContrastYellowText')
    //inputs
    $('input').addClass('highContrastPlaceholder')
    //borders
    $(`section, nav, button, input, .card-body, .drag, .drop, .alert
        , .card-header, footer, dropdown-menu`).addClass('highContrastBorder')
    $('.active').find('span').addClass('highContrastBorder')

    //vlibras
    $('#canvas').attr('style', 'background-color: white !important')
    $('.vw-text:after').attr('style', 'color: white !important')
}

function initialize()
{
    initializeBar()
    initializeHighContrast()
    initializeZoom()

    if(Cookies.get('fontZoom') == undefined)
        Cookies.set('fontZoom', 0, {expires: 365})
    else
        zoomFonts(getFontZoomCookie(), false)
    if(isHighContrastCookie() == undefined)
        Cookies.set('isHighContrast', 0, {expires: 365})
    else
        if(isHighContrastCookie())
            applyHighContrast()
}

$(document).ready(function() {
    const zoomStep = 1

    initialize()

    $('#accessibilityHighContrastBtn').click(function () {
        toggleHighContrast()
    })

    $('#accessibilityIncreaseFontBtn').click(function () {
        zoomFonts(zoomStep, true)
    })

    $('#accessibilityDecreaseFontBtn').click(function () {
        zoomFonts(-zoomStep, true)
    })

    $('#accessibilityResetFontBtn').click(function () {
        resetFonts()
    })
})