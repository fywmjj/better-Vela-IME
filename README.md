
![预览图](/preview.png)

# better-Vela-IME (Vela 输入法重构版)

> [!NOTE]
> 本项目是 [NEORUAA/Vela_input_method](https://github.com/NEORUAA/Vela_input_method) 的一个重构和优化版本，旨在提升性能、增加功能并修复已知问题。

---

简体中文 • [English (US)](/README.en_US.md) • [日本語](/README.ja.md)

---

## 🤔 为什么要进行重构？

原版 `Vela_input_method` 虽然提供了基础的输入法功能，但在实际使用中，尤其是在追求极致效率和稳定性的场景下，仍存在一些可以改进之处：

*   **性能瓶颈:** 在某些情况下，尤其是在快速输入或候选词较多时，可能会感受到一定的延迟，影响输入流畅性。
*   **功能缺失:** 缺乏对“连拼”输入的支持，对于习惯连拼的用户来说，需要频繁手动选择或断开拼音，降低了输入效率。
*   **稳定性问题:** 在一些特定操作或意外情况下，输入法可能出现卡顿或无响应，影响用户体验。

---

## 🔧 我所做的更改

基于以上考虑，我对 `Vela_input_method` 进行了全面的重构和优化，核心目标是提供一个更快速、更智能、更稳定的输入体验。

### ✨ 卓越的性能提升

*   **大幅提升性能:** 通过优化核心算法、改进候选词匹配逻辑和资源管理，显著减少了按键响应延迟和候选词加载时间。无论是日常打字还是快速输入，都能感受到更为流畅和即时的反馈。

### ⌨️ 更智能的输入支持

*   **支持连拼输入:** 新增了对“连拼”功能的支持。用户现在可以连续输入完整的拼音字符串（例如 `nihaoma`），系统会自动进行智能分词并展示对应的候选词，大幅提升了长句或常用词组的输入效率。

### 🧱 更强大的程序健壮性

*   **修复了意外情况下的卡顿问题:** 针对原版中可能导致卡顿或无响应的场景（如特定输入序列、资源竞争等）进行了深入分析和修复。通过改进状态管理和错误处理机制，增强了输入法在各种复杂使用场景下的稳定性。

---

## 手动安装

### 下载项目代码

```bash
$ git clone https://github.com/fywmjj/better-Vela-IME.git
```

### 拷贝代码
把项目中的 `components` 文件夹拷贝到要使用组件的项目 `src` 目录下。然后就可以按照自定义组件的使用方式来使用本组件了。

---

## 组件名称
`input-method`

## 概述
输⼊法功能

## ⼦组件
不⽀持

## 属性
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --------  | :----:  | :----:  | :----:  | :---- |
| hide | boolean | true | 是 | 是否显⽰键盘（开发者可以通过切换属性值隐藏或者唤醒键盘） |
| keyboardtype | string | "QWERTY" | 否 | 键盘布局，"QWERTY" 表⽰全键，"T9" 表⽰九键。默认为 "QWERTY"（ 当 screentype 非 "circle" 时，仅全键盘可用） |
| maxlength | number | 5 | 否 | 默认展⽰的拼⾳候选词数量， maxlength > 0 时有效；点击展开查看所有候选词 |
| vibratemode | string | "" | 否 | 振动模式，""表⽰输⼊时不振动，"long" 表⽰⻓振动，"short" 表⽰短振动。默认为 "" |
| screentype | string | "circle" | 否 | 设备屏幕类型，"rect" 表示方形屏布局（对应 designWidth ≥ 336），"circle" 表示圆形屏布局（对应 designWidth 为 480），"pill-shaped" 表示胶囊形屏布局（对应 designWidth 为 192） |

## 事件
| 名称 | 参数 | 描述 |
| --------  | :-----  | :---- |
| complete | { detail: { content: string } } | 键盘输出字符时触发（当切换为中⽂输⼊法时候，当选中拼⾳对 应⽂字时触发；当切换为英⽂输⼊法时，与 keyDown 触发条件⼀致）|
| delete | - | 键盘点击删除按钮触发 |
| keyDown | { detail: { content: string } } | 键盘按钮按下时触发 |
| visibilityChange | { detail: { visible: boolean } } | 键盘显示或隐藏时触发，visible 表⽰显示状态 |

## ⽰例代码
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
    console.log("显示状态变更:"+JSON.stringify(evt));
  },
  onKeyDown(evt) {
    // this.textValue += evt.detail.content;
    console.log("按下按键:"+JSON.stringify(evt));
  },
  onDelete() {
    this.textValue = this.textValue.slice(0, -1);
    console.log("删除字符");
  },
  changeState() {
    this.hide = !this.hide;
  },
  onComplete(evt) {
    this.textValue += evt.detail.content;
    console.log("返回字符:"+JSON.stringify(evt));
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

## 免责声明

*   本项目是基于 `NEORUAA/Vela_input_method` 的非官方重构和优化版本，旨在学习和技术研究。
*   本程序完全免费，源代码根据开源许可开放，禁止用于任何商业目的。
*   对于使用本程序可能产生的任何问题，开发者不承担任何责任。

## 鸣谢

*   感谢 **@NEORUAA** 创建了 `Vela_input_method` 的原始版本，为本项目提供了坚实的基础。
