---
theme: ./
transition: view-transition
---

# Slidev Theme Starter

Presentation slides for developers

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" flex="~ justify-center items-center gap-2" hover="bg-white bg-opacity-10">
    Press Space for next page <div class="i-carbon:arrow-right inline-block"/>
  </span>
</div>

---

# What is Slidev?

Slidev is a slide maker and presentation tool designed for developers. It includes the following features:

- 📝 **Text-based** - focus on your content with Markdown, then style it later
- 🎨 **Themable** - themes can be shared and reused as npm packages
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion
- 🤹 **Interactive** - embed Vue components to enhance your expressions
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export to PDF, PPTX, PNGs, or even a hostable SPA
- 🛠 **Hackable** - virtually anything that's possible on a webpage is possible in Slidev

<br>
<br>

Read more about [Why Slidev?](https://sli.dev/guide/why)

---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel

## Keyboard Shortcuts

|     |     |
| --- | --- |
| <kbd>space</kbd> / <kbd>tab</kbd> / <kbd>right</kbd> | next animation or slide |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd> | previous slide |
| <kbd>down</kbd> | next slide |

---
layout: image-right
image: https://cover.sli.dev
---

# Code

Use code snippets and get the highlighting directly!

```kotlin
interface User {
  val id: number
  val firstName: string
  val lastName: string
  val role: string
}

fun updateUser(id: number, update: User?) {
  if (!update) return
  getUserOrNull(id)?.update(update)
}
```

---
layout: center
class: "text-center"
---

# Learn More

[Documentation](https://sli.dev) / [GitHub Repo](https://github.com/slidevjs/slidev)

---
kodee:
  variant: greeting
  size: large
  position: featured
---

# Kodee Magic Move Demo

## Welcome to Kotlin!

Meet Kodee, the Kotlin mascot!

- Kodee appears large on this slide
- Watch the magic move to the next slide
- Smooth scale and position animation

---
kodee:
  variant: greeting
  size: small
  position: corner
---

# Details Slide

## Code Example

Here's some Kotlin code with Kodee in the corner:

```kotlin
fun greet(name: String) {
    println("Hello, $name!")
}

fun main() {
    greet("Kotlin Developer")
}
```

Notice how Kodee smoothly transitioned from large to small!

---
kodee:
  variant: wink
  size: large
  position: featured
---

# Different Kodee Variants

You can use different Kodee images:

- `greeting` - Kodee waving hello
- `wink` - Kodee winking
- `jumping` - Kodee jumping with joy
- `sitting` - Kodee sitting down
- `drinking` - Kodee with a drink
- And more!

---
kodee:
  variant: wink
  size: small
  position: corner
---

# Minimal Boilerplate

Just add to your slide's frontmatter:

```yaml
---
kodee:
  variant: greeting
  size: large
  position: featured
---
```

That's it! Kodee will automatically appear and animate between slides.

---
kodee:
  variant: wave
  size: large
  position: featured
---

# Different Kodee Variants

You can use different Kodee images:

- `greeting` - Kodee waving hello
- `wink` - Kodee winking
- `jumping` - Kodee jumping with joy
- `sitting` - Kodee sitting down
- `drinking` - Kodee with a drink
- And more!

---
kodee:
  variant: wave
  size: small
  position: corner
---

# Minimal Boilerplate

Just add to your slide's frontmatter:

```yaml
---
kodee:
  variant: greeting
  size: large
  position: featured
---
```

That's it! Kodee will automatically appear and animate between slides.
