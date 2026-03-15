# Change Log

All notable changes to the "tailwind-emmet" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.0.6] - 2026-03-15
### Added
- 在 class 属性中提供缩写补全，支持 Tab/Enter 接受候选。
- 新增无参关键字映射：fx、fxc、fxr、jcc、jcb、jce、jcs、aic、ais、aie、db、dib、dn、posa、posr、posf、poss、ovh、ova、ovx、ovy。
- 新增可数值映射：ls(letter-spacing)、op(opacity)、tx/ty(translate)、rot(rotate)、sc(scale)、br(border-radius 别名)。
- README 同步更新规则表与示例。
- 新增打包与发布脚本：vsce:package、vsce:publish。

### Changed
- 修复 Tab 在 class/className 内无法触发的问题，改为在空白输入后自动转换或通过补全接受。
- 版本升级至 0.0.6。

## [0.0.5]
### Added
- 初始发布版本。
