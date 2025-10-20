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
 * From: `node debug.js Test.kt`:
 *
 *   comment.block.javadoc.kotlin
 *   comment.line.double-slash.kotlin
 *   constant.character.escape.kotlin
 *   constant.language.boolean.kotlin
 *   constant.language.null.kotlin
 *   constant.numeric.binary.kotlin
 *   constant.numeric.decimal.kotlin
 *   constant.numeric.hex.kotlin
 *   entity.name.function.call.kotlin
 *   entity.name.function.declaration.kotlin
 *   entity.name.package.kotlin
 *   entity.name.type.annotation.kotlin
 *   entity.name.type.class.extension.kotlin
 *   entity.name.type.class.kotlin
 *   entity.name.type.kotlin
 *   entity.name.type.object.kotlin
 *   keyword.control.kotlin
 *   keyword.hard.class.kotlin
 *   keyword.hard.fun.kotlin
 *   keyword.hard.kotlin
 *   keyword.hard.object.kotlin
 *   keyword.hard.package.kotlin
 *   keyword.hard.typealias.kotlin
 *   keyword.operator.arithmetic.kotlin
 *   keyword.operator.assignment.kotlin
 *   keyword.operator.comparison.kotlin
 *   keyword.operator.logical.kotlin
 *   keyword.operator.range.kotlin
 *   keyword.soft.kotlin
 *   meta.import.kotlin
 *   meta.package.kotlin
 *   meta.template.expression.kotlin
 *   punctuation.definition.template-expression.begin
 *   punctuation.definition.template-expression.end
 *   source.kotlin
 *   storage.modifier.other.kotlin
 *   storage.type.function.arrow.kotlin
 *   string.quoted.double.kotlin
 *   string.quoted.single.kotlin
 *   variable.language.this.kotlin
 *   variable.language.wildcard.kotlin
 *   variable.string-escape.kotlin
 */
const intellijDarkTheme = {
    name: 'intellij-dark',
    type: 'dark',
    colors: {
        // Editor colors
        'editor.background': '#1e1f22',
        'editor.foreground': '#bcbec4',
    },
    settings: [
        // Base foreground/background
        {
            settings: {
                foreground: '#bcbec4',
                background: '#1e1f22',
            }
        },
        // Comments - line and block comments (gray)
        {
            scope: [
                'comment.line.double-slash.kotlin',
                'comment.block.kotlin',
                'comment',
            ],
            settings: {
                foreground: '#7a7e85',
            }
        },
        // Documentation comments (greenish, italic)
        {
            scope: [
                'comment.block.javadoc.kotlin',
                'comment.block.documentation',
            ],
            settings: {
                foreground: '#5f826b',
                fontStyle: 'italic',
            }
        },
        // Keywords - all hard keywords (orange-brown)
        {
            scope: [
                'keyword.hard.kotlin',
                'keyword.hard.fun.kotlin',
                'keyword.hard.class.kotlin',
                'keyword.hard.object.kotlin',
                'keyword.hard.package.kotlin',
                'keyword.hard.typealias.kotlin',
                'keyword.control.kotlin',
                'keyword.soft.kotlin',
                'keyword',
            ],
            settings: {
                foreground: '#cf8e6d',
            }
        },
        // Storage modifiers (orange-brown, same as keywords)
        {
            scope: [
                'storage.modifier.other.kotlin',
                'storage.modifier',
            ],
            settings: {
                foreground: '#cf8e6d',
            }
        },
        // Boolean and null constants (orange-brown, same as keywords)
        {
            scope: [
                'constant.language.boolean.kotlin',
                'constant.language.null.kotlin',
                'constant.language',
            ],
            settings: {
                foreground: '#cf8e6d',
            }
        },
        // Strings (green)
        {
            scope: [
                'string.quoted.double.kotlin',
                'string.quoted.single.kotlin',
                'string',
            ],
            settings: {
                foreground: '#6aab73',
            }
        },
        // String escape sequences (orange-brown, same as keywords)
        {
            scope: [
                'constant.character.escape.kotlin',
                'variable.string-escape.kotlin',
                'constant.character.escape',
            ],
            settings: {
                foreground: '#cf8e6d',
            }
        },
        // String template expressions (default color for the delimiters)
        {
            scope: [
                'punctuation.definition.template-expression.begin',
                'punctuation.definition.template-expression.end',
                'meta.template.expression.kotlin',
            ],
            settings: {
                foreground: '#bcbec4',
            }
        },
        // Numbers - all numeric literals (cyan)
        {
            scope: [
                'constant.numeric.decimal.kotlin',
                'constant.numeric.hex.kotlin',
                'constant.numeric.binary.kotlin',
                'constant.numeric',
            ],
            settings: {
                foreground: '#2aacb8',
            }
        },
        // Function declarations (blue)
        {
            scope: [
                'entity.name.function.declaration.kotlin',
                'entity.name.function',
            ],
            settings: {
                foreground: '#56a8f5',
            }
        },
        // Function calls (blue)
        {
            scope: [
                'entity.name.function.call.kotlin',
                'meta.function-call',
            ],
            settings: {
                foreground: '#b5b7bd',
            }
        },
        // Class names (default color)
        {
            scope: [
                'entity.name.type.class.kotlin',
                'entity.name.type.class.extension.kotlin',
                'entity.name.type.kotlin',
                'entity.name.type',
                'entity.name.class',
            ],
            settings: {
                foreground: '#bcbec4',
            }
        },
        // Object names (default color)
        {
            scope: [
                'entity.name.type.object.kotlin',
            ],
            settings: {
                foreground: '#bcbec4',
            }
        },
        // Package names (default color)
        {
            scope: [
                'entity.name.package.kotlin',
                'meta.package.kotlin',
            ],
            settings: {
                foreground: '#bcbec4',
            }
        },
        // Annotations (yellow-green)
        {
            scope: [
                'entity.name.type.annotation.kotlin',
                'storage.type.annotation',
                'meta.annotation',
            ],
            settings: {
                foreground: '#b3ae60',
            }
        },
        // Operators (default color)
        {
            scope: [
                'keyword.operator.arithmetic.kotlin',
                'keyword.operator.assignment.kotlin',
                'keyword.operator.comparison.kotlin',
                'keyword.operator.logical.kotlin',
                'keyword.operator.range.kotlin',
                'keyword.operator',
            ],
            settings: {
                foreground: '#bcbec4',
            }
        },
        // Arrow function type (default color)
        {
            scope: [
                'storage.type.function.arrow.kotlin',
            ],
            settings: {
                foreground: '#bcbec4',
            }
        },
        // Language keywords like 'this' (orange-brown, same as keywords)
        {
            scope: [
                'variable.language.this.kotlin',
                'variable.language.wildcard.kotlin',
                'variable.language',
            ],
            settings: {
                foreground: '#cf8e6d',
            }
        },
        // Import statements (default color)
        {
            scope: [
                'meta.import.kotlin',
            ],
            settings: {
                foreground: '#bcbec4',
            }
        },
    ]
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
