function addToFontZoomCookie(value)
{
    Cookies.set('fontZoom', parseFloat(Cookies.get('fontZoom')) + value)
}

function getFontZoomCookie(){ return parseFloat(Cookies.get('fontZoom')) }

function parseBool(val) { return val == 'true' }

function setHighContrastCookie(value) 
{ 
    Cookies.set('isHighContrast', value)
}

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
    if(factor != 0)
    {
        if(addToCookie)
            addToFontZoomCookie(factor)
        $('body').find('*').each(function(){
            fsize = parseFloat($(this).css('font-size')) + factor
            $(this).css('font-size',fsize)
        })
    }
}

function applyHighContrast()
{
    setHighContrastCookie(true)
    //text
    $('<style>').text(
        "\
            .highContrastText\
            {\
                color: yellow !important;\
                background-color: black !important;\
            }\
        ").appendTo('head');

    $('*').addClass('highContrastText')

    //border
    $('<style>').text(
        "\
            .highContrastBorder\
            {\
                border: 1px solid white !important;\
            }\
        ").appendTo('head');

    $('section, nav, button, input, .card-body, .drag, .drop').addClass('highContrastBorder')
    $('.active').find('span').addClass('highContrastBorder')

    //vlibras
    $('#canvas').attr('style', 'background-color: white !important')
    $('.vw-text:after').attr('style', 'color: white !important')
}

function removeHighContrast()
{
    setHighContrastCookie(false)
    $('*').removeClass('highContrastText')
    $('*').removeClass('highContrastBorder')
}

function initialize()
{
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
  $('#accessibilityResetThemeBtn').click(function() {
    removeHighContrast()
  })

  $('#accessibilityHighContrastBtn').click(function () {
    applyHighContrast()
  })

  $('#accessibilityIncreaseFontBtn').click(function () {
    zoomFonts(+1)
  })

  $('#accessibilityDecreaseFontBtn').click(function () {
    zoomFonts(-1)
  })

  $('#accessibilityResetFontBtn').click(function () {
    resetFonts()
  })

  initialize()
})