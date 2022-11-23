// @match        https://*hellven.net/bbs/board.php?bo_table=kyd&wr_id=*
// @match        https://*hellven.net/bbs/board.php?bo_table=realddr&wr_id=*
// @match        https://*hellven.net/bbs/board.php?bo_table=adtfr&wr_id=*
let CommentMain = {
	DocOnLoad: function (o) {
		try {
			if (null != o && null != o.body && null != o.location) {
				let elmTarget = o.querySelector(".view-good"),
					elmCommentBtn = o.querySelector("#my_comment_btn");
				if (null == elmCommentBtn) {
					if (null == elmTarget) {
						elmTarget = o.querySelector(".view-good-box").firstChild;
					}

					if (null != elmTarget) {
						elmCommentBtn = CommentMain.NewCommentButton();
						elmTarget.parentNode.insertBefore(elmCommentBtn, elmTarget) ;
					}
				}
				if (null != elmCommentBtn) {
					console.log("CommentMain : add NewCommentButton.");
				}
			}
			return !0;
		} catch (e) {
			console.log("CommentMain.DocOnLoad. ", e);
		}
	},
	NewCommentButton: function () {
		try {
			let elmNewButton = document.createElement("button");
			elmNewButton.id = "my_comment_btn"; elmNewButton.className = "comment-btn-tooltip";
			elmNewButton.setAttribute("type", "button");
			elmNewButton.setAttribute("title", "Comment");
			elmNewButton.innerHTML = "Comment";
			elmNewButton.setAttribute("style", "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #ff003e; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin: 20px 5px 10px 5px; border: 1px solid #ff0068; border-radius: 2px; font-weight:bold");
			elmNewButton.setAttribute("onmouseover", "this.style.backgroundColor='#c10841'");
			elmNewButton.setAttribute("onmouseout", "this.style.backgroundColor='#ff003e'");
			elmNewButton.addEventListener("click", function (a) {
				let elmComment = document.querySelector('#wr_content')
				if (document.location.href.indexOf('realddr') >= 0) {
					elmComment.value = '리뷰 잘 보고 갑니다.';
				}
				else if (document.location.href.indexOf('kyd') >= 0) {
					elmComment.value = '좋은 자료 감사합니다.';
				}
				else if (document.location.href.indexOf('adtfr') >= 0) {
					elmComment.value = '잘 보고 갑니다.';
				}
				apms_comment('viewcomment');
				elmComment.scrollIntoView({block: "center"});
			}, !0);
			return elmNewButton;
		} catch (e) {
			console.log("NewCommentButton has error. ", e)
		}
	}
};
CommentMain.DocOnLoad(window.document);