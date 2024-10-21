if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$3 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/HBuilderProjects/MyApp/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const userAgreement = `
为使用本软件及服务，您应当阅读并遵守《本软件许可协议》（以下简称（本协议）。请您务必审慎阅读，从分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制，免责条款可能以加粗形式提示您注意。

除非您已阅读并接受本协议所有条款，否则您无权下载，安装或使用本软件及相关服务。您的下载，安装，登录等使用行为即视为您已阅读并同意上述协议的约束。 如果您未满18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议，并特别注意未成年人使用条款。

一， 协议的范围

本协议是您与本软件之间关于您下载，安装，使用，复制本软件，以及使用本软件相关服务所订立的协议。

二， 关于本服务

本服务内容是指本软件客户端软件提供包括但不限于IOS及Android等多个版本，您必须选择与所安装手机相匹配的软件版本。

三， 软件的获取

您可以直接从本软件授权的第三方获取。

如果您从未经本软件授权的第三方获取本软件或与本软件名称相同的安装程序，本软件无法保证该软件能够正常使用，并对因此给您造成的损失不予负责。下载安装程序后，您需要按照该程序提示的步骤正确安装。

为提供更加优质，安全的服务，在本软件安装时本软件可能推荐您安装其他软件，您可以选择安装或不安装。

如果您不再需要使用本软件或者需要安装新版本软件，可以自行卸载。

四， 软件的更新

为了改善用户体验，完善服务内容，本软件将不断努力开发新的服务，并为您不时提供软件更新(这些更新可能会采取软件替换，修改，功能强化，版本升级等形式)。

为了保证本软件及服务的安全性和功能的一致性，本软件有权不向您特别通知而对软件进行更新，或者对软件的部分功能效果进行改变或限制。

本软件新版本发布后，旧版本的软件可能无法使用，本软件部保证旧版本软件继续可用及相应的服务，请您随时核对并下载最新版本。

五， 用户个人信息保护

保护用户个人信息是本软件的一项基本原则，本软件将会采取合理的措施保护用户的信息。除法律法规规定的情形外，未经用户许可本软件不会向第三方公开，透漏用户个人信息。为了向用户提供相关服务功能或改善技术和服务，您在注册账号或使用本服务的过程中，可能需要提供一些必要信息，本软件对相关信息采用国际化标准的加密存错与传输方式，保障用户个人信息的安全。

未经您的同意，本软件不会向本软件以外的任何公司，组织和个人披露您的个人信息，但法律法规另有规定的除外。

本软件非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用本软件的服务前，应事先取得您家长或法定监护人的书面同意。

六， 主权力义务条款

本软件特别提醒您应妥善保管您的账号，当您使用完毕后，应安全退出。

用户注意事项：您的理解并同意，为了向您提供有效的服务，您在此许可本软件利用您移动通讯终端设备的处理器和宽带等资源。本软件使用过程中可能产生的数据流量的费用，您需自行向运营商了解相关资费信息。

七， 用户行为规范

您在使用本服务时需遵守法律法规，社会主义制度，国家利益，公民合法权利，社会公共秩序，道德风尚及信息真实性等“七条底线“要求。

八， 软件使用规范

除非法律允许或本软件的书面许可，您使用本软件过程中不得删除本软件及其副本上关于知识产权的信息，不得对本软件进行反向工程等或以其他方式尝试发现本软件的源代码。

九， 对自己行为负责

您充分了解并同意，您必须为自己注册账号下的一切行为负责。

十， 其他

您使用本软件即视为您已阅读并同意接受本软件协议的约束。本软件有权在必要时修改本协议条款。如果您不接受修改后的条款，应当停止使用本软件。
`;
  const privacyPolicy = `
本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。

1. 适用范围

(a) 在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；

您了解并同意，以下信息不适用本隐私权政策：

(a) 本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；

(b) 违反法律规定或违反本应用规则行为及本应用已对您采取的措施。

2. 信息使用

(a)本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。

(b) 本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。

3. 信息披露

在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：

(a) 经您事先同意，向第三方披露；

(b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；

(c) 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；

(d) 如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；

(e) 如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；

(f) 在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。

(g) 其它本应用根据法律、法规或者网站政策认为合适的披露。

4. 信息存储和交换

本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。

5. Cookie的使用

(a) 在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies ，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。

(b) 您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。

(c) 通过本应用所设cookies所取得的有关信息，将适用本政策。

6. 信息安全

(a) 本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。

(b) 在使用本应用网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对

7.本隐私政策的更改

(a)如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。

(b)本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。

请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。
`;
  const _imports_0 = "/static/login/login.png";
  const _imports_1 = "/static/login/lock.png";
  const _imports_2 = "/static/login/submit1.png";
  const _sfc_main$2 = {
    data() {
      return {
        userAgreement: "",
        privacyPolicy: "",
        canGetYZM: false,
        canInputYZM: false,
        showModal: false,
        modalTitle: "",
        modalContent: "",
        navId: "login",
        yanzhengma: "获取验证码",
        submitParams: {
          username: "",
          // 登录电话号码
          password: "",
          // 登录密码
          phone: "",
          smsCode: ""
        },
        registerParams: {
          username: "",
          // 注册电话号码
          password: "",
          // 注册密码
          confirmPassword: "",
          // 确认密码
          smsCode: ""
          // 短信验证码
        }
      };
    },
    methods: {
      // 切换登录或注册
      itemclick(value) {
        this.navId = value;
      },
      checkPhone() {
        this.canGetYZM = this.submitParams.phone !== "";
      },
      // 获取验证码
      getYZM() {
        if (this.canGetYZM) {
          this.canInputYZM = true;
          if (this.yanzhengma === "获取验证码") {
            let time = 60;
            let timer = setInterval(() => {
              this.yanzhengma = `( ${time--} )`;
              if (time === -1) {
                clearInterval(timer);
                this.yanzhengma = "获取验证码";
              }
            }, 1e3);
          }
        }
      },
      // 登录逻辑
      login() {
        const {
          username,
          password
        } = this.submitParams;
        if (username === "" || password === "") {
          uni.showToast({
            title: "请输入完整信息",
            icon: "none",
            duration: 2e3
          });
        } else if (username === "123" && password === "123") {
          uni.navigateTo({
            url: "/pages/home"
          });
        } else {
          uni.showToast({
            title: "信息错误",
            icon: "none",
            duration: 2e3
          });
        }
      },
      // 注册逻辑
      register() {
        const {
          username,
          password,
          confirmPassword,
          smsCode
        } = this.registerParams;
        if (username === "" || password === "" || confirmPassword === "" || smsCode === "") {
          uni.showToast({
            title: "请输入完整信息",
            icon: "none",
            duration: 2e3
          });
        } else if (password !== confirmPassword) {
          uni.showToast({
            title: "两次密码不一致",
            icon: "none",
            duration: 2e3
          });
        } else if (username === "123" && password === "123" && smsCode === "123") {
          uni.navigateTo({
            url: "/pages/home"
          });
        } else {
          uni.showToast({
            title: "信息错误",
            icon: "none",
            duration: 2e3
          });
        }
      },
      // 展示用户协议
      showUserAgreement() {
        this.modalTitle = "用户协议";
        this.modalContent = userAgreement;
        this.showModal = true;
      },
      // 展示隐私政策
      showPrivacyPolicy() {
        this.modalTitle = "隐私协议";
        this.modalContent = privacyPolicy;
        this.showModal = true;
      },
      // 关闭弹窗
      closeModal() {
        this.showModal = false;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("image", {
          src: _imports_0,
          mode: "widthFix",
          style: { "width": "100%" }
        }),
        vue.createElementVNode("text", { class: "title" }, "助学系统")
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "main" }, [
          vue.createElementVNode("view", { class: "box2" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass($data.navId == "login" ? "active" : "unactive"),
                onClick: _cache[0] || (_cache[0] = ($event) => $options.itemclick("login"))
              },
              [
                vue.createTextVNode("登录 "),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "line" },
                  [
                    vue.createElementVNode("view", { class: "y" })
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $data.navId == "login"]
                ])
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass($data.navId == "register" ? "active" : "unactive"),
                onClick: _cache[1] || (_cache[1] = ($event) => $options.itemclick("register"))
              },
              [
                vue.createTextVNode("注册 "),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "line" },
                  [
                    vue.createElementVNode("view", { class: "y" })
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $data.navId == "register"]
                ])
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createCommentVNode(" 登录 "),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "box3" },
            [
              vue.createElementVNode("view", { class: "items" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "person",
                  size: "20",
                  style: { "margin-right": "16rpx", "color": "#C7D4DD" }
                }),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "uni-input",
                    focus: "",
                    placeholder: "请输入电话号码",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.submitParams.username = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.submitParams.username]
                ])
              ]),
              vue.createElementVNode("view", {
                class: "items",
                style: { "margin-top": "30rpx", "justify-content": "space-between" }
              }, [
                vue.createElementVNode("view", {
                  class: "",
                  style: { "display": "flex", "justify-content": "center" }
                }, [
                  vue.createElementVNode("image", {
                    src: _imports_1,
                    mode: "widthFix",
                    style: { "width": "40rpx", "margin-right": "16rpx" }
                  }),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input",
                      type: "password",
                      placeholder: "请输入密码",
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.submitParams.password = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.submitParams.password]
                  ])
                ])
              ]),
              vue.createElementVNode("view", {
                class: "",
                style: { "position": "relative", "left": "0", "top": "0" },
                onClick: _cache[4] || (_cache[4] = ($event) => $options.login())
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "widthFix",
                  style: { "width": "350rpx", "margin-top": "40rpx" }
                }),
                vue.createElementVNode("text", { class: "submitValue" }, "确认")
              ]),
              vue.createElementVNode("view", {
                class: "",
                style: { "width": "100%", "text-align": "center", "font-size": "24rpx", "line-height": "33rpx", "margin-top": "300rpx" }
              }, [
                vue.createTextVNode(" 登录即同意 "),
                vue.createElementVNode("text", { style: { "color": "#1C85C8" } }, [
                  vue.createElementVNode("text", {
                    onClick: _cache[5] || (_cache[5] = (...args) => $options.showUserAgreement && $options.showUserAgreement(...args))
                  }, "用户协议"),
                  vue.createTextVNode("、"),
                  vue.createElementVNode("text", {
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.showPrivacyPolicy && $options.showPrivacyPolicy(...args))
                  }, "隐私协议")
                ])
              ])
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.navId == "login"]
          ]),
          vue.createCommentVNode(" 注册 "),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "box3" },
            [
              vue.createElementVNode("view", { class: "items" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "person",
                  size: "20",
                  style: { "margin-right": "16rpx", "color": "#C7D4DD" }
                }),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "uni-input",
                    placeholder: "请输入电话号码",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.submitParams.phone = $event),
                    onInput: _cache[8] || (_cache[8] = (...args) => $options.checkPhone && $options.checkPhone(...args))
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vue.vModelText, $data.submitParams.phone]
                ])
              ]),
              vue.createElementVNode("view", {
                class: "items",
                style: { "margin-top": "30rpx", "justify-content": "space-between" }
              }, [
                vue.createElementVNode("view", {
                  class: "",
                  style: { "display": "flex", "justify-content": "center" }
                }, [
                  vue.createElementVNode("image", {
                    src: _imports_1,
                    mode: "widthFix",
                    style: { "width": "40rpx", "margin-right": "16rpx" }
                  }),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input",
                      type: "password",
                      placeholder: "请输入密码",
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.registerParams.password = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.registerParams.password]
                  ])
                ])
              ]),
              vue.createElementVNode("view", {
                class: "items",
                style: { "margin-top": "30rpx", "justify-content": "space-between" }
              }, [
                vue.createElementVNode("view", {
                  class: "",
                  style: { "display": "flex", "justify-content": "center" }
                }, [
                  vue.createElementVNode("image", {
                    src: _imports_1,
                    mode: "widthFix",
                    style: { "width": "40rpx", "margin-right": "16rpx" }
                  }),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input",
                      type: "password",
                      placeholder: "请再次输入密码",
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.registerParams.confirmPassword = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.registerParams.confirmPassword]
                  ])
                ])
              ]),
              vue.createElementVNode("view", {
                class: "items",
                style: { "margin-top": "30rpx", "justify-content": "space-between" }
              }, [
                vue.createElementVNode("view", {
                  class: "",
                  style: { "display": "flex", "justify-content": "center" }
                }, [
                  vue.createElementVNode("image", {
                    src: _imports_1,
                    mode: "widthFix",
                    style: { "width": "40rpx", "margin-right": "16rpx" }
                  }),
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-input input2",
                    placeholder: "请输入短信验证码",
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.submitParams.smsCode = $event),
                    disabled: !$data.canInputYZM
                  }, null, 8, ["disabled"]), [
                    [vue.vModelText, $data.submitParams.smsCode]
                  ])
                ]),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["yzm", { disabled: !$data.canGetYZM }]),
                    onClick: _cache[12] || (_cache[12] = ($event) => $options.getYZM($data.yanzhengma))
                  },
                  vue.toDisplayString($data.yanzhengma),
                  3
                  /* TEXT, CLASS */
                )
              ]),
              vue.createElementVNode("view", {
                class: "",
                style: { "position": "relative", "left": "0", "top": "0" },
                onClick: _cache[13] || (_cache[13] = ($event) => $options.register())
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "widthFix",
                  style: { "width": "350rpx", "margin-top": "40rpx" }
                }),
                vue.createElementVNode("text", { class: "submitValue" }, "注册")
              ]),
              vue.createElementVNode("view", {
                class: "",
                style: { "width": "100%", "text-align": "center", "font-size": "24rpx", "line-height": "33rpx", "margin-top": "100rpx" }
              }, [
                vue.createTextVNode(" 注册即同意 "),
                vue.createElementVNode("text", { style: { "color": "#1C85C8" } }, [
                  vue.createElementVNode("text", {
                    onClick: _cache[14] || (_cache[14] = (...args) => $options.showUserAgreement && $options.showUserAgreement(...args))
                  }, "用户协议"),
                  vue.createTextVNode("、"),
                  vue.createElementVNode("text", {
                    onClick: _cache[15] || (_cache[15] = (...args) => $options.showPrivacyPolicy && $options.showPrivacyPolicy(...args))
                  }, "隐私协议")
                ])
              ])
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.navId == "register"]
          ])
        ])
      ]),
      vue.createCommentVNode(" 弹出协议窗口 "),
      $data.showModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "modal"
      }, [
        vue.createElementVNode("view", { class: "modal-content" }, [
          vue.createElementVNode("view", { class: "modal-header" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.modalTitle),
              1
              /* TEXT */
            ),
            vue.createElementVNode("button", {
              onClick: _cache[16] || (_cache[16] = (...args) => $options.closeModal && $options.closeModal(...args))
            }, "关闭")
          ]),
          vue.createElementVNode("scroll-view", {
            class: "modal-body",
            "scroll-y": "true"
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.modalContent),
              1
              /* TEXT */
            )
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/HBuilderProjects/MyApp/pages/login.vue"]]);
  const _sfc_main$1 = {
    methods: {
      showTxtFile() {
        const filePath = "/static/login/userAgreement.txt";
        uni.request({
          url: filePath,
          method: "GET",
          responseType: "text",
          success: (res) => {
            if (res.statusCode === 200) {
              uni.showModal({
                title: "文件内容",
                content: res.data,
                showCancel: false
              });
            } else {
              uni.showToast({
                title: "文件读取失败: " + res.statusCode,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/home.vue:33", "文件读取失败:", err);
            uni.showToast({
              title: "读取文件失败",
              icon: "none"
            });
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.showTxtFile && $options.showTxtFile(...args))
      }, "显示 TXT 文件内容")
    ]);
  }
  const PagesHome = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-41317691"], ["__file", "D:/HBuilderProjects/MyApp/pages/home.vue"]]);
  __definePage("pages/login", PagesLogin);
  __definePage("pages/home", PagesHome);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/MyApp/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
