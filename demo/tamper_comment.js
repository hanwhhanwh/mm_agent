let CommentMain = {
	DocOnLoad: function (o) {
		try {
			if (null != o && null != o.body && null != o.location) {
				let elmTarget = o.querySelector(".view-good"),
					elmCommentBtn = o.querySelector("#my_comment_btn");
				if (null == elmCommentBtn) {
					if (null == elmTarget)
						elmTarget = o.querySelector(".view-good-box").parentNode;

					if (null != elmTarget) {
						elmCommentBtn = CommentMain.NewCommentButton();
						elmTarget.parentNode.insertBefore(elmCommentBtn, elmTarget) 
					}
				}
				if (null != elmCommentBtn)
					console.log("CommentMain : add NewCommentButton.")
			}
			return !0
		} catch (e) {
			console.log("CommentMain.DocOnLoad. ", e)
		}
	},
	WaitLoadDom: function (o) {
		CommentMain.vid = CommentMain.getVid(o), CommentMain.vid ? null != o.querySelector("#info #menu-container") ? CommentMain.DocOnLoad(o) : setTimeout(function () {
			CommentMain.WaitLoadDom(o)
		}, 1e3) : CommentMain.checkChangeVid()
	},
	NewCommentButton: function () {
		try {
			var o = document.createElement("button");
			return o.id = "y2mateconverter", o.className = "yt-uix-tooltip", o.setAttribute("type", "button"), o.setAttribute("title", "Download with y2mate.com"), o.innerHTML = "Download", o.addEventListener("click", function (o) {
				CommentMain.goToY2mate(o)
			}, !0), o.setAttribute("style", "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #ff003e; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin: 20px 5px 10px 5px; border: 1px solid #ff0068; border-radius: 2px; font-weight:bold"), o.setAttribute("onmouseover", "this.style.backgroundColor='#c10841'"), o.setAttribute("onmouseout", "this.style.backgroundColor='#ff003e'"), o
		} catch (o) {
			console.log("Ошибка в функции Y2mate.GetCommandButton. ", o)
		}
	}
};
CommentMain.WaitLoadDom(window.document);