# Rust 之构建 wasm

## 前言

在现代 Web 开发中，WebAssembly (WASM) 已成为一种强大的工具。它使得开发者可以在浏览器中运行高性能的代码，跨越传统的 JavaScript 性能限制。
Rust 语言因其高效性和内存安全性，成为了编写 WASM 模块的热门选择。本文将介绍如何将 Rust 代码编译为 WebAssembly，并在 Web 项目中使用。

## 创建一个项目

首先，我们需要创建一个新的 Rust 项目。由于我们要生成一个可以被其它语言或工具调用的模块，因此选择创建一个库项目，而不是可执行程序。使用 `cargo` 命令可以轻松完成：

```bash
cargo new lib_wasm --lib
```

这个命令会生成一个名为 `lib_wasm` 的项目，其中包含一个基础的 `Cargo.toml` 配置文件和一个 `src/lib.rs` 文件，你将在其中编写你的 Rust 代码。

## 添加 `wasm-bindgen` 依赖项

在 Rust 中，`wasm-bindgen` 是一个关键工具，它使 Rust 和 JavaScript 之间的交互变得更加简单。
`wasm-bindgen` 负责生成与 JavaScript 交互所需的绑定代码，让你能够直接调用 Rust 编写的函数。

要添加 `wasm-bindgen`，可以使用以下两种方法：

::: code-group

```bash [使用 cargo]
cargo add wasm-bindgen
```

```toml [手动添加]
[dependencies]
wasm-bindgen = "0.2"

```

:::

添加 `wasm-bindgen` 后，Rust 编译器会在编译过程中生成必要的绑定文件，从而使你的 WASM 模块可以被 JavaScript 直接调用。

## 安装 `wasm32-unknown-unknown` 目标

Rust 编译器默认会生成适用于本地机器架构的可执行文件。要编译成适用于 Web 的 WebAssembly 文件，我们需要添加一个特定的目标架构，即 `wasm32-unknown-unknown`。
这是一个通用的 WASM 目标，不依赖任何特定的操作系统。

使用以下命令安装该目标：

```bash
rustup target add wasm32-unknown-unknown
```

此命令会配置你的 Rust 工具链，使其能够生成适用于 WebAssembly 的二进制文件。

## 编写代码

现在，你可以在 `src/lib.rs` 文件中编写你希望导出的功能。例如，我们可以编写一个简单的函数，它接受一个名字作为参数并返回一个问候语：

:::code-group

```rs [src/lib.rs]
use wasm_bindgen::prelude::*;

// 将此函数导出到 JavaScript
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

```

:::

在这段代码中，我们使用了 `#[wasm_bindgen]` 宏将 `greet` 函数导出，使其可以从 JavaScript 中调用。

## 编译 Rust 项目为 WASM

编写完代码后，我们可以将其编译为 WASM 文件。编译时指定目标为 `wasm32-unknown-unknown`，并使用 `--release` 选项生成优化后的构建：

```bash
cargo build --target wasm32-unknown-unknown --release
```

编译完成后，生成的 `.wasm` 文件将存储在 `target/wasm32-unknown-unknown/release/` 目录下。

## 使用 wasm-bindgen 生成 JavaScript 绑定代码

虽然编译生成了 `.wasm` 文件，但直接在 JavaScript 中使用它并不方便。为此，我们需要使用 `wasm-bindgen` 工具生成相应的 JavaScript 绑定代码。
这将创建一个便于在 JavaScript 中调用的模块。

首先，确保已安装 `wasm-bindgen-cli` 工具。你可以通过以下命令安装：

```bash
cargo install wasm-bindgen-cli
```

然后，运行以下命令生成 JavaScript 绑定文件：

```bash
wasm-bindgen --out-dir ./out --target web target/wasm32-unknown-unknown/release/lib_wasm.wasm
```

:::warning
命令中的 `lib_wasm.wasm` 和我们的项目名称保持一致<br>
这是一步可选操作
:::

## 在网页中使用 WASM

现在，生成的 WASM 模块已经可以在 Web 项目中使用。你只需在 HTML 文件中导入生成的 JavaScript 绑定文件，并调用 Rust 导出的函数。例如：

:::code-group

```html [index.html]
<!DOCTYPE html>
<html>
    <head>
        <title>Lib WASM</title>
    </head>
    <body>
        <script type="module">
            // 这个示例会在控制台打印出 "Hello, World!"。
            // 其中，`init` 函数用于初始化 WASM 模块，而 `greet` 函数则调用了我们在 Rust 中定义的函数。
            import init, { greet } from "./out/lib_wasm.js";
            init().then(() => {
                console.log(greet("World"));
            });
        </script>
    </body>
</html>
```

```bash [目录结构]
# `out` 目录中包含了生成的 WASM 文件以及相应的 JavaScript 绑定文件
# `index.html` 是一个简单的网页，用于测试和展示你的 WASM 模块。
- index.html
- out/
    - lib_wasm_bg.wasm
    - lib_wasm_bg.wasm.d.ts
    - lib_wasm.d.ts
    - lib_wasm.js
```

:::

## 结语

通过这套流程，你可以轻松地将 Rust 代码编译为 WebAssembly，并将其集成到 Web 项目中。Rust 的高效性和 WebAssembly 的灵活性相结合，可以为 Web 应用带来显著的性能提升。
