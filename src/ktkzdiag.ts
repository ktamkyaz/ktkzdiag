let diagStyles = `
<style>
.ktkzDiag{
    position: fixed;
    bottom: -60%;
    width: 90%;
    height:50%;
    background: rgba(255, 255, 255, 0.65);
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-top: 1px solid #000;
    padding: 20px;
    transform: translateY(60%);
    transition: 0.6s;
    display: inline-flex;
    flex-direction: column;

}
.ktkzDiag.show{
    backdrop-filter: blur(10px);
    bottom: 0;
    transform: none;
}
.ktkzDiag.noblur{
    backdrop-filter: none !important;
    background:white;
}
.ktkzDiag .header{
    display:flex;
}
.ktkzDiag.fullscreen{
    height: 92%;
}
.kDiagClose{
    border-radius: 50%;
    border:0;
    text-align: right;
    width:20px;
    height:20px;
}
/*SOON*/
.ktkzDiag .header .drag{
    width:30px;
    height:10px;
    background: grey;
    border-radius: 10px;
    align-self: center;
}
</style>
`;
window.addEventListener("load", () => {
  document.body.insertAdjacentHTML("beforeend", diagStyles);
});
function closektkzdiag(id) {
  document.querySelector("#_ktkzdiag_" + id).classList.remove("show");
  clbks[id]();
}
let clbks = {};
let _idefaults = {
  closeCallback: () => {},
  closeBtn: true,
  optimized: false,
  fullscreen: false,
  // drag: false,
  dragFullscreen: false,
};
let _idefaultsList = [
  "closeCallback",
  "closeBtn",
  "optimized",
  "fullscreen",
  //"drag",
  "dragFullscreen",
];
class ktkzDiag {
  el: Element;
  id: string;
  closeBtn: boolean = true;
  optimized: boolean = false;
  fullscreen: boolean = false;
  diagEl: Element | null;
  i: {} = {};
  constructor(el, id, i: {} = {}) {
    this.el = el;
    this.id = id;
    _idefaultsList.forEach((element) => {
      if (i[element] == undefined) {
        i[element] = _idefaults[element];
      }
    });
    clbks[this.id] = i["closeCallback"];
    let btn: string = "";
    let old: string = this.el.innerHTML;
    if (this.closeBtn) {
      btn = `<button class="kDiagClose" onclick="closektkzdiag('${this.id}')">✖</button>`;
    }
    // if (i["drag"]) {
    //   btn += `<span class="drag" id="_drag_${id}"></span>`;
    //   let drag = document.getElementById("_drag_" + id);
    //   // TODO: MAKE DRAG
    // }
    let adq = "";
    if (this.optimized) {
      adq = "noblur";
    }
    this.el.innerHTML = `
        <div id="_ktkzdiag_${this.id}" class="ktkzDiag ${adq}">
        <div class="header">${btn}</div>
        <div class="body">${old}<div>
        </div>
        `;
    this.diagEl = document.querySelector(`#_ktkzdiag_${this.id}`);
    
  }
  open() {
    this.diagEl.classList.add("show");
  }
  close() {
    this.diagEl.classList.remove("show");
  }
}
