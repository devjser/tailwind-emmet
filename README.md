# Tailwind Emmet

Enhance your workflow with Tailwind CSS and Emmet in VS Code. This extension provides intelligent completion and manipulation of Tailwind CSS classes using Emmet abbreviations.

## Features

- **Intelligent Completion**: Get suggestions for Tailwind CSS classes as you type Emmet abbreviations.
- **Class Manipulation**: Easily add, remove, or modify Tailwind CSS utility classes within HTML tags.
- **Customizable Settings**: Configure the behavior of class completion and insertion according to your preferences.

## Installation

1. Open the Extensions view (`Ctrl+Shift+X`).
2. Search for `Tailwind Emmet`.
3. Click Install to install it.

Alternatively, you can install directly from the marketplace:

### Tailwind Class Generator (Complete Reference)
### Complete Property Reference

### Sizing
| Short | CSS Property | Tailwind Class Example |
|-------|--------------|------------------------|
| w     | width        | `w-[100px]`            |
| h     | height       | `h-[100px]`            |
| maw   | max-width    | `max-w-[100px]`        |
| miw   | min-width    | `min-w-[100px]`        |
| mah   | max-height   | `max-h-[100px]`        |
| mih   | min-height   | `min-h-[100px]`        |

### Positioning
| Short | CSS Property | Tailwind Class Example |
|-------|--------------|------------------------|
| t     | top          | `top-[10px]`           |
| r     | right        | `right-[10px]`         |
| b     | bottom       | `bottom-[10px]`        |
| l     | left         | `left-[10px]`          |

### Margin
| Short | CSS Property          | Tailwind Class Example |
|-------|-----------------------|------------------------|
| m     | margin                | `m-[10px]`             |
| mt    | margin-top            | `mt-[10px]`            |
| mr    | margin-right          | `mr-[10px]`            |
| mb    | margin-bottom         | `mb-[10px]`            |
| ml    | margin-left           | `ml-[10px]`            |
| mx    | margin-x (horizontal) | `mx-[10px]`            |
| my    | margin-y (vertical)   | `my-[10px]`            |

### Padding
| Short | CSS Property               | Tailwind Class Example |
|-------|----------------------------|------------------------|
| p     | padding                    | `p-[10px]`             |
| pt    | padding-top                | `pt-[10px]`            |
| pr    | padding-right              | `pr-[10px]`            |
| pb    | padding-bottom             | `pb-[10px]`            |
| pl    | padding-left               | `pl-[10px]`            |
| px    | padding-left padding-right | `px-[10px]`            |
| py    | padding-top padding-bottom | `py-[10px]`            |

### Typography
| Short | CSS Property | Tailwind Class Example |
|-------|--------------|------------------------|
| f     | font-size    | `text-[16px]`          |
| lh    | line-height  | `leading-[24px]`       |
| fw    | font-weight  | `font-[500]`           |
| ti    | text-indent  | `text-indent-[20px]`   |
| z     | z-index      | `z-[100]`              |
| ls    | letter-spacing | `tracking-[2px]`     |

### Layout
| Short | CSS Property | Tailwind Class Example |
|-------|---------------|------------------------|
| g     | gap           | `gap-[8px]`            |
| gx    | column-gap    | `gap-x-[8px]`          |
| gy    | row-gap       | `gap-y-[8px]`          |
| bdrs  | border-radius | `rounded-[4px]`        |
| br    | border-radius | `rounded-[4px]`        |

### Borders
| Short | CSS Property       | Tailwind Class Example       |
|-------|--------------------|------------------------------|
| bd    | border-width       | `border-[1px]`               |
| bdt   | border-top-width   | `border-t-[1px]`             |
| bdr   | border-right-width | `border-r-[1px]`             |
| bdb   | border-bottom-width| `border-b-[1px]`             |
| bdl   | border-left-width  | `border-l-[1px]`             |
| bdc   | border-color       | `border border-[#ff0000]`    |

### Colors
| Short | CSS Property       | Tailwind Class Example |
|-------|--------------------|------------------------|
| c     | color              | `text-[#ff0000]`       |
| bgc   | background-color   | `bg-[#00ff00]`         |
| oc    | outline-color      | `outline-[#0000ff]`    |
| op    | opacity            | `opacity-[60]`         |

### Transform
| Short | CSS Property            | Tailwind Class Example |
|-------|-------------------------|------------------------|
| tx    | translate-x             | `translate-x-[8px]`    |
| ty    | translate-y             | `translate-y-[8px]`    |
| rot   | rotate                  | `rotate-[45deg]`       |
| sc    | scale (percentage)      | `scale-[150%]`         |

### Keyword Utilities (no numeric value)
These abbreviations expand directly to common Tailwind utilities:

| Abbrev | Expands To        |
|--------|-------------------|
| fx     | `flex`            |
| fxc    | `flex-col`        |
| fxr    | `flex-row`        |
| jcc    | `justify-center`  |
| jcb    | `justify-between` |
| jce    | `justify-end`     |
| jcs    | `justify-start`   |
| aic    | `items-center`    |
| ais    | `items-start`     |
| aie    | `items-end`       |
| db     | `block`           |
| dib    | `inline-block`    |
| dn     | `hidden`          |
| posa   | `absolute`        |
| posr   | `relative`        |
| posf   | `fixed`           |
| poss   | `static`          |
| ovh    | `overflow-hidden` |
| ova    | `overflow-auto`   |
| ovx    | `overflow-x-auto` |
| ovy    | `overflow-y-auto` |

## Usage Notes
1. Color values should omit the `#` prefix (use `ff0000` not `#ff0000`)
2. Numeric values automatically get `px` units
3. Returns empty string for unsupported types
4. Suggestions are provided in class attributes. Type abbreviations like `w200`, `bgc#333`, or keywords like `fx`, then press Tab/Enter to accept.

## Example Usage
```
// w200 =>  w-[200px]
// bgc#333  bg-[#333]
// fx  => flex
// jcc => justify-center
```
