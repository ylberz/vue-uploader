import { ref as v, openBlock as u, createElementBlock as d, createElementVNode as n, toDisplayString as g, Fragment as A, renderList as U, createCommentVNode as M } from "vue";
const R = ["multiple"], T = {
  key: 0,
  class: "file-details"
}, b = { class: "file-name" }, w = /* @__PURE__ */ n("i", {
  class: "fa fa-file",
  style: { "font-size": "30px" }
}, null, -1), x = { class: "file-name-content" }, z = ["onClick"], O = {
  __name: "vue-uploader",
  props: {
    label: { type: String, default: "UPLOAD OR DRAG AND DROP" },
    modelValue: { type: Array, default: [] },
    multiple: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "onFileUpload", "onRemoveFile"],
  setup(s, { emit: D }) {
    const _ = s, i = D, l = v([]), a = v(null), c = v(null), y = (e) => {
      c.value.click();
    }, p = (e) => {
      _.multiple ? l.value = [...l.value, ...e] : l.value = e, i("update:modelValue", l.value), i("onFileUpload", l.value);
    }, h = (e) => {
      const o = Array.from(e.target.files);
      p(o);
    }, f = (e) => {
      if (t(e), e.dataTransfer) {
        const o = Array.from(e.dataTransfer.files);
        p(o);
      }
      a.value.classList.remove("drag-over");
    }, k = (e) => {
      l.value = l.value.filter((o) => o.name !== e), F(l.value), i("update:modelValue", l.value), i("onRemoveFile", e);
    }, F = (e) => {
      const o = new DataTransfer();
      for (const r of e)
        o.items.add(r);
      c.value.files = o.files;
    }, t = (e) => {
      e.preventDefault(), e.stopPropagation();
    }, L = (e) => {
      t(e), a.value.classList.add("drag-over");
    }, C = (e) => {
      t(e), a.value.classList.remove("drag-over");
    }, H = (e) => {
      t(e), a.value.classList.remove("drag-over");
    }, V = (e) => {
      t(e), a.value.classList.add("drag-over");
    }, m = (e) => {
      t(e), a.value.classList.remove("drag-over");
    };
    return (e, o) => (u(), d("div", null, [
      n("div", {
        id: "drop-zone",
        onDrop: f,
        onDragover: L,
        onDragenter: C,
        onDragleave: H,
        onChange: f,
        onClick: y,
        onMousedown: V,
        onMouseup: m,
        onMouseleave: m,
        ref_key: "dropzone",
        ref: a
      }, [
        n("h3", null, g(s.label), 1),
        n("input", {
          type: "file",
          onChange: h,
          id: "file-upload",
          multiple: s.multiple,
          ref_key: "fileInp",
          ref: c
        }, null, 40, R)
      ], 544),
      l.value.length > 0 ? (u(), d("div", T, [
        (u(!0), d(A, null, U(l.value, (r) => (u(), d("div", {
          class: "file",
          key: r.name
        }, [
          n("div", b, [
            w,
            n("div", x, [
              n("p", null, g(r.name), 1)
            ])
          ]),
          n("button", {
            class: "close-button",
            onClick: (B) => k(r.name)
          }, "X", 8, z)
        ]))), 128))
      ])) : M("", !0)
    ]));
  }
}, I = {
  install(s) {
    s.component("VueUploader", O);
  }
};
export {
  I as default
};
