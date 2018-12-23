// ==UserScript==
// @name         Steam Sales Helper
// @namespace    SSh
// @description Simple button Clicker
// @version 1.0
// @author DEMENT0R + EarsKilla#0697
// downloadURL https://github.com/EarsKilla/SteamSales-Helper/raw/master/SSh.user.js
// updateURL https://github.com/EarsKilla/SteamSales-Helper/raw/master/SSh.user.js
// @license GNU v3
// @noframes
// @match        http://store.steampowered.com/*
// @match        https://store.steampowered.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    function V_GetIntCookie(name, defValue) {
        var _def = parseInt(defValue);
        if (isNaN(_def))
            _def = 0;

        var _val = parseInt(V_GetCookie(name));
        if (isNaN(_val))
            return _def;
        return _val;
    }

    function setExploreLoops(count) {
        var _count = parseInt(count);
        if (isNaN(_count))
            _count = 3;

        V_SetCookie('sshjs_countMax', _count, 360);
    }

    function getExploreLoops(defCount = 3) {
        return V_GetIntCookie('sshjs_countMax', defCount);
    }

    function getExplored() {
        return V_GetIntCookie('sshjs_count', 0);
    }

    function setExplored(val) {
        var _val = parseInt(val);
        if (isNaN(_val))
            _val = 0;

        V_SetCookie('sshjs_count', _val, 360);
    }

    function gabenSendNudes() {
        var sshDialog = ShowPromptDialog('Explore', 'Loops count:', 'Go', 'Cancel');
        var sshInput = sshDialog.m_$Content[0].childNodes[1].children[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
        if (!sshInput) {
            console.log('Cannot find input field! this is very bad :(');
            return;
        }
        sshInput.setAttribute('type', 'number');
        sshInput.value = getExploreLoops();

        sshDialog.done(function () {
            setExplored(0);
            setExploreLoops(sshInput.value);
            window.location.href = "https://store.steampowered.com/explore/startnew";
        });
    }

    function updateStoreMenu() {
        var store_subm = document.getElementsByClassName('submenu_store');
        if (!store_subm) {
            console.log('Cannot find element with submenu_store class :(');
            return;
        }

        var store = store_subm[1],
            extLink = document.createElement('a');

        extLink.setAttribute('class', 'submenuitem');
        extLink.setAttribute('href', '#');
        extLink.onclick = function(e) { gabenSendNudes(); };
        extLink.innerText = 'Auto explore';

        store.appendChild(extLink);
    }

    updateStoreMenu();

    setTimeout(function () {
        if (window.location.href.includes(".com/agecheck/")) {
            document.getElementById("next_in_queue_form").submit();
        } else if (window.location.href.includes(".com/explore")) {
            var lCount = getExplored(),
                lcountMax = getExploreLoops(0) - 1;

            if (lCount < lcountMax) {
                setExplored(lCount + 1);
                window.location.href = "https://store.steampowered.com/explore/startnew";
            }
        }
        else {
            document.querySelector('.next_in_queue_content').click();
        }
    }, 1);
})();
