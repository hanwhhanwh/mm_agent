/**
 * @summary Comment button for TemperMonkey
 * @author hbesthee@naver.com
 * @date 2021-05-21
*/

// ==UserScript==
// @name         Comment button for Tampermonkey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Comment button for Tampermonkey
// @author       hbesthee@naver.com
// @include      https://www.hellven.net/bbs/*
// @include      https://hellven.net/bbs/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if (window.document.location.toString().indexOf("bo_table=realddr&w") >= 0) {
        var div = window.document.querySelector("div.view-good-box");
		try {
			var o = document.createElement("button");
			o.id = "my_comment";
            o.className = "my-button-tooltip";
            o.setAttribute("type", "button");
            o.setAttribute("title", "Comment");
            o.innerHTML = "Comment"
            o.addEventListener("click", function (o) {
                console.log('Comment button for Tampermonkey : ');
                var wr_content = document.querySelector("#wr_content");
                if (wr_content != null) {
                    wr_content.value = "리뷰 잘 보고 갑니다.";
                    apms_comment('viewcomment');
                    wr_content.scrollIntoView(false);
                }
			}, !0);
            o.setAttribute("style", "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #ff003e; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin: 20px 5px 10px 5px; border: 1px solid #ff0068; border-radius: 2px; font-weight:bold");
            o.setAttribute("onmouseover", "this.style.backgroundColor='#c10841'");
            o.setAttribute("onmouseout", "this.style.backgroundColor='#ff003e'");
            div.insertBefore(o, div.firstChild);
		} catch (o) {
			console.log("Error Comment Button. ", o);
		}
        console.log(div);
    }
})();