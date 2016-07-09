
window.addEventListener("popstate", function(e){
    var ext = location.href.split('#')[1];
    if(typeof ext === 'undefined' || ext === '') {
        setNavigation(1)
    } else if(ext == 'one') {
        setNavigation(2)
        goToSection(2);
    } else if(ext == 'two') {
        setNavigation(3)
        goToSection(3);
    } else if(ext == 'three') {
        setNavigation(4)
        goToSection(4);
    }
});

$(function() {
    var ext = location.href.split('#')[1];
    console.log(ext);

    if(typeof ext === 'undefined' || ext === '') {
        setNavigation(1)
    } else if(ext == 'one') {
        setNavigation(2)
        goToSection(2);
    } else if(ext == 'two') {
        setNavigation(3)
        goToSection(3);
    } else if(ext == 'three') {
        setNavigation(4)
        goToSection(4);
    }
});

$('.filler').css('height', $(document).height());

var section = 1;
var animating = false;
$(document).on('mousewheel', function(e) {
    e.preventDefault();
    var currentPosition = $('.active').index('.bullet')+1;
    var movement = e.originalEvent.deltaY || -e.originalEvent.wheelDelta;
    console.log(e);
    if(animating) {
        return;
    }
    animating = true;
    if(movement < 0) {
        moveNavigation('up');
        switch(currentPosition) {
            case 2:
                goToSection(1);

                break;
            case 3:
                goToSection(2);
                break;
            case 4:
                goToSection(3);
                break;
        }
    } else {
        console.log(currentPosition);
        moveNavigation('down');
        switch(currentPosition) {

            case 1:
                goToSection(2);
                break;
            case 2:
                goToSection(3);
                break;
            case 3:
                goToSection(4);
                break;
        }
    }

    setTimeout(function() {
        animating = false;
    }, 1100);
})

function goToSection(section) {

    $('.leonardo').removeClass().addClass('leonardo');
    $('.section-one-text').removeClass().addClass('section-one-text');
    $('.section-two-text').removeClass().addClass('section-two-text');
    $('.section-three-text').removeClass().addClass('section-three-text');
    $('.section-four-text').removeClass().addClass('section-four-text');
    if($('.giovanni').hasClass('giovanni--dress')) {
        $('.giovanni').removeClass().addClass('giovanni').addClass('giovanni--dress');
    } else {
        $('.giovanni').removeClass().addClass('giovanni')
    }
    history.pushState(null, null, '#')
    if(section == 2) {
        $('.giovanni').addClass('giovanni--right');
        $('.section-one-text').addClass('move-down');
        $('.section-two-text').addClass('show');
        history.pushState(null, null, '#one')
    }
    if(section == 3) {
        $('.giovanni').addClass('giovanni--back');
        $('.section-two-text').addClass('fade-away');
        $('.leonardo').addClass('show');
        $('.section-one-text').addClass('move-down');
        $('.section-three-text').addClass('show');
        history.pushState(null, null, '#two')
    }
    if(section == 4) {
        $('.giovanni').addClass('giovanni--up');
        $('.leonardo').addClass('leonardo--up');
        $('.section-one-text').addClass('move-down');
        $('.section-three-text').addClass('up');
        $('.section-four-text').addClass('show');
        history.pushState(null, null, '#three')
    }
}

function moveNavigation(dir) {
    var currentActive = $('nav .bullet.active');
    if(dir == "up") {
        var previous = currentActive.prev('.bullet')
        if(previous.length <= 0) {
            return;
        }
        currentActive.removeClass('active');
        previous.removeClass('seen');
        previous.addClass('active');
    }

    if(dir == "down") {
        var next = currentActive.next('.bullet')
        if(next.length <= 0) {
            return;
        }
        currentActive.removeClass('active');
        currentActive.addClass('seen');
        next.addClass('active');
    }
}

function setNavigation(pos) {
    $('.bullet').removeClass().addClass('bullet');
    $('.bullet:nth-child('+pos+')').addClass('active').prevAll().addClass('seen');
}

$('.bullet').on('click', function() {
    var thisPos = $('.bullet').index(this) + 1;
    setNavigation(thisPos);
    goToSection(thisPos);
})

var jumping = false;
$('.giovanni--jump-action').on('click', function() {
    if(!jumping) {
        $('.giovanni').addClass('giovanni--jump');
        jumping = true;
        setInterval(function() {
            $('.giovanni--jump').removeClass('giovanni--jump');
            jumping = false;
        }, 2000)
    }
})

var spin = false;
$('.giovanni--spin-action').on('click', function() {
    if(!spin) {
        console.log(spin);
        $('.giovanni').addClass('giovanni--spin');
        spin = true;
        setInterval(function() {
            $('.giovanni--spin').removeClass('giovanni--spin');
            spin = false;
        }, 2000)
    }
})

$('.giovanni--dress-action').on('click', function() {
    if($('.giovanni').hasClass('giovanni--dress')) {
        $('.giovanni').removeClass('giovanni--dress');
    } else {
        $('.giovanni').addClass('giovanni--dress');
    }
})

var tellingJoke = false;
$('.leonardo').on('click', function() {
    if(!tellingJoke) {
        tellingJoke = true;
        $('.speech-bubble').html("<span>What do you call a lying frog?</span>");
        $('.speech-bubble').addClass('show');
        setTimeout(function() {
            $('.speech-bubble').removeClass('show');
            setTimeout(function() {
                $('.speech-bubble').html("<span>An <br />AmFIBian!</span>");
                $('.speech-bubble').addClass('show');
                setTimeout(function() {
                    $('.speech-bubble').removeClass('show');
                    tellingJoke = false;
                }, 3000)
            }, 500);
        }, 3000)
    }
});
