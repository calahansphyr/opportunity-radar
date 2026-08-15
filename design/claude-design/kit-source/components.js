/* @ds-bundle: {"format":4,"namespace":"OpportunityRadarDesignSystem_3ee40b","components":[{"name":"OpportunityCard","sourcePath":"components/content/OpportunityCard.jsx"},{"name":"TaskRow","sourcePath":"components/content/TaskRow.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"KeyValueRow","sourcePath":"components/core/KeyValueRow.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"StatTile","sourcePath":"components/core/StatTile.jsx"},{"name":"AlertCard","sourcePath":"components/feedback/AlertCard.jsx"},{"name":"SuggestionCard","sourcePath":"components/feedback/SuggestionCard.jsx"},{"name":"ChatComposer","sourcePath":"components/forms/ChatComposer.jsx"},{"name":"OptionCard","sourcePath":"components/forms/OptionCard.jsx"},{"name":"TextArea","sourcePath":"components/forms/TextArea.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"SideNavBar","sourcePath":"components/navigation/SideNavBar.jsx"},{"name":"TopNavBar","sourcePath":"components/navigation/TopNavBar.jsx"},{"name":"StepProgress","sourcePath":"components/progress/StepProgress.jsx"},{"name":"Timeline","sourcePath":"components/progress/Timeline.jsx"}],"sourceHashes":{"components/content/OpportunityCard.jsx":"f7e84e9318b8","components/content/TaskRow.jsx":"9eb951dd4d1f","components/core/Avatar.jsx":"11b67be97108","components/core/Badge.jsx":"4db56349bccc","components/core/Button.jsx":"b5e08f16bba4","components/core/Card.jsx":"afa7cd573631","components/core/Icon.jsx":"298a91eaf693","components/core/IconButton.jsx":"c4dd14e7bba8","components/core/KeyValueRow.jsx":"11e9c379f4e1","components/core/ProgressBar.jsx":"c4c3946c7822","components/core/StatTile.jsx":"48b013d6a90b","components/feedback/AlertCard.jsx":"a08fed3031d4","components/feedback/SuggestionCard.jsx":"24e69c3f1deb","components/forms/ChatComposer.jsx":"5a67ec84786f","components/forms/OptionCard.jsx":"a6ff82dcea51","components/forms/TextArea.jsx":"274e773735cd","components/navigation/Breadcrumb.jsx":"8a9ac33a0a4e","components/navigation/SideNavBar.jsx":"c1398a729489","components/navigation/TopNavBar.jsx":"4560586b5276","components/progress/StepProgress.jsx":"6bb13115b7da","components/progress/Timeline.jsx":"aab4a00665b1","ui_kits/catalyst-app/AssistantDrawer.jsx":"8eacad84bec0","ui_kits/catalyst-app/OpportunityMapScreen.jsx":"2dc425374018","ui_kits/catalyst-app/PursuitWorkspaceScreen.jsx":"00a18f18f4ac"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OpportunityRadarDesignSystem_3ee40b = window.OpportunityRadarDesignSystem_3ee40b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 80
};

/** Initials or photo avatar. */
function Avatar({
  initials,
  src,
  alt = "",
  size = "md",
  muted = false,
  className = "",
  style,
  ...rest
}) {
  const px = SIZES[size] || SIZES.md;
  const cls = ["or-avatar", muted ? "or-avatar--muted" : "", className].filter(Boolean).join(" ");
  const dims = {
    width: px,
    height: px,
    fontSize: px <= 24 ? 10 : px <= 32 ? 12 : px <= 40 ? 16 : 28,
    ...style
  };
  if (src) return /*#__PURE__*/React.createElement("img", _extends({
    className: cls,
    src: src,
    alt: alt,
    style: dims
  }, rest));
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: dims
  }, rest), initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = ["filled", "outline", "tonal", "glass", "text", "danger-text"];

/** Action button. Filled is the only primary action per view. */
function Button({
  variant = "filled",
  size = "md",
  pill = false,
  block = false,
  icon,
  iconAfter,
  className = "",
  children,
  ...rest
}) {
  const v = VARIANTS.indexOf(variant) === -1 ? "filled" : variant;
  const cls = ["or-btn", "or-btn--" + v, size === "sm" ? "or-btn--sm" : "", pill ? "or-btn--pill" : "", block ? "or-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: size === "sm" ? 16 : 18
    }
  }, icon) : null, children, iconAfter ? /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: size === "sm" ? 16 : 18
    }
  }, iconAfter) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. Solid white for data, glass for workspace chrome. */
function Card({
  variant = "solid",
  flush = false,
  className = "",
  style,
  children,
  ...rest
}) {
  const cls = ["or-card", variant === "glass" ? "or-card--glass" : "", variant === "sunken" ? "or-card--sunken" : "", variant === "dashed" ? "or-card--dashed" : "", variant === "outlined" ? "or-card--outlined" : "", flush ? "or-card--flush" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Material Symbols Outlined glyph — the design system's only icon source. */
function Icon({
  name,
  size = 24,
  fill = false,
  color,
  className = "",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["material-symbols-outlined", fill ? "fill" : "", className].filter(Boolean).join(" "),
    style: {
      fontSize: size,
      color: color,
      ...style
    }
  }, rest), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status chip: fit tier, hold reason, confidence, urgency. */
function Badge({
  tone = "neutral",
  pill = false,
  icon,
  className = "",
  children,
  ...rest
}) {
  const cls = ["or-badge", "or-badge--" + tone, pill ? "or-badge--pill" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/content/OpportunityCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The product's signature surface: one funding match, with its reasoning. */
function OpportunityCard({
  title,
  amount,
  deadline,
  identifier,
  tier = "fit",
  tierLabel = "Likely fit",
  summary,
  whyFit = [],
  disqualifiers = [],
  twin,
  prepTime,
  onSave,
  onStart,
  primaryAction = "Start Pre-flight",
  secondaryAction = "Save for Later",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    className: ["or-opp", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "or-opp__head"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: tier,
    icon: tier === "fit" ? "check_circle" : undefined
  }, tierLabel), identifier ? /*#__PURE__*/React.createElement("span", {
    className: "or-opp__meta"
  }, "ID: ", identifier) : null), /*#__PURE__*/React.createElement("h4", {
    className: "or-opp__title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "or-opp__amount"
  }, amount), deadline ? /*#__PURE__*/React.createElement("span", {
    className: "or-opp__meta"
  }, "Deadline: ", deadline) : null)), summary ? /*#__PURE__*/React.createElement("p", {
    className: "or-opp__lede"
  }, summary) : null), /*#__PURE__*/React.createElement("div", {
    className: "or-opp__body"
  }, whyFit.length ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
    className: "or-opp__h5"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "done_all",
    size: 18,
    color: "var(--color-primary)"
  }), " Why it fits"), /*#__PURE__*/React.createElement("ul", {
    className: "or-opp__list"
  }, whyFit.map(t => /*#__PURE__*/React.createElement("li", {
    key: t
  }, t)))) : null, disqualifiers.length ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
    className: "or-opp__h5",
    style: {
      color: "var(--color-error)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "warning",
    size: 18
  }), " What could disqualify"), /*#__PURE__*/React.createElement("ul", {
    className: "or-opp__list"
  }, disqualifiers.map(t => /*#__PURE__*/React.createElement("li", {
    key: t
  }, t)))) : null, twin ? /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      paddingTop: 12,
      borderTop: "1px solid var(--color-border-ice)"
    }
  }, /*#__PURE__*/React.createElement("h5", {
    className: "or-opp__h5"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "group",
    size: 18,
    color: "var(--color-outline)"
  }), " Who else got this money"), /*#__PURE__*/React.createElement("div", {
    className: "or-opp__twin"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: "rgba(126,212,253,.2)",
      padding: 8,
      borderRadius: 9999,
      marginTop: 4,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "handshake",
    size: 20,
    color: "var(--color-secondary)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-label-sm-weight) var(--text-label-sm-size)/var(--text-label-sm-line) var(--font-label)",
      letterSpacing: "var(--text-label-sm-tracking)",
      color: "var(--color-secondary)",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 4
    }
  }, twin.eyebrow || "Your Funding Twin"), /*#__PURE__*/React.createElement("h6", {
    style: {
      margin: 0,
      font: "500 var(--text-body-md-size)/var(--text-body-md-line) var(--font-body)",
      color: "var(--color-text-deep)"
    }
  }, twin.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      font: "400 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
      color: "var(--color-on-surface-variant)"
    }
  }, twin.detail)))) : null), /*#__PURE__*/React.createElement("div", {
    className: "or-opp__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "or-opp__meta",
    style: {
      color: "var(--color-on-surface-variant)",
      marginLeft: 8
    }
  }, prepTime), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    onClick: onSave
  }, secondaryAction), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    iconAfter: "arrow_forward",
    onClick: onStart
  }, primaryAction))));
}
Object.assign(__ds_scope, { OpportunityCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/OpportunityCard.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Circular icon-only control used in nav bars, drawers and toolbars. */
function IconButton({
  icon,
  size = 24,
  active = false,
  dense = false,
  className = "",
  ...rest
}) {
  const cls = ["or-iconbtn", active ? "or-iconbtn--active" : "", dense ? "or-iconbtn--sm" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/content/TaskRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One task in a pursuit checklist. */
function TaskRow({
  title,
  detail,
  state = "todo",
  due,
  urgent = false,
  assignee,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["or-task", state === "current" ? "or-task--current" : "", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, state === "done" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check_circle",
    size: 24,
    color: "var(--color-secondary)",
    style: {
      marginTop: 2
    }
  }) : state === "current" ? /*#__PURE__*/React.createElement("div", {
    className: "or-task__radio"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "or-task__box"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "or-task__title" + (state === "done" ? " or-task__title--done" : "")
  }, title), detail ? /*#__PURE__*/React.createElement("p", {
    className: "or-task__detail"
  }, detail) : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, due ? /*#__PURE__*/React.createElement("span", {
    className: "or-task__due" + (urgent ? " or-task__due--urgent" : "")
  }, due) : null, assignee ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: assignee,
    size: "xs",
    muted: state !== "current"
  }) : null, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "more_vert",
    size: 16,
    dense: true,
    "aria-label": "Task actions"
  })));
}
Object.assign(__ds_scope, { TaskRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TaskRow.jsx", error: String((e && e.message) || e) }); }

// components/core/KeyValueRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Profile fact row: mono label left, value right, hairline rule under. */
function KeyValueRow({
  label,
  value,
  tone = "default",
  pulse = false,
  className = "",
  ...rest
}) {
  const cls = ["or-kv", tone === "danger" ? "or-kv--danger" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "or-kv__label"
  }, pulse ? /*#__PURE__*/React.createElement("span", {
    className: "or-ping"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)) : null, label), /*#__PURE__*/React.createElement("span", {
    className: "or-kv__value"
  }, value));
}
Object.assign(__ds_scope, { KeyValueRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/KeyValueRow.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 4px completion bar; `top` pins it to the top edge of a card. */
function ProgressBar({
  value = 0,
  top = false,
  rounded = false,
  className = "",
  ...rest
}) {
  const cls = ["or-progress", top ? "or-progress--top" : "", rounded ? "or-progress--rounded" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "or-progress__fill",
    style: {
      width: value + "%",
      borderRadius: rounded ? 9999 : 0
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Icon + label + value metric tile used in workspace headers. */
function StatTile({
  icon,
  label,
  value,
  iconColor = "var(--color-primary)",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["or-stat", className].filter(Boolean).join(" ")
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24,
    color: iconColor
  }) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "or-stat__label"
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "or-stat__value"
  }, value)));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/feedback/AlertCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Inline alert with an icon, body and one text action. */
function AlertCard({
  tone = "danger",
  icon,
  title,
  children,
  action,
  onAction,
  className = "",
  ...rest
}) {
  const glyph = icon || (tone === "danger" ? "warning" : "info");
  const color = tone === "danger" ? "var(--color-error)" : "var(--color-primary)";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["or-alert", "or-alert--" + tone, className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: glyph,
    size: 20,
    color: color,
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title ? /*#__PURE__*/React.createElement("h4", {
    className: "or-alert__title"
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    className: "or-alert__body"
  }, children), action ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: tone === "danger" ? "or-btn or-btn--danger-text or-btn--sm" : "or-btn or-btn--tonal or-btn--sm",
    onClick: onAction
  }, action, tone === "danger" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow_forward",
    size: 14
  }) : null) : null));
}
Object.assign(__ds_scope, { AlertCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/AlertCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/SuggestionCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** AI suggestion tile; `accent` adds the 4px primary spine of the top pick. */
function SuggestionCard({
  title,
  children,
  action = "Insert",
  onAction,
  accent = false,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["or-suggestion", accent ? "or-suggestion--accent" : "", className].filter(Boolean).join(" ")
  }, rest), accent ? /*#__PURE__*/React.createElement("div", {
    className: "or-suggestion__spine"
  }) : null, /*#__PURE__*/React.createElement("p", {
    className: "or-suggestion__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "or-suggestion__body"
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "or-btn or-btn--text or-btn--sm",
    onClick: onAction
  }, action)));
}
Object.assign(__ds_scope, { SuggestionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/SuggestionCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/ChatComposer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Assistant input: textarea, model picker, circular send button. */
function ChatComposer({
  value,
  onChange,
  onSend,
  placeholder = "I need help with my application…",
  model = "GPT-4",
  rows = 2,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["or-composer", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("textarea", {
    rows: rows,
    value: value,
    placeholder: placeholder,
    onChange: onChange ? e => onChange(e.target.value) : undefined
  }), /*#__PURE__*/React.createElement("div", {
    className: "or-composer__bar"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "or-composer__model"
  }, model, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "expand_more",
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "or-composer__send",
    onClick: onSend,
    disabled: !value,
    "aria-label": "Send"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow_upward",
    size: 18
  }))));
}
Object.assign(__ds_scope, { ChatComposer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ChatComposer.jsx", error: String((e && e.message) || e) }); }

// components/forms/OptionCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio/checkbox rendered as a full-width selectable card. */
function OptionCard({
  label,
  hint,
  name,
  checked,
  onChange,
  type = "radio",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    className: ["or-option", checked ? "or-option--checked" : "", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: type,
    name: name,
    checked: checked,
    onChange: onChange,
    style: {
      marginTop: 4,
      accentColor: "var(--color-primary)"
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "or-option__title"
  }, label), hint ? /*#__PURE__*/React.createElement("span", {
    className: "or-option__hint"
  }, hint) : null));
}
Object.assign(__ds_scope, { OptionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/OptionCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextArea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multiline field — the founder description box and inline notes. */
function TextArea({
  className = "",
  rows = 5,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    className: ["or-field", className].filter(Boolean).join(" "),
    rows: rows
  }, rest));
}
Object.assign(__ds_scope, { TextArea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextArea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Breadcrumb trail; the last item renders as the current page. */
function Breadcrumb({
  items = [],
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["or-crumbs", className].filter(Boolean).join(" ")
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: typeof it === "string" ? it : it.label
    }, i > 0 ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron_right",
      size: 16
    }) : null, last ? /*#__PURE__*/React.createElement("span", {
      className: "or-crumbs__current"
    }, typeof it === "string" ? it : it.label) : /*#__PURE__*/React.createElement("a", {
      href: typeof it === "string" ? "#" : it.href || "#"
    }, typeof it === "string" ? it : it.label));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SideNavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 256px workspace side nav: identity block, sections, footer utilities. */
function SideNavBar({
  name,
  role,
  initials,
  items = [],
  footerItems = [],
  activeItem,
  onSelect,
  cta,
  onCta,
  className = "",
  ...rest
}) {
  const row = it => /*#__PURE__*/React.createElement("button", {
    key: it.label,
    type: "button",
    onClick: onSelect ? () => onSelect(it.label) : undefined,
    className: ["or-side__row", it.label === activeItem ? "or-side__row--active" : "", it.tone === "danger" ? "or-side__row--danger" : ""].filter(Boolean).join(" "),
    style: {
      width: "100%",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 24
  }), it.label);
  return /*#__PURE__*/React.createElement("aside", _extends({
    className: ["or-side", className].filter(Boolean).join(" ")
  }, rest), name ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 32,
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: initials
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "700 var(--text-headline-md-size)/var(--text-headline-md-line) var(--font-headline)",
      color: "var(--color-primary)"
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-label-sm-weight) var(--text-label-sm-size)/var(--text-label-sm-line) var(--font-label)",
      letterSpacing: "var(--text-label-sm-tracking)",
      color: "var(--color-on-surface-variant)"
    }
  }, role))) : null, /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, items.map(row)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      paddingTop: 16,
      borderTop: "1px solid var(--color-border-ice)"
    }
  }, footerItems.map(row), cta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    pill: true,
    block: true,
    onClick: onCta,
    style: {
      marginTop: 16
    }
  }, cta) : null));
}
Object.assign(__ds_scope, { SideNavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SideNavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopNavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** App-wide top bar: wordmark, section links, chrome icons, primary CTA. */
function TopNavBar({
  brand = "Opportunity Radar",
  links = [],
  activeLink,
  onNavigate,
  actions = ["notifications", "account_circle"],
  cta,
  onCta,
  glass = false,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: ["or-nav", glass ? "or-nav--glass" : "", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-lg)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "or-nav__brand"
  }, brand), /*#__PURE__*/React.createElement("div", {
    className: "or-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    type: "button",
    className: ["or-nav__link", l === activeLink ? "or-nav__link--active" : ""].filter(Boolean).join(" "),
    onClick: onNavigate ? () => onNavigate(l) : undefined
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-sm)"
    }
  }, actions.map(a => /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    key: a,
    icon: a,
    "aria-label": a
  }))), cta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    pill: true,
    onClick: onCta
  }, cta) : null));
}
Object.assign(__ds_scope, { TopNavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopNavBar.jsx", error: String((e && e.message) || e) }); }

// components/progress/StepProgress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Horizontal application stepper with a filled track behind the dots. */
function StepProgress({
  steps = [],
  current = 0,
  percent,
  className = "",
  ...rest
}) {
  const pct = percent != null ? percent : steps.length > 1 ? current / (steps.length - 1) * 100 : 0;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["or-steps", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "or-steps__track"
  }), /*#__PURE__*/React.createElement("div", {
    className: "or-steps__fill",
    style: {
      width: pct + "%"
    }
  }), steps.map((label, i) => {
    const state = i < current ? "done" : i === current ? "current" : "todo";
    return /*#__PURE__*/React.createElement("div", {
      className: "or-steps__step",
      key: label
    }, /*#__PURE__*/React.createElement("div", {
      className: "or-steps__dot" + (state === "todo" ? "" : " or-steps__dot--" + state)
    }, state === "done" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 16
    }) : i + 1), /*#__PURE__*/React.createElement("span", {
      className: "or-steps__label" + (state === "todo" ? "" : " or-steps__label--" + state)
    }, label));
  }));
}
Object.assign(__ds_scope, { StepProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/StepProgress.jsx", error: String((e && e.message) || e) }); }

// components/progress/Timeline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Vertical dated timeline: past (cyan), current (blue ring), future (grey). */
function Timeline({
  items = [],
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["or-timeline", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "or-timeline__rule"
  }), items.map(it => {
    const s = it.state || "todo";
    return /*#__PURE__*/React.createElement("div", {
      className: "or-timeline__item",
      key: it.title
    }, /*#__PURE__*/React.createElement("div", {
      className: "or-timeline__dot" + (s === "todo" ? "" : " or-timeline__dot--" + s)
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "or-timeline__date" + (s === "todo" ? "" : " or-timeline__date--" + s)
    }, it.date), /*#__PURE__*/React.createElement("span", {
      className: "or-timeline__title",
      style: {
        fontWeight: s === "current" ? 700 : 400,
        color: s === "todo" ? "var(--color-on-surface-variant)" : undefined
      }
    }, it.title), it.badge ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
      tone: "danger"
    }, it.badge) : null), it.detail ? /*#__PURE__*/React.createElement("p", {
      className: "or-timeline__detail"
    }, it.detail) : null));
  }));
}
Object.assign(__ds_scope, { Timeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/Timeline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalyst-app/AssistantDrawer.jsx
try { (() => {
// Recreation of the AI Assistant drawer in design/claude-design/federal-catalyst.html.
const {
  IconButton,
  Icon,
  AlertCard,
  ChatComposer
} = window.OpportunityRadarDesignSystem_3ee40b;
function AssistantDrawer({
  open,
  onClose
}) {
  const [draft, setDraft] = React.useState("");
  const [sent, setSent] = React.useState([]);
  if (!open) return null;
  const send = () => {
    if (!draft.trim()) return;
    setSent(s => s.concat(draft.trim()));
    setDraft("");
  };
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "fixed",
      right: 0,
      top: 80,
      bottom: 0,
      width: 384,
      zIndex: 50,
      background: "var(--color-surface-container-lowest)",
      borderLeft: "1px solid var(--color-border-ice)",
      boxShadow: "var(--shadow-drawer)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 24,
      borderBottom: "1px solid var(--color-border-ice)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "600 24px/32px var(--font-headline)",
      color: "var(--color-text-deep)"
    }
  }, "Assistant"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "history",
    size: 20,
    dense: true,
    "aria-label": "History"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "more_vert",
    size: 20,
    dense: true,
    "aria-label": "More"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "close",
    size: 20,
    dense: true,
    onClick: onClose,
    "aria-label": "Close"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(AlertCard, {
    tone: "info",
    title: "The Assistant has just been updated to help you better!",
    action: "Permission settings"
  }, "You may now opt-in to share specific project details for better matching."), sent.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      alignSelf: "flex-end",
      maxWidth: "85%",
      background: "var(--color-primary-fixed)",
      color: "var(--color-on-primary-fixed)",
      borderRadius: "var(--radius-lg)",
      padding: "8px 12px",
      font: "400 14px/20px var(--font-body)"
    }
  }, m)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "500 18px/28px var(--font-body)",
      color: "var(--color-text-deep)"
    }
  }, "How can I assist you?"), /*#__PURE__*/React.createElement(Icon, {
    name: "auto_awesome",
    size: 20,
    color: "var(--color-primary)"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 8px",
      font: "500 12px/14px var(--font-label)",
      letterSpacing: ".05em",
      textTransform: "uppercase",
      color: "var(--color-outline)"
    }
  }, "Suggestions"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, ["Grant Eligibility", "SAM.gov Status", "Match Reasoning"].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    type: "button",
    onClick: () => setDraft(s),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      width: "100%",
      textAlign: "left",
      padding: 8,
      border: 0,
      background: "none",
      cursor: "pointer",
      borderRadius: "var(--radius-default)",
      font: "400 14px/20px var(--font-body)",
      color: "var(--color-text-deep)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "description",
    size: 18,
    color: "var(--color-outline)"
  }), " ", s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderTop: "1px solid var(--color-border-ice)",
      background: "var(--color-background)"
    }
  }, /*#__PURE__*/React.createElement(ChatComposer, {
    value: draft,
    onChange: setDraft,
    onSend: send
  })));
}
Object.assign(window, {
  AssistantDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalyst-app/AssistantDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalyst-app/OpportunityMapScreen.jsx
try { (() => {
// Recreation of design/claude-design/federal-catalyst.html — the Opportunity Map.
const {
  Card,
  Badge,
  Button,
  Icon,
  Avatar,
  KeyValueRow,
  ProgressBar,
  Timeline,
  OptionCard,
  OpportunityCard
} = window.OpportunityRadarDesignSystem_3ee40b;
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 12px/14px var(--font-label)",
      letterSpacing: ".05em",
      color: "var(--color-outline)"
    }
  }, children);
}
function FounderProfile() {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 75,
    top: true
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: "NH",
    size: "lg",
    style: {
      marginBottom: 12,
      marginTop: 4
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 4px",
      font: "600 24px/32px var(--font-headline)",
      color: "var(--color-text-deep)"
    }
  }, "NuraHealth AI"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 12px/14px var(--font-label)",
      letterSpacing: ".05em",
      textTransform: "uppercase",
      color: "var(--color-outline)",
      marginBottom: 12
    }
  }, "Utah, USA"), /*#__PURE__*/React.createElement(Badge, {
    tone: "caution",
    icon: "info",
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 24
    }
  }, "Confidence: Medium"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(KeyValueRow, {
    label: "Industry",
    value: "Healthcare IT"
  }), /*#__PURE__*/React.createElement(KeyValueRow, {
    label: "ARR",
    value: "$1M"
  }), /*#__PURE__*/React.createElement(KeyValueRow, {
    label: "Raised",
    value: "$2.5M"
  }), /*#__PURE__*/React.createElement(KeyValueRow, {
    label: "Ownership",
    value: "Unknown",
    tone: "danger",
    pulse: true
  })));
}
function ActionPlan() {
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: "0 0 24px",
      font: "600 20px/28px var(--font-headline)",
      color: "var(--color-text-deep)"
    }
  }, "Action Plan"), /*#__PURE__*/React.createElement(Timeline, {
    items: [{
      date: "This Week (Sep 1-7)",
      title: "Project Pitch",
      detail: "Submit 3-page NSF Project Pitch to get invited to full proposal.",
      state: "current"
    }, {
      date: "Mid-September",
      title: "SAM.gov Registration",
      detail: "Check UEI status and ensure CAGE code is active."
    }, {
      date: "October 15",
      title: "Full Proposal Deadline",
      detail: "Submit via Research.gov."
    }]
  }));
}
function UnlockResults({
  ownership,
  setOwnership,
  onSave,
  saved
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: 16,
      opacity: 0.1,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock_open",
    size: 64
  })), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: "0 0 8px",
      font: "600 20px/28px var(--font-headline)",
      color: "var(--color-text-deep)",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "key",
    color: "var(--color-primary)"
  }), " Unlock Results"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 24px",
      font: "400 14px/20px var(--font-body)",
      color: "var(--color-on-surface-variant)"
    }
  }, "Clarify ownership to reveal 14 hidden opportunities and confirm SBIR eligibility."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(OptionCard, {
    name: "ownership",
    label: ">50% Individual/Founder Owned",
    hint: "Standard SBIR eligibility",
    checked: ownership === "individual",
    onChange: () => setOwnership("individual")
  }), /*#__PURE__*/React.createElement(OptionCard, {
    name: "ownership",
    label: ">50% VC/PE Owned",
    hint: "Restricts some agencies",
    checked: ownership === "vc",
    onChange: () => setOwnership("vc")
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "tonal",
    block: true,
    onClick: onSave,
    disabled: !ownership,
    style: {
      marginTop: 24
    }
  }, saved ? "Saved" : "Save Details"));
}
function OpportunityMapScreen({
  drawerOpen
}) {
  const [ownership, setOwnership] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const [savedMatch, setSavedMatch] = React.useState(false);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1440,
      margin: "0 auto",
      padding: "48px var(--space-margin-desktop)",
      paddingRight: drawerOpen ? 420 : "var(--space-margin-desktop)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(12,1fr)",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 3",
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(FounderProfile, null), /*#__PURE__*/React.createElement(ActionPlan, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 6",
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "600 24px/32px var(--font-headline)",
      color: "var(--color-text-deep)"
    }
  }, "Top Matches"), /*#__PURE__*/React.createElement(SectionLabel, null, ownership && saved ? "1,703 live · 426 relevant awards" : "1,703 live · 412 relevant awards")), /*#__PURE__*/React.createElement(OpportunityCard, {
    title: "NSF SBIR Phase I",
    amount: "$275K",
    deadline: "Oct 15",
    identifier: "NSF-23-456",
    tier: "fit",
    tierLabel: "Likely fit",
    summary: "Seed funding for deep-tech startups to conduct R&D on unproven, high-impact innovations.",
    whyFit: ["Strong AI/Healthcare focus aligns with Digital Health topic.", "Revenue stage shows commercial viability potential.", "US-based small business requirement met."],
    disqualifiers: ["Requires clear technical risk (not just software dev).", "VC funding limits (must be >50% individual owned). Verify Ownership."],
    twin: {
      name: "NuraHealth AI (Salt Lake City)",
      detail: 'Received $256K in 2022 for "Natural Language Processing for Nursing Triage." They had similar ARR and team size at application.'
    },
    prepTime: "Estimated prep time: 120 hours",
    secondaryAction: savedMatch ? "Saved" : "Save for Later",
    onSave: () => setSavedMatch(true)
  }), /*#__PURE__*/React.createElement(Card, {
    variant: "dashed"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, ownership && saved ? "Eligibility confirmed" : "Held - Missing Data"), /*#__PURE__*/React.createElement(SectionLabel, null, "ID: NIH-R43")), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: "600 18px/26px var(--font-headline)",
      color: "var(--color-text-deep)"
    }
  }, "NIH SBIR (NINR)"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      maxWidth: 640,
      font: "400 14px/20px var(--font-body)",
      color: "var(--color-on-surface-variant)"
    }
  }, "National Institute of Nursing Research grants. Highly relevant, but we need ownership details to confirm eligibility against VC backing limits.")), /*#__PURE__*/React.createElement(Button, {
    variant: "text",
    iconAfter: "edit"
  }, "Resolve")))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 3"
    }
  }, /*#__PURE__*/React.createElement(UnlockResults, {
    ownership: ownership,
    setOwnership: setOwnership,
    saved: saved,
    onSave: () => setSaved(true)
  }))));
}
Object.assign(window, {
  OpportunityMapScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalyst-app/OpportunityMapScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalyst-app/PursuitWorkspaceScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Recreation of design/claude-design/pursuit-workspace.html.
const {
  Card,
  Badge,
  Button,
  Icon,
  IconButton,
  StatTile,
  Breadcrumb,
  SideNavBar,
  StepProgress,
  Timeline,
  TaskRow,
  AlertCard,
  SuggestionCard
} = window.OpportunityRadarDesignSystem_3ee40b;
const TASKS = [{
  title: "Draft Specific Aims",
  detail: "Create 1-2 page outline",
  due: "SEP 02",
  state: "done",
  assignee: "AK"
}, {
  title: "Define pilot outcomes",
  detail: "Measurable success criteria",
  due: "SEP 05",
  state: "current",
  urgent: true,
  assignee: "AK"
}, {
  title: "Write commercialization plan",
  detail: "Path to market strategy",
  due: "SEP 09",
  state: "todo",
  assignee: "AK"
}];
function EditorPanel() {
  return /*#__PURE__*/React.createElement(Card, {
    flush: true,
    style: {
      display: "flex",
      flexDirection: "column",
      minHeight: 500
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      padding: 12,
      borderBottom: "1px solid var(--color-border-ice)",
      background: "var(--color-surface-glass)",
      backdropFilter: "blur(12px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "description",
    color: "var(--color-primary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 16px/24px var(--font-body)",
      color: "var(--color-text-deep)"
    }
  }, "Specific Aims \u2014 working draft"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 12px/14px var(--font-label)",
      letterSpacing: ".05em",
      color: "var(--color-outline)",
      marginLeft: 8
    }
  }, "Saved 2 min ago")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "share",
    size: 16,
    dense: true,
    "aria-label": "Share"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "history",
    size: 16,
    dense: true,
    "aria-label": "History"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "open_in_full",
    size: 16,
    dense: true,
    "aria-label": "Expand"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      alignItems: "center",
      padding: 8,
      borderBottom: "1px solid var(--color-border-ice)",
      background: "rgba(247,249,251,.5)"
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "or-composer__model",
    style: {
      border: 0,
      background: "none",
      font: "400 14px/20px var(--font-body)",
      color: "var(--color-text-deep)"
    }
  }, /*#__PURE__*/React.createElement("option", null, "Normal")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 16,
      background: "var(--color-outline-variant)"
    }
  }), /*#__PURE__*/React.createElement("select", {
    className: "or-composer__model",
    style: {
      border: 0,
      background: "none",
      font: "400 14px/20px var(--font-body)",
      color: "var(--color-text-deep)"
    }
  }, /*#__PURE__*/React.createElement("option", null, "Inter")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 16,
      background: "var(--color-outline-variant)"
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "format_bold",
    size: 16,
    dense: true,
    "aria-label": "Bold"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "format_italic",
    size: 16,
    dense: true,
    "aria-label": "Italic"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "format_underlined",
    size: 16,
    dense: true,
    "aria-label": "Underline"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 16,
      background: "var(--color-outline-variant)"
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "format_list_bulleted",
    size: 16,
    dense: true,
    "aria-label": "Bulleted list"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "format_list_numbered",
    size: 16,
    dense: true,
    "aria-label": "Numbered list"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 24,
      font: "400 16px/26px var(--font-body)",
      color: "var(--color-text-deep)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      margin: "0 0 8px"
    }
  }, "1. Aim 1: Develop and validate an AI-powered clinical decision support tool"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 24px"
    }
  }, "We will design, build, and validate an AI-powered decision support tool that analyzes EHR data to identify high-risk inpatients at risk of clinical deterioration. We will use retrospective data from", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "rgba(126,212,253,.3)",
      borderBottom: "1px solid var(--color-secondary-container)",
      padding: "0 2px",
      cursor: "pointer"
    },
    title: "AI Suggestion: Clarify exact sample size origin."
  }, "~10,000 encounters"), " ", "and validate performance prospectively."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      margin: "0 0 8px"
    }
  }, "2. Aim 2: Conduct a hospital pilot to improve early intervention"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 24px"
    }
  }, "We will implement the tool in a real-world hospital setting and test whether it improves early detection and intervention. Success will be measured using", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "rgba(3,105,161,.2)",
      borderBottom: "2px solid var(--color-primary)",
      padding: "0 2px",
      cursor: "pointer"
    }
  }, "predefined clinical outcomes.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      margin: "0 0 8px"
    }
  }, "3. Aim 3: Prepare for commercialization and broader implementation"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "We will develop a commercialization plan, engage partners, and lay the groundwork for a future Phase II study and market adoption.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 288,
      flex: "none",
      borderLeft: "1px solid var(--color-border-ice)",
      background: "rgba(247,249,251,.3)",
      padding: 16,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
      font: "700 14px/16px var(--font-label)",
      letterSpacing: ".05em",
      color: "var(--color-primary)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "auto_awesome",
    size: 16
  }), " AI Suggestions (3)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(SuggestionCard, {
    accent: true,
    title: "Strengthen measurable outcomes"
  }, "Define specific, quantifiable pilot outcomes and targets. E.g., \"Reduce 30-day unplanned readmissions by 15%\"."), /*#__PURE__*/React.createElement(SuggestionCard, {
    title: "Clarify sample size source"
  }, "Specify the specific hospital network or database providing the 10,000 encounters.")))));
}
function PursuitWorkspaceScreen() {
  const [tasks, setTasks] = React.useState(TASKS);
  const [section, setSection] = React.useState("Active Grants");
  const done = tasks.filter(t => t.state === "done").length;
  const toggle = i => setTasks(ts => ts.map((t, j) => j === i ? {
    ...t,
    state: t.state === "done" ? "todo" : "done"
  } : t));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(SideNavBar, {
    name: "Agent Catalyst",
    role: "Federal Funding Lead",
    initials: "AC",
    activeItem: section,
    onSelect: setSection,
    cta: "New Application",
    items: [{
      label: "Dashboard",
      icon: "dashboard"
    }, {
      label: "Active Grants",
      icon: "assignment"
    }, {
      label: "Compliance",
      icon: "verified_user"
    }, {
      label: "Reports",
      icon: "analytics"
    }],
    footerItems: [{
      label: "Settings",
      icon: "settings"
    }, {
      label: "Support",
      icon: "help"
    }, {
      label: "Logout",
      icon: "logout",
      tone: "danger"
    }]
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [section, "NSF SBIR Phase I"]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "700 32px/40px var(--font-headline)",
      letterSpacing: "-0.01em",
      color: "var(--color-text-deep)"
    }
  }, "NSF SBIR Phase I Workspace"), /*#__PURE__*/React.createElement(Button, {
    variant: "glass",
    pill: true,
    icon: "open_in_new"
  }, "Review official notice"))), /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    style: {
      display: "flex",
      gap: 48,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 24px/32px var(--font-headline)",
      color: "var(--color-primary)"
    }
  }, 34 + done * 8, "% ready"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Target: Oct 16")), /*#__PURE__*/React.createElement(StepProgress, {
    steps: ["Eligibility", "Narrative", "Budget", "Review", "Submit"],
    current: 1,
    percent: 34 + done * 8
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      borderLeft: "1px solid var(--color-border-ice)",
      paddingLeft: 48
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: "check_circle",
    iconColor: "var(--color-secondary)",
    label: "Fit Score",
    value: "Strong (82)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "account_balance",
    label: "Funding",
    value: "Up to $314K"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    flush: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottom: "1px solid var(--color-border-ice)",
      background: "rgba(255,255,255,.5)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "600 16px/24px var(--font-headline)",
      color: "var(--color-text-deep)"
    }
  }, "Narrative Tasks"), /*#__PURE__*/React.createElement(Button, {
    variant: "text",
    size: "sm",
    icon: "add"
  }, "Add Task")), tasks.map((t, i) => /*#__PURE__*/React.createElement(TaskRow, _extends({
    key: t.title
  }, t, {
    onClick: () => toggle(i),
    style: {
      cursor: "pointer"
    }
  })))), /*#__PURE__*/React.createElement(EditorPanel, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(AlertCard, {
    title: "SAM.gov status unconfirmed",
    action: "Verify now"
  }, "Active registration is required at time of submission. Confirm or update before ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--color-error)"
    }
  }, "Oct 02"), "."), /*#__PURE__*/React.createElement(Card, {
    variant: "glass"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 20px",
      paddingBottom: 8,
      borderBottom: "1px solid var(--color-border-ice)",
      font: "600 16px/24px var(--font-headline)",
      color: "var(--color-text-deep)"
    }
  }, "Deadline Timeline"), /*#__PURE__*/React.createElement(Timeline, {
    items: [{
      date: "AUG 14",
      title: "Pursuit created",
      state: "done"
    }, {
      date: "AUG 20",
      title: "Eligibility complete",
      state: "done"
    }, {
      date: "SEP 05",
      title: "Pilot outcomes due",
      state: "current",
      badge: "IN 3 DAYS"
    }, {
      date: "SEP 12",
      title: "First full draft due"
    }, {
      date: "OCT 16",
      title: "Submit application",
      detail: "by 5:00 PM ET"
    }]
  }))))));
}
Object.assign(window, {
  PursuitWorkspaceScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalyst-app/PursuitWorkspaceScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.OpportunityCard = __ds_scope.OpportunityCard;

__ds_ns.TaskRow = __ds_scope.TaskRow;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.KeyValueRow = __ds_scope.KeyValueRow;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.AlertCard = __ds_scope.AlertCard;

__ds_ns.SuggestionCard = __ds_scope.SuggestionCard;

__ds_ns.ChatComposer = __ds_scope.ChatComposer;

__ds_ns.OptionCard = __ds_scope.OptionCard;

__ds_ns.TextArea = __ds_scope.TextArea;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.SideNavBar = __ds_scope.SideNavBar;

__ds_ns.TopNavBar = __ds_scope.TopNavBar;

__ds_ns.StepProgress = __ds_scope.StepProgress;

__ds_ns.Timeline = __ds_scope.Timeline;

})();
