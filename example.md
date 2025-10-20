---
theme: ./
transition: view-transition
---

# Kodee Magic Move Demo

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

---
kodee:
  variant: wave
  size: small
  position: corner
---

# IntelliJ like Syntax Highlighting

```kotlin
interface User {
    val id: Int
    val firstName: String
    val lastName: String
    val role: String
}

fun getUser(id: Long): User? = null

fun updateUser(id: Long, update: User?) {
    if (update == null) return
    getUser(id)
}
```

---
kodee:
  variant: wave
  size: small
  position: corner
---

# Magic Kotlin Code Move

````md magic-move
```kotlin
fun updateUser(id: Long, update: User?) {
}
```

```kotlin
fun updateUser(id: Long, update: User?) {
    if (update == null) return
    getUser(id)
}
```
````

---
kodee:
  variant: wave
  size: small
  position: corner
---

# Magic move & line highlighting


# Lambda

````md magic-move
```kotlin
val plusOne: (Int) -> Int = { it + 1 }
```
```kotlin{3}
val plusOne: (Int) -> Int = { it + 1 }

val sum: (Int, Int) -> Int = { a, b -> a + b }
```

```kotlin{5}
val plusOne: (Int) -> Int = { it + 1 }

val sum: (Int, Int) -> Int = { a, b -> a + b }

val plus: (Int, Int) -> Int = Int::plus
```
````

---
kodee:
  variant: wave
  size: small
  position: corner
---

# Kotlin code & Rough Notation

```kotlin
operator fun <span v-mark.underline>Content</span>.unaryPlus(): Unit {
    <span v-mark.circle>println</span>("Hello, World!")
}
```

---