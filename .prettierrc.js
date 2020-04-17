const fabric = require('@umijs/fabric');

module.exports = {
  printWidth: 120, // 每行代码不超过120个字符长度
  semi: false, // 在语句末尾打印分号。
  singleQuote: true, // 单引号
  trailingComma: 'all', // 尾随逗号
  bracketSpacing: false, // 在对象的括号之间需要括号分割
  jsxBracketSameLine: false, // 将>多行JSX元素的放在最后一行的末尾，而不是一个人放在下一行
  arrowParens: 'avoid', // 箭头函数参数周围是否需要使用括号包裹，avoid 尽可能不用括号包裹
  tabWidth: 2, // 指定每个缩进级别的空格数。
  useTabs: false, // 使用制表符而不是空格缩进行
  endOfLine: "auto", // 解决跨平台下代码行结束不一致的问题
  ...fabric.prettier,
};
