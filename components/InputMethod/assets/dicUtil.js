import { dict } from './dic.js'

let SimpleInputMethod = {
    dict: {
        py2hz: null // 用来存放原始的拼音到汉字的映射
    },
    hanziCache: {}, // 加个缓存，查过的拼音就不用老是重新算了，对性能应该有点用处 (^_−)☆

    // 初始化词典，这个函数会在模块加载的时候自动跑一次
    initDict: function() {
        this.dict.py2hz = dict; // 把导入的词典赋给 py2hz
        this.hanziCache = {}; // 确保每次初始化（虽然一般只有一次）都清空缓存
        // 之前这里有个 py2hz2 的逻辑，感觉有点复杂还容易出问题，先简化掉，直接用 py2hz 就好
        // 那个 'i' 的特殊处理也去掉了，如果 'i' 真要对应什么汉字，应该在 dic.js 里定义好
        // console.log("简易输入法词典初始化完毕！");
    },

    // 根据一个完整的拼音（比如 "ni", "hao", "zhang"）获取对应的汉字字符串
    // 这个函数现在变得很简单了，就是直接查表
    getSingleHanzi: function(pinyin){
        if (!this.dict.py2hz) {
            // console.warn("词典还没初始化呢，怎么查啊？"); // 温馨提示：理论上不该发生
            return '';
        }
        return this.dict.py2hz[pinyin] || ''; // 找到了就返回汉字串，找不到就返回空字符串
    },

    // 这是获取汉字候选的核心函数，处理连续输入的拼音（比如 "nihao"）
    // 它会尝试从输入串的开头匹配最长的合法拼音
    getHanzi: function(pinyin) {
        // 先做点基本检查，免得传进来些奇奇怪怪的东西
        if (typeof pinyin !== 'string' || pinyin === '') {
            return [[], '']; // 空的或者不是字符串，直接打回
        }

        // 查缓存！如果这个拼音串之前查过，直接用缓存结果，美滋滋 O(∩_∩)O
        if (this.hanziCache.hasOwnProperty(pinyin)) {
            // console.log("缓存命中:", pinyin); // 调试时可以打开看看缓存效果
            return this.hanziCache[pinyin];
        }

        // 尝试把整个输入串作为一个完整拼音来查
        let hanzisForFullPinyin = this.getSingleHanzi(pinyin);
        if (hanzisForFullPinyin) {
            // 哎哟，整个串就是一个合法的拼音，比如 "shang"
            const result = [hanzisForFullPinyin.split(''), pinyin];
            this.hanziCache[pinyin] = result; // 存入缓存
            return result;
        }

        // 如果整个串不是一个完整拼音 (比如 "women" 中的 "women")，那就要尝试从头开始找能匹配上的最长拼音了
        // 比如输入 "women"，我们希望能先匹配到 "wo"
        // 一般拼音最长也就6个字母吧？（像 "zhuang", "shuang" 这种）定个上限，免得白费劲
        let maxSyllableLen = 6;
        let searchStartLen = Math.min(pinyin.length, maxSyllableLen);

        for (let i = searchStartLen; i >= 1; i--) {
            let prefix = pinyin.substr(0, i); // 从长到短尝试截取前缀
            let hanzisForPrefix = this.getSingleHanzi(prefix);
            if (hanzisForPrefix) {
                // 找到了！这个前缀是个合法的拼音
                // 比如 "women" 里的 "wo"，或者 "nihao" 里的 "ni"
                const result = [hanzisForPrefix.split(''), prefix];
                this.hanziCache[pinyin] = result; // 把原始输入和找到的匹配结果存缓存
                return result;
            }
        }

        // 如果循环完了还啥也没找到，说明这个拼音串开头部分不是任何已知拼音
        // 比如用户打了 "xg"，这玩意儿开头不是拼音啊
        // console.log("未能从 '" + pinyin + "' 中匹配到任何拼音前缀"); // 这种情况理论上比较少，除非用户乱按
        this.hanziCache[pinyin] = [[], '']; // 同样缓存这个“未找到”的结果
        return [[], ''];
    }
};

// 模块加载时，自动初始化词典，确保 SimpleInputMethod.dict.py2hz 有值
SimpleInputMethod.initDict();

export { SimpleInputMethod } // 保持原来的导出方式，那边import才能正确拿到
//换成 `export default SimpleInputMethod;` 不能用
