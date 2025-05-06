import * as vscode from "vscode";
let outputChannel: vscode.OutputChannel;
function getTailwindClass(type: string, value: string): string {
  switch (type) {
    case "w":
      return `w-[${value}px]`; // 生成 w-[20px]
    case "h":
      return `h-[${value}px]`; // 生成 h-[20px]
    case "maw":
      return `max-w-[${value}px]`; // 生成 max-w-[20px]
    case "miw":
      return `min-w-[${value}px]`; // 生成 min-w-[20px]
    case "mah":
      return `max-h-[${value}px]`; // 生成 max-h-[20px]
    case "mih":
      return `min-h-[${value}px]`; // 生成 min-h-[20px]

    case "t":
      return `top-[${value}px]`; // 生成 top-[20px]
    case "r":
      return `right-[${value}px]`; // 生成 right-[20px]
    case "b":
      return `bottom-[${value}px]`; // 生成 bottom-[20px]
    case "l":
      return `left-[${value}px]`; // 生成 left-[20px]

    case "m":
      return `m-[${value}px]`; // 生成 m-[20px]
    case "mt":
      return `mt-[${value}px]`; // 生成 mt-[20px]
    case "mr":
      return `mr-[${value}px]`; // 生成 mr-[20px]
    case "mb":
      return `mb-[${value}px]`; // 生成 mb-[20px]
    case "ml":
      return `ml-[${value}px]`; // 生成 ml-[20px]
    case "mx":
      return `mx-[${value}px]`; // 生成 mx-[20px]
    case "my":
      return `my-[${value}px]`; // 生成 my-[20px]

    case "p":
      return `p-[${value}px]`; // 生成 p-[20px]
    case "pt":
      return `pt-[${value}px]`; // 生成 pt-[20px]
    case "pr":
      return `pr-[${value}px]`; // 生成 pr-[20px]
    case "pb":
      return `pb-[${value}px]`; // 生成 pb-[20px]
    case "pl":
      return `pl-[${value}px]`; // 生成 pl-[20px]
    case "px":
      return `px-[${value}px]`; // 生成 px-[20px]
    case "py":
      return `py-[${value}px]`; // 生成 py-[20px]

    case "f":
      return `text-[${value}px]`; // 生成 text-[20px]
    case "lh":
      return `leading-[${value}px]`; // 生成 leading-[20px]
    case "fw":
      return `font-[${value}]`; // 生成 font-[500]
    case "z":
      return `z-[${value}]`; // 生成 z-[20px]
    case "indent":
      return `text-indent-[${value}px]`; // 生成 text-indent-[20px]
    case "ti":
      return `line-height-[${value}px]`; // 生成 line-height-[20px]

    case "g":
      return `gap-[${value}px]`; // 生成 gap-[20px]
    case "gx":
      return `gap-x-[${value}px]`; // 生成 gap-x-[20px]
    case "gy":
      return `gap-y-[${value}px]`; // 生成 gap-y-[20px]

    case "bdrs":
      return `rounded-[${value}px]`; // 生成 rounded-[20px]
    case "bd":
      return `border border-solid border-[${value}px]`; // 生成 border border-solid border-[20px]
    case "bdw":
      return `border border-solid border-[${value}px]`; // 生成 border border-solid border-[20px]
    case "bdt":
      return `border border-solid border-t-[${value}px]`; // 生成 border border-solid border-t-[20px]
    case "bdr":
      return `border border-solid border-r-[${value}px]`; // 生成 border border-solid border-r-[20px]
    case "bdb":
      return `border border-solid border-b-[${value}px]`; // 生成 border border-solid border-b-[20px]
    case "bdl":
      return `border border-solid border-l-[${value}px]`; // 生成 border border-solid border-b-[20px]
    default:
      return "";
  }
}
function getRegex(): RegExp {
  const tailwindConfig = vscode.workspace.getConfiguration("tailwindCSS");
  // 获取 classAttributes 的值
  const classAttributes = tailwindConfig.get<string[]>("classAttributes") || [];
  const classStr = classAttributes
    .map((name: string) => `${name}|[${name}]`)
    .join("|");
  const re = new RegExp(`(?:\\s|:|\\()(${classStr})\\s*=\\s*['"\`{]`, "gi");

  return re;
}
async function insertCodeOnTab(editor: vscode.TextEditor, classRegex: RegExp) {
  const document = editor.document;
  const selection = editor.selection;
  const line = editor.document.lineAt(selection.start.line).text;
  // 检查是否在 className= 后面
  const matchClass = line.match(classRegex);

  if (matchClass) {
    // 获取当前光标位置的单词
    const wordRange = document.getWordRangeAtPosition(selection.active);
    const word = document.getText(wordRange);

    if (word) {
      const match = word.match(/^([a-z]+)(\d+)$/);

      if (match) {
        const [, type, value] = match;
        const tailwindClass = getTailwindClass(type, value);
        if (tailwindClass) {
          // 替换文本
          await editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editBuilder.replace(wordRange as vscode.Range, tailwindClass);
          });
          return;
        }
      }
    }
  }
  // await vscode.commands.executeCommand('default:tab');
}
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: number = 0;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay) as unknown as number;
  };
}
const insertCodeOnTabDebounced = debounce((editor: vscode.TextEditor, classRegex: RegExp) => {
  insertCodeOnTab(editor, classRegex);
}, 500);


export function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel("tailwind-emmet");
  outputChannel.appendLine("tailwind-emmet inited");
  const classRegex = getRegex();

  let lastVersion = 0;
  vscode.workspace.onDidChangeTextDocument(async (event) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || event.document !== editor.document || event.contentChanges.length === 0) {
      return;
    }

    const document = event.document;
    const version = document.version;

    // 忽略版本回退的情况
    if (version <= lastVersion) {
      return;
    }

    const change = event.contentChanges[0];
    const selection = editor.selection;
    const line = editor.document.lineAt(selection.start.line).text;
    // 检查是否在 className= 后面
    const matchClass = line.match(classRegex);
    if (matchClass && /\s|\t/.test(change.text)) {
      lastVersion = version;

      // 获取刚刚输入的字符的位置（最后一个被插入的字符）
      const insertedPosition = change.range.start;

      // 获取刚刚插入的字符前的一个区域（假设是单词 + 空格）
      const wordRange = document.getWordRangeAtPosition(insertedPosition);

      if (wordRange) {
        const word = document.getText(wordRange);

        const match = word.match(/^([a-z]+)(\d+)$/);

        if (match) {
          const [, type, value] = match;
          const tailwindClass = getTailwindClass(type, value);
          if (tailwindClass) {
            // 替换整个词 + 刚刚输入的空格/Tab
            const fullRange = new vscode.Range(
              wordRange.start,
              change.range.end
            );

            await editor.edit((editBuilder: vscode.TextEditorEdit) => {
              editBuilder.replace(fullRange, tailwindClass + ' ');
            });

            // 可选：重新设置光标到插入之后的位置
            const newPosition = new vscode.Position(
              selection.active.line,
              wordRange.start.character + tailwindClass.length + 1
            );
            editor.selection = new vscode.Selection(newPosition, newPosition);
          }
        }
      }
    }

  });
}

export function deactivate() { }
