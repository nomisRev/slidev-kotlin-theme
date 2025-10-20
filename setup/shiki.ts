import type { ShikiSetupReturn } from '@slidev/types'
import { defineShikiSetup } from '@slidev/types'
import type { ShikiTransformer } from 'shiki'

// Transformer to handle v-mark spans inside code blocks
// NOTE: This transformer will NOT work with magic-move blocks (````md magic-move)
// as Shiki Magic Move does not support transformers.
// For magic-move blocks, use alternative approaches like CSS styling or line highlighting.
function transformerVMark(): ShikiTransformer {
    const PLACEHOLDER_PREFIX = '___VMARK_'
    const placeholders = new Map<string, string>()

    return {
        name: 'slidev:v-mark-transformer',
        preprocess(code) {
            // Reset placeholders for each code block
            placeholders.clear()
            let counter = 0

            // Replace <span v-mark.*>...</span> with placeholders before tokenization
            return code.replace(/<span\s+(v-mark[^>]*)>([^<]*)<\/span>/g, (match, vMarkAttr, content) => {
                const placeholder = `${PLACEHOLDER_PREFIX}${counter++}___`
                placeholders.set(placeholder, { vMarkAttr, content })
                return placeholder
            })
        },
        postprocess(html) {
            // Restore the v-mark spans after HTML generation
            let result = html

            placeholders.forEach(({ vMarkAttr, content }, placeholder) => {
                // Find and replace the placeholder with the v-mark span
                // The placeholder might be HTML-escaped or split across spans
                const escapedPlaceholder = placeholder
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')

                const replacement = `<span ${vMarkAttr}>${content}</span>`

                // Try to replace both escaped and unescaped versions
                result = result.replace(escapedPlaceholder, replacement)
                result = result.replace(placeholder, replacement)

                // Handle case where placeholder is split across multiple <span> tags
                const escapedParts = escapedPlaceholder.split('_')
                let pattern = escapedParts.join('(?:<\\/span><span[^>]*>)?_?')
                result = result.replace(new RegExp(pattern, 'g'), replacement)
            })

            return result
        }
    }
}

/**
 * IntelliJ IDEA Dark Theme for Shiki
 * 
 * This theme matches IntelliJ IDEA's default dark theme (2025.2.3.0.0).
 * All colors are extracted from IntelliJDark.icls and mapped to TextMate scopes.
 * 
 * Color Mapping Documentation:
 * 
 * Background & Foreground:
 * - bg: #1e1f22 (from TEXT background in IntelliJDark.icls)
 * - fg: #bcbec4 (from TEXT foreground, DEFAULT_IDENTIFIER)
 * 
 * Comments:
 * - #7a7e85 (from DEFAULT_LINE_COMMENT, DEFAULT_BLOCK_COMMENT)
 * - #5f826b (from DEFAULT_DOC_COMMENT - italic)
 * 
 * Keywords & Control Flow:
 * - #cf8e6d (from DEFAULT_KEYWORD)
 * 
 * Strings & Characters:
 * - #6aab73 (from DEFAULT_STRING)
 * - #cf8e6d (from DEFAULT_VALID_STRING_ESCAPE for escape sequences)
 * 
 * Numbers:
 * - #2aacb8 (from DEFAULT_NUMBER)
 * 
 * Functions & Methods:
 * - #56a8f5 (from DEFAULT_FUNCTION_DECLARATION)
 * - #57aaf7 (from DEFAULT_INSTANCE_METHOD)
 * 
 * Types & Classes:
 * - #bcbec4 (from DEFAULT_CLASS_REFERENCE - default text color)
 * - #16baac (from TYPE_PARAMETER_NAME_ATTRIBUTES for type parameters)
 * 
 * Variables & Properties:
 * - #c77dbb (from DEFAULT_CONSTANT, DEFAULT_INSTANCE_FIELD, DEFAULT_STATIC_FIELD)
 * - #bcbec4 (from DEFAULT_IDENTIFIER for regular variables)
 * 
 * Annotations & Metadata:
 * - #b3ae60 (from DEFAULT_METADATA)
 * 
 * Operators & Punctuation:
 * - #bcbec4 (from DEFAULT_OPERATION_SIGN, DEFAULT_BRACES, DEFAULT_BRACKETS, etc.)
 * 
 * Kotlin-Specific:
 * - Labels: #32b8af (from KOTLIN_LABEL)
 * - Named Arguments: #56c1d6 (from KOTLIN_NAMED_ARGUMENT)
 */
const intellijDarkTheme = {
    name: 'intellij-dark',
    type: 'dark',
    colors: {
        // Editor colors from IntelliJDark.icls
        'editor.background': '#1e1f22',
        'editor.foreground': '#bcbec4',
    },
    settings: [
        {
            // Default text style
            settings: {
                foreground: '#bcbec4', // DEFAULT_IDENTIFIER
            },
        },
        {
            // Comments - line and block comments
            scope: [
                'comment',
                'punctuation.definition.comment',
            ],
            settings: {
                foreground: '#7a7e85', // DEFAULT_LINE_COMMENT, DEFAULT_BLOCK_COMMENT
            },
        },
        {
            // Documentation comments (KDoc, JavaDoc, etc.)
            scope: [
                'comment.block.documentation',
                'comment.block.javadoc',
            ],
            settings: {
                foreground: '#5f826b', // DEFAULT_DOC_COMMENT
                fontStyle: 'italic',
            },
        },
        {
            // Documentation tags (@param, @return, etc.)
            scope: [
                'storage.type.class.jsdoc',
                'keyword.other.documentation',
            ],
            settings: {
                foreground: '#67a37c', // DEFAULT_DOC_COMMENT_TAG
            },
        },
        {
            // Keywords (fun, val, var, if, else, when, return, etc.)
            scope: [
                'keyword',
                'keyword.control',
                'keyword.operator.new',
                'storage.type',
                'storage.modifier',
            ],
            settings: {
                foreground: '#cf8e6d', // DEFAULT_KEYWORD
            },
        },
        {
            // Strings
            scope: [
                'string',
                'string.quoted',
                'string.template',
            ],
            settings: {
                foreground: '#6aab73', // DEFAULT_STRING
            },
        },
        {
            // String interpolation expressions
            scope: [
                'meta.template.expression',
                'punctuation.definition.template-expression',
                'punctuation.section.embedded',
            ],
            settings: {
                foreground: '#bcbec4', // Default text color for interpolated expressions
            },
        },
        {
            // String escape sequences (\n, \t, etc.)
            scope: [
                'constant.character.escape',
            ],
            settings: {
                foreground: '#cf8e6d', // DEFAULT_VALID_STRING_ESCAPE
            },
        },
        {
            // Numbers (integers, floats, hex, etc.)
            scope: [
                'constant.numeric',
                'constant.language.numeric',
            ],
            settings: {
                foreground: '#2aacb8', // DEFAULT_NUMBER
            },
        },
        {
            // Boolean and null literals
            scope: [
                'constant.language.boolean',
                'constant.language.null',
                'constant.language.undefined',
            ],
            settings: {
                foreground: '#cf8e6d', // Keywords color for language constants
            },
        },
        {
            // Function declarations
            scope: [
                'entity.name.function',
                'meta.function',
                'support.function',
            ],
            settings: {
                foreground: '#56a8f5', // DEFAULT_FUNCTION_DECLARATION
            },
        },
        {
            // Function calls
            scope: [
                'meta.function-call',
                'entity.name.function-call',
            ],
            settings: {
                foreground: '#56a8f5', // Same as function declarations
            },
        },
        {
            // Method calls
            scope: [
                'meta.method-call',
                'entity.name.method-call',
            ],
            settings: {
                foreground: '#57aaf7', // DEFAULT_INSTANCE_METHOD
            },
        },
        {
            // Class names and types
            scope: [
                'entity.name.class',
                'entity.name.type',
                'support.class',
                'support.type',
            ],
            settings: {
                foreground: '#bcbec4', // DEFAULT_CLASS_REFERENCE
            },
        },
        {
            // Type parameters (generics like <T>)
            scope: [
                'entity.name.type.parameter',
                'storage.type.generic',
            ],
            settings: {
                foreground: '#16baac', // TYPE_PARAMETER_NAME_ATTRIBUTES
            },
        },
        {
            // Interface names
            scope: [
                'entity.name.interface',
            ],
            settings: {
                foreground: '#bcbec4', // Same as class names
            },
        },
        {
            // Properties and fields
            scope: [
                'variable.other.property',
                'variable.other.object.property',
                'entity.name.variable.field',
            ],
            settings: {
                foreground: '#c77dbb', // DEFAULT_INSTANCE_FIELD
            },
        },
        {
            // Constants
            scope: [
                'variable.other.constant',
                'constant.other',
            ],
            settings: {
                foreground: '#c77dbb', // DEFAULT_CONSTANT
                fontStyle: 'italic',
            },
        },
        {
            // Parameters
            scope: [
                'variable.parameter',
                'meta.parameter',
            ],
            settings: {
                foreground: '#bcbec4', // Default identifier color
            },
        },
        {
            // Variables
            scope: [
                'variable',
                'variable.other',
            ],
            settings: {
                foreground: '#bcbec4', // DEFAULT_IDENTIFIER
            },
        },
        {
            // Annotations (@Deprecated, @Override, etc.)
            scope: [
                'storage.type.annotation',
                'punctuation.definition.annotation',
                'meta.annotation',
            ],
            settings: {
                foreground: '#b3ae60', // DEFAULT_METADATA
            },
        },
        {
            // Operators (+, -, *, /, =, ==, etc.)
            scope: [
                'keyword.operator',
                'keyword.operator.arithmetic',
                'keyword.operator.comparison',
                'keyword.operator.logical',
                'keyword.operator.assignment',
            ],
            settings: {
                foreground: '#bcbec4', // DEFAULT_OPERATION_SIGN
            },
        },
        {
            // Punctuation (braces, brackets, parentheses, commas, semicolons, dots)
            scope: [
                'punctuation',
                'punctuation.separator',
                'punctuation.terminator',
                'punctuation.accessor',
                'meta.brace',
                'meta.bracket',
            ],
            settings: {
                foreground: '#bcbec4', // DEFAULT_BRACES, DEFAULT_BRACKETS, DEFAULT_PARENTHS, etc.
            },
        },
        {
            // Kotlin-specific: Labels
            scope: [
                'entity.name.label',
            ],
            settings: {
                foreground: '#32b8af', // KOTLIN_LABEL
            },
        },
        {
            // Kotlin-specific: Named arguments
            scope: [
                'variable.parameter.named',
            ],
            settings: {
                foreground: '#56c1d6', // KOTLIN_NAMED_ARGUMENT
            },
        },
        {
            // This keyword
            scope: [
                'variable.language.this',
                'variable.language.super',
            ],
            settings: {
                foreground: '#cf8e6d', // Keyword color
            },
        },
        {
            // Import/package statements
            scope: [
                'keyword.control.import',
                'keyword.control.package',
            ],
            settings: {
                foreground: '#cf8e6d', // DEFAULT_KEYWORD
            },
        },
        {
            // Namespace/package names
            scope: [
                'entity.name.namespace',
                'entity.name.package',
            ],
            settings: {
                foreground: '#bcbec4', // Default text color
            },
        },
    ],
    bg: '#1e1f22', // TEXT background
    fg: '#bcbec4', // TEXT foreground
}

export default defineShikiSetup((): ShikiSetupReturn => {
    return {
        themes: {
            dark: intellijDarkTheme,
            light: intellijDarkTheme, // Using dark theme for both for now
        },
        transformers: [
            transformerVMark(),
        ],
    }
})
