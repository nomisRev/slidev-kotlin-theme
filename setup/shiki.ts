import type { ShikiSetupReturn } from '@slidev/types'
import { defineShikiSetup } from '@slidev/types'
import type { ShikiTransformer } from 'shiki'
import intellijDark from './intellij-dark.json'

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

export default defineShikiSetup((): ShikiSetupReturn => {
    return {
        themes: {
            dark: intellijDark,
            light: intellijDark,
        },
        transformers: [
            transformerVMark(),
        ],
    }
})
