// ==UserScript==
// @name         Steam Sales Helper
// @namespace    SSh
// @description Simple button Clicker
// @version 1.0
// @author DEMENT0R + EarsKilla#0697
// @downloadURL https://github.com/EarsKilla/SummerSale2017-Helper/raw/master/SSC.user.js
// @updateURL https://github.com/EarsKilla/SummerSale2017-Helper/raw/master/SSC.user.js
// @license GNU v3
// @noframes
// @match        http://store.steampowered.com/*
// @match        https://store.steampowered.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function(){
        if (window.location.href.includes(".com/agecheck/")) {
            document.getElementById("next_in_queue_form").submit();
        } else if (window.location.href.includes(".com/explore")) {
            window.location.href = "https://store.steampowered.com/explore/startnew";
        }
        else {
            document.querySelector('.next_in_queue_content').click();
        }
    }, 1);
})();
