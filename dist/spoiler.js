"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanSpoilersHTML = exports.SpoilerOutput = exports.SpoilerEditor = void 0;
const react_1 = __importStar(require("react"));
const core_1 = require("@tiptap/core");
const react_2 = require("@tiptap/react");
const spoilerInputRegex = /(?:^|\s)((?:\|\|)((?:[^||]+))(?:\|\|))$/;
const spoilerPasteRegex = /(?:^|\s)((?:\|\|)((?:[^||]+))(?:\|\|))/g;
exports.SpoilerEditor = core_1.Mark.create({
    name: 'spoilerEditor',
    addOptions() {
        return {
            HTMLAttributes: {},
            spoilerClass: null,
            inputRegex: spoilerInputRegex,
            pasteRegex: spoilerPasteRegex,
            inline: true,
            inclusive: false,
        };
    },
    inline() {
        return this.options.inline;
    },
    group() {
        return this.options.inline ? 'inline' : 'block';
    },
    inclusive() {
        return this.options.inclusive;
    },
    parseHTML() {
        return [
            {
                tag: 'spoiler',
            },
        ];
    },
    addCommands() {
        return {
            setSpoiler: () => ({ commands }) => {
                return commands.setMark(this.name);
            },
            toggleSpoiler: () => ({ commands }) => {
                return commands.toggleMark(this.name);
            },
            unsetSpoiler: () => ({ commands }) => {
                return commands.unsetMark(this.name);
            },
        };
    },
    addInputRules() {
        return [
            (0, core_1.markInputRule)({
                find: this.options.inputRegex,
                type: this.type,
            }),
        ];
    },
    addPasteRules() {
        return [
            (0, core_1.markPasteRule)({
                find: this.options.pasteRegex,
                type: this.type,
            }),
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['spoiler', (0, core_1.mergeAttributes)(HTMLAttributes, { class: this.options.spoilerClass }), 0];
    },
});
const SpoilerOutputComponent = (props) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const options = props.extension.options;
    return (react_1.default.createElement(react_2.NodeViewWrapper, { as: options.as },
        react_1.default.createElement(react_2.NodeViewContent, { as: options.as, className: "".concat(options.spoilerClass, " ").concat(open ? options.spoilerOpenClass : options.spoilerCloseClass), tabIndex: 0, onKeyDown: function (e) {
                return e.key === "Enter" ? setOpen(!open) : undefined;
            }, onClick: function () { return setOpen(!open); } })));
};
exports.SpoilerOutput = core_1.Node.create({
    name: 'spoilerOutput',
    addOptions() {
        return {
            HTMLAttributes: {},
            spoilerClass: null,
            spoilerOpenClass: null,
            spoilerCloseClass: null,
            as: 'span',
            inline: true,
            content: 'inline*',
        };
    },
    inline() {
        return this.options.inline;
    },
    group() {
        return this.options.inline ? 'inline' : 'block';
    },
    content() {
        return this.options.content;
    },
    parseHTML() {
        return [
            {
                tag: 'spoiler',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['spoiler', (0, core_1.mergeAttributes)(HTMLAttributes)];
    },
    addNodeView() {
        return (0, react_2.ReactNodeViewRenderer)(SpoilerOutputComponent);
    },
});
const cleanSpoilersHTML = (html) => {
    return html.replace(/(<spoiler)(?:\sclass="[^"]*")(>[^<>]*<\/spoiler>)/gmi, '$1$2');
};
exports.cleanSpoilersHTML = cleanSpoilersHTML;
