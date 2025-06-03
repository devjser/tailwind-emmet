import * as vscode from "vscode";


let outputChannel: vscode.OutputChannel;

function getTailwindClass(type: string, value: string): string {
  switch (type) {
    // size
    case "size":
      return `size-[${value}px]`;
    case "w":
      return `w-[${value}px]`;
    case "h":
      return `h-[${value}px]`;
    case "maw":
      return `max-w-[${value}px]`;
    case "miw":
      return `min-w-[${value}px]`;
    case "mah":
      return `max-h-[${value}px]`;
    case "mih":
      return `min-h-[${value}px]`;

    // position
    case "t":
      return `top-[${value}px]`;
    case "r":
      return `right-[${value}px]`;
    case "b":
      return `bottom-[${value}px]`;
    case "l":
      return `left-[${value}px]`;
    // margin
    case "m":
      return `m-[${value}px]`;    
    case "mt": 
      return `mt-[${value}px]`;   
    case "mr": 
      return `mr-[${value}px]`;   
    case "mb": 
      return `mb-[${value}px]`;   
    case "ml": 
      return `ml-[${value}px]`;   
    case "mx": 
      return `mx-[${value}px]`;   
    case "my": 
      return `my-[${value}px]`;   
    // padding
    case "p":
      return `p-[${value}px]`;  
    case "pt":
      return `pt-[${value}px]`; 
    case "pr":
      return `pr-[${value}px]`; 
    case "pb":
      return `pb-[${value}px]`; 
    case "pl":
      return `pl-[${value}px]`; 
    case "px":
      return `px-[${value}px]`; 
    case "py":
      return `py-[${value}px]`;

    // font
    case "f":
      return `text-[${value}px]`;
    case "lh":
      return `leading-[${value}px]`;
    case "fw":
      return `font-[${value}]`;
    case "z":
      return `z-[${value}]`;
    case "ti":
    case "indent":
      return `text-indent-[${value}px]`;
    
    // gap
    case "g":
      return `gap-[${value}px]`;
    case "gx":
      return `gap-x-[${value}px]`;
    case "gy":
      return `gap-y-[${value}px]`; 

    // border
    case "bdrs":
      return `rounded-[${value}px]`;
    case "bdc":
      return `border border-solid border-[${value}]`; 
    case "bd":
      return `border-solid border-[${value}px]`; 
    case "bdw":
      return `border-solid border-[${value}px]`; 
    case "bdt":
      return `border-solid border-t-[${value}px]`; 
    case "bdr":
      return `border-solid border-r-[${value}px]`;
    case "bdb":
      return `border-solid border-b-[${value}px]`; 
    case "bdl":
      return `border-solid border-l-[${value}px]`;
    // colors
    case "c":
      return `text-[#${value}]`;
    case "bgc":
      return `bg-[#${value}]`;
    case "oc":
      return `outline-[#${value}]`;
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
      const match = word.match(/^([a-z]+)([-0-9]+|#[a-z0-9]{3,6})$/i);
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


const MATCH_REG = /^([a-z]+)(\d+|#[a-z0-9]{3,6})$/i;

export function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel("tailwind-emmet");
  outputChannel.appendLine("tailwind-emmet inited");
  // outputChannel.show();
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
    if (matchClass && /(\s|\t){2}/.test(change.text)) {
      lastVersion = version;

      // 获取刚刚输入的字符的位置（最后一个被插入的字符）
      const insertedPosition = change.range.start;

      // 获取刚刚插入的字符前的一个区域（假设是单词 + 空格）
      const wordRange = document.getWordRangeAtPosition(insertedPosition);

      if (wordRange) {
        const word = document.getText(wordRange);

        const match = word.match(MATCH_REG);

        if (match) {
          const [, type, value] = match;
          const tailwindClass = getTailwindClass(type, value);
          outputChannel.appendLine('tailwind result '+ tailwindClass);
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
