import type { ElementType } from 'react';
import { Mark, Node } from '@tiptap/core';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        spoilerEditor: {
            setSpoiler: () => ReturnType;
            toggleSpoiler: () => ReturnType;
            unsetSpoiler: () => ReturnType;
        };
    }
}
export declare type SpoilerEditorOptions = {
    HTMLAttributes: Record<string, any>;
    spoilerClass: string | null;
    inputRegex: RegExp;
    pasteRegex: RegExp;
    inline: boolean;
    inclusive: boolean;
};
export declare type SpoilerOutputOptions = {
    HTMLAttributes: Record<string, any>;
    spoilerClass: string | null;
    spoilerOpenClass: string | null;
    spoilerCloseClass: string | null;
    as: ElementType;
    inline: boolean;
    content: string;
};
export declare const SpoilerEditor: Mark<SpoilerEditorOptions, any>;
export declare const SpoilerOutput: Node<SpoilerOutputOptions, any>;
export declare const cleanSpoilersHTML: (html: string) => string;
