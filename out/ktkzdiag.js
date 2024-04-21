var kStyle = "\n<style>\n.ktkzDiag{\n    position: fixed;\n    bottom: -60%;\n    width: 90%;\n    height:50%;\n    background: rgba(255, 255, 255, 0.65);\n    border-top-left-radius: 25px;\n    border-top-right-radius: 25px;\n    border-top: 1px solid #000;\n    padding: 20px;\n    transform: translateY(60%);\n    transition: 0.6s;\n    display: inline-flex;\n    flex-direction: column;\n\n}\n.ktkzDiag.show{\n    backdrop-filter: blur(10px);\n    bottom: 0;\n    transform: none;\n}\n.ktkzDiag.noblur{\n    backdrop-filter: none !important;\n    background:white;\n}\n.ktkzDiag .header{\n    display:flex;\n}\n.ktkzDiag.fullscreen{\n    height: 92%;\n}\n.kDiagClose{\n    border-radius: 50%;\n    border:0;\n    text-align: right;\n    width:20px;\n    height:20px;\n}\n/*SOON*/\n.ktkzDiag .header .drag{\n    width:30px;\n    height:10px;\n    background: grey;\n    border-radius: 10px;\n    align-self: center;\n}\n</style>\n";
window.addEventListener("load", function () {
    document.body.insertAdjacentHTML("beforeend", kStyle);
});
function closektkzdiag(id) {
    document.querySelector("#_ktkzdiag_" + id).classList.remove("show");
    clbks[id]();
}
var clbks = {};
var _idefaults = {
    closeCallback: function () { },
    closeBtn: true,
    optimized: false,
    fullscreen: false,
    // drag: false,
    dragFullscreen: false,
};
var _idefaultsList = [
    "closeCallback",
    "closeBtn",
    "optimized",
    "fullscreen",
    //"drag",
    "dragFullscreen",
];
var ktkzDiag = /** @class */ (function () {
    function ktkzDiag(el, id, i) {
        if (i === void 0) { i = {}; }
        this.closeBtn = true;
        this.optimized = false;
        this.fullscreen = false;
        this.i = {};
        this.el = el;
        this.id = id;
        _idefaultsList.forEach(function (element) {
            if (i[element] == undefined) {
                i[element] = _idefaults[element];
            }
        });
        clbks[this.id] = i["closeCallback"];
        var btn = "";
        var old = this.el.innerHTML;
        if (this.closeBtn) {
            btn = "<button class=\"kDiagClose\" onclick=\"closektkzdiag('".concat(this.id, "')\">\u2716</button>");
        }
        // if (i["drag"]) {
        //   btn += `<span class="drag" id="_drag_${id}"></span>`;
        //   let drag = document.getElementById("_drag_" + id);
        //   // TODO: MAKE DRAG
        // }
        var adq = "";
        if (this.optimized) {
            adq = "noblur";
        }
        this.el.innerHTML = "\n        <div id=\"_ktkzdiag_".concat(this.id, "\" class=\"ktkzDiag ").concat(adq, "\">\n        <div class=\"header\">").concat(btn, "</div>\n        <div class=\"body\">").concat(old, "<div>\n        </div>\n        ");
        this.diagEl = document.querySelector("#_ktkzdiag_".concat(this.id));
    }
    ktkzDiag.prototype.open = function () {
        this.diagEl.classList.add("show");
    };
    ktkzDiag.prototype.close = function () {
        this.diagEl.classList.remove("show");
    };
    return ktkzDiag;
}());
