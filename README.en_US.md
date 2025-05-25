![Preview](/preview.png)

# better-Vela-IME (Refactored Vela Input Method)

> [!NOTE]
> This project is a refactored and optimized version of [NEORUAA/Vela_input_method](https://github.com/NEORUAA/Vela_input_method), aiming to improve performance, add features, and fix known issues.

---

[简体中文](/README.md) • English (US) • [日本語](/README.ja.md)

---

## 🤔 Why Refactor?

While the original `Vela_input_method` provided basic input method functionality, there was room for improvement, especially for users seeking maximum efficiency and stability:

*   **Performance Bottlenecks:** In certain situations, particularly with rapid typing or a large number of candidates, users might experience noticeable latency, affecting typing fluency.
*   **Missing Features:** Lack of support for "continuous pinyin" (Lianpin) input, which for users accustomed to it, requires frequent manual selection or breaking of pinyin, reducing input efficiency.
*   **Stability Issues:** In some specific operations or unexpected situations, the input method could lag or become unresponsive, impacting user experience.

---

## 🔧 What I Changed

Based on the considerations above, I have comprehensively refactored and optimized `Vela_input_method`. The core goal is to provide a faster, smarter, and more stable input experience.

### ✨ Superior Performance Boost

*   **Vastly Improved Performance:** By optimizing core algorithms, enhancing candidate matching logic, and improving resource management, key response latency and candidate loading times have been significantly reduced. Users will experience smoother and more immediate feedback, whether for daily typing or rapid input.

### ⌨️ Smarter Input Support

*   **Added Continuous Pinyin (Lianpin) Support:** Implemented support for "continuous pinyin." Users can now type complete pinyin strings (e.g., `nihaoma`) continuously, and the system will intelligently segment them and display corresponding candidates, greatly enhancing the input efficiency for long sentences or common phrases.

### 🧱 Enhanced Program Robustness

*   **Fixed Freezing/Lagging Issues in Unexpected Situations:** Addressed scenarios that could cause lag or unresponsiveness in the original version (such as specific input sequences or resource contention) through in-depth analysis and fixes. By improving state management and error handling mechanisms, the stability of the input method under various complex usage scenarios has been enhanced.

---

## Manual Installation

### Download Project Code

```bash
$ git clone https://github.com/fywmjj/better-Vela-IME.git
```

### Copy Code
Copy the `components` folder from the project to the `src` directory of the project where you want to use the component. Then you can use this component according to the usage method of custom components.

---

## Component Name
`input-method`

## Overview
Input method functionality.

## Sub-components
Not supported.

## Properties
| Name | Type | Default | Required | Description |
| --------  | :----:  | :----:  | :----:  | :---- |
| hide | boolean | true | Yes | Whether to display the keyboard (developers can hide or show the keyboard by toggling this property). |
| keyboardtype | string | "QWERTY" | No | Keyboard layout. "QWERTY" for full keyboard, "T9" for T9 layout. Defaults to "QWERTY". (Only full keyboard is available when `screentype` is not "circle"). |
| maxlength | number | 5 | No | Default number of pinyin candidates to display. Effective when `maxlength` > 0. Click to expand and view all candidates. |
| vibratemode | string | "" | No | Vibration mode. "" for no vibration on input, "long" for long vibration, "short" for short vibration. Defaults to "". |
| screentype | string | "circle" | No | Device screen type. "rect" for rectangular screen layout (corresponds to designWidth ≥ 336), "circle" for circular screen layout (corresponds to designWidth of 480), "pill-shaped" for pill-shaped screen layout (corresponds to designWidth of 192). |

## Events
| Name | Parameters | Description |
| --------  | :-----  | :---- |
| complete | { detail: { content: string } } | Triggered when the keyboard outputs a character (for Chinese input, triggered when a character corresponding to pinyin is selected; for English input, triggered under the same conditions as `keyDown`). |
| delete | - | Triggered when the delete button on the keyboard is clicked. |
| keyDown | { detail: { content: string } } | Triggered when a keyboard button is pressed. |
| visibilityChange | { detail: { visible: boolean } } | Triggered when the keyboard is shown or hidden. `visible` indicates the display state. |

## Example Code
```html
<import name="input-method" src="../../components/InputMethod/InputMethod.ux"></import>
<template>
  <div class="page" style="flex-direction: column;">
    <text class="text" @click="changeState">
      {{textValue}}_
    </text>
    <input-method
      hide="{{hide}}"
      keyboardtype="{{keyboardtype}}"
      maxlength="5"
      vibratemode="{{vibratemode}}"
      screentype="{{screentype}}"
      @visibility-change="onVisibilityChange"
      @key-down="onKeyDown"
      @delete="onDelete"
      @complete="onComplete"
    ></input-method>
  </div>
</template>

<script>
export default {
  private: {
    textValue: "",
    hide: false,
    keyboardtype: "QWERTY", //QWERTY, T9
    vibratemode: "short",
    screentype: "circle", //pill-shaped, rect, circle
  },
  onVisibilityChange(evt) {
    console.log("Visibility changed:"+JSON.stringify(evt));
  },
  onKeyDown(evt) {
    // this.textValue += evt.detail.content;
    console.log("Key down:"+JSON.stringify(evt));
  },
  onDelete() {
    this.textValue = this.textValue.slice(0, -1);
    console.log("Character deleted");
  },
  changeState() {
    this.hide = !this.hide;
  },
  onComplete(evt) {
    this.textValue += evt.detail.content;
    console.log("Character returned:"+JSON.stringify(evt));
  },
};

</script>

<style>
.page{
  width:480px;
  height:480px;
}

.text{
  position:absolute;
  left:0;
  top:60px;
  width:100%;
  height:80px;
  text-align:center;
  color:white;
  background-color: red;
}
</style>
```

## Disclaimer

*   This project is an unofficial, refactored, and optimized version of `NEORUAA/Vela_input_method`, intended for learning and technical research.
*   This program is completely free, and its source code is available under an open-source license. It is prohibited for any commercial use.
*   The developer assumes no responsibility for any issues that may arise from the use of this program.

## Acknowledgements

*   Thanks to **@NEORUAA** for creating the original version of `Vela_input_method`, which provided a solid foundation for this project.
