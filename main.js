/**
 * Created by EvFalselight on 20/07/2016.
 */
// var ulEl = document.querySelector(".action-list");
// var menu = document.querySelector(".menu")
//
// menu.addEventListener("click", function() {
// ulEl.style.display = "block"
// });
(function ($) {
    $('.menu').on('click', function (e) {
        $(this).children('.action-list').slideToggle(200)
    });
})(jQuery);

var anyTab = document.querySelectorAll(".tabsHint li");
anyTab.forEach(function (current) {
    current.onclick = function () {
        var lastTab;
        var anyTab = document.querySelectorAll(".tabsHint li");
        anyTab.forEach(function (current) {
            // current.style.display = "none";
            if (current.className.includes('active')) {
                lastTab = current;
                console.log(lastTab);
            }
            current.className = current.className.replace("active", "");
        });
        // current.style.display = "block";
        // current.style.backgroundColor = "#EBEBEB"
        // current.firstElementChild.style.color = "%333333"
        current.className += "active";
        var utils = $('.wrapper-for-display-none');
        var previousTabName = $(lastTab).children('a').text();
        var currentTabName = $(current).children('a').text();
        console.log(currentTabName);
        if (currentTabName.includes('Reports') || currentTabName.includes('Team')) {
            if (previousTabName.includes('My Folders')
                || previousTabName.includes('Public')) {
                utils.slideToggle(200);
            }
        } else {
            if (previousTabName.includes('Reports')
                || previousTabName.includes('Team')) {
                utils.slideToggle(200);
            }
        }
        ;
    }
});

var settingButton = $('.setting-expand-wrapper a img').eq(1);
settingButton.on('click', function (e) {
    e.preventDefault();
    if (settingButton.get(0).className.includes('active')) {
        settingButton.get(0).className = settingButton.get(0).className.replace("active-set", "");
        $('.form-urls').slideToggle(200);
    }

    else {
        settingButton.get(0).className += "active-set";
        $('.form-urls').slideToggle(200);
    }
});


//sliding notifications with ajax and custom animate function
var xhr = new XMLHttpRequest();
xhr.open('GET', 'notifications.txt')

// function saveXhrRes(res) {
//     return windowRes = res;
// }
// console.log(windowRes)
var windowRes;
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText);

            windowRes = xhr.responseText;
        } else console.log("Done but Failed");
    } else console.log("Undone");
}

xhr.send();


var inputArr = $('.form-urls input');
var urlStorageObj = {}

function getURLs() {
    for (var k = 0; k <= inputArr.length - 1; k += 2) {
        if (!(inputArr.eq(k + 1).val().includes("http"))) {
            throw "Incorrect URL";
            break;

        } else if (inputArr.eq(k).val() == "") {
            throw "URL Name is empty"
            break;
        } else if (!(urlStorageObj[inputArr.eq(k).val()] == null)) {
            throw "URL Name is already exist"
            break;
        } else
            console.log(k);
        urlStorageObj[inputArr.eq(k).val()] = inputArr.eq(k + 1).val()


    }
    localStorage.setItem('urls', JSON.stringify(urlStorageObj));
    setURLsInSelect(urlStorageObj);
}
function setURLsInSelect(oldJson) {
    var realObj = oldJson || urlStorageObj;
    var selectInput = $('select');
    selectInput.html('');
    for (var property in realObj) {
        selectInput.append("<option value='" + realObj[property] +
            "'>" + property + "</option>");
    }
}

document.onload = setURLsInSelect(JSON.parse(localStorage.getItem('urls')));

//on option click set value on iframe src
//########################FIX#############
//optionArrInURLSelect[i].on is not a function...

var optionArrInURLSelect = $('option'),
    myiFrame = $('iframe');
for (var i=0; i<optionArrInURLSelect.length ; i++) {
    optionArrInURLSelect[i].on('click', function() {
        var optionURL = optionArrInURLSelect[i].attr('value');
        myiFrame.attr('src', optionURL);
    });
};




var p = $('.url-exception-message');
$('.save-button').on('click', function () {
    try {
        p.hide();
        urlStorageObj = {};
        getURLs()
    }
    catch (error) {
        p.text(error);
        p.show();


    }
});
console.log




