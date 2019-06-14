
<a alt="测试版" href="#测试版"><span style="border-radius: 5px;background-color:#555;padding:5px 15px;color:#fff;  box-shadow:0px 0px 3px rgb(50, 50, 50);">Ver0.5</span></a>
<a href="http://lilpig.site" target="_blank"><span style="margin-left:5px;border-radius: 5px;background-color:#555;padding:5px 15px;color:#fff;box-shadow:0px 0px 3px rgb(50, 50, 50);">LILPIG的博客</span></a> 


# 快速开始
开始前请确保安装了如下环境：
```
node-v10.16.0-x64
Git-2.21.0-64-bit
python3.7
```
并确保如下命令可以运行：
```
node -v
npm -v
python --version
git --version
```

并且确保设置选项都填写完毕并且无误。

---

## 可视化Markdown编辑

![img](https://nsimg.cn-bj.ufileos.com/title.png)  图标用来设置标题的开关，如果该行是标题，则会取消该行的标题，否则将该行设置为标题。


![img](https://nsimg.cn-bj.ufileos.com/style.png)  图标用来设置或取消文字的样式，包括粗体、斜体、粗斜体、删除线、高亮等。

![img](https://nsimg.cn-bj.ufileos.com/imgs.png) 图标用来添加图片或链接。

![img](https://nsimg.cn-bj.ufileos.com/list.png) 图标用于将选中的多行或单行变成列表，如果选中的行已经是列表了，会取消列表设置。其中分为有序列表和无序列表。

![img](https://nsimg.cn-bj.ufileos.com/table.png) 图标用于生成表格。

![img](https://nsimg.cn-bj.ufileos.com/quote.png) 图标用于生成块。包含文字块、代码块和其他自定义样式等。

演示\(仅仅演示图片\)：

![图示](https://s2.ax1x.com/2019/06/12/VRKDte.gif)


---

## 关于换行
Markdown中的换行很特别，你直接打回车它是不会换行的，如果需要换行，需要打上两个空格再回车，就像这样\(□代表空格\)：
```
line1□□
line2
```
本插件提供了与大多数软件一致的快捷键，只需要按`shift+回车`，即可直接换行。

---

## 快捷键
可视化操作虽然对于不了解Markdown以及不想记一些语法的人很友好，但是用鼠标点的确是个愚蠢的方法，如果你稍微熟悉Markdown语法，我发誓你是不会用上面的图标的，因为它的时间成本都不如直接编写Markdown命令。

所以我提供了一些高级用法，它分为快捷键和自动完成两部分，快捷键只是把上面的图标绑定了几个快捷键，可以不用离开键盘使用上面的功能。

图标|快捷键
-|-
![img](https://nsimg.cn-bj.ufileos.com/title.png)|ctrl+shift+t
![img](https://nsimg.cn-bj.ufileos.com/style.png)|ctrl+shift+s
![img](https://nsimg.cn-bj.ufileos.com/imgs.png)|ctrl+shift+i
![img](https://nsimg.cn-bj.ufileos.com/list.png)|ctrl+shift+l
![img](https://nsimg.cn-bj.ufileos.com/table.png)|ctrl+t
![img](https://nsimg.cn-bj.ufileos.com/quote.png)|ctrl+shift+q

上面的快捷键是使用`ctrl+shift+对应功能首字母`，你也可以选择使用`ctrl+shift+对应图标位置`的组合键，如下：

图标|快捷键
-|-
![img](https://nsimg.cn-bj.ufileos.com/title.png)|ctrl+shift+1
![img](https://nsimg.cn-bj.ufileos.com/style.png)|ctrl+shift+2
![img](https://nsimg.cn-bj.ufileos.com/imgs.png)|ctrl+shift+3
![img](https://nsimg.cn-bj.ufileos.com/list.png)|ctrl+shift+4
![img](https://nsimg.cn-bj.ufileos.com/table.png)|ctrl+shift+5
![img](https://nsimg.cn-bj.ufileos.com/quote.png)|ctrl+shift+6

这个快捷键可能会替代掉VSCode其中的一些快捷键，这也是没办法的，有需要可以自己在keybindings中指定。

苹果用户的快捷键只需要把上面的ctrl替换成cmd即可。

### 其他快捷键
#### 表格对齐：
PS：暂未实现 因为好像没什么必要
功能|快捷键|何时生效
-|-|-
转换为左对齐表格|ctrl+t+l|光标处在表格对齐标志行时
转换为右对齐表格|ctrl+t+r|光标处在表格对齐标志行时
转换为居中对齐表格|ctrl+t+c|光标处在表格对齐标志行时


---

## 自动完成和Snippets
其实，对于某些简单的Markdown语法来说，快捷键的时间成本也不低，所以提供自动完成和Snippets功能。

自动完成是指当您输入一定的格式时编辑器会弹出供您选择的智能提示，大概是这样：

![演示](https://s2.ax1x.com/2019/06/14/V4EiKx.gif)

它提供如下语法：
```
样式相关：
    - token>b 将前面的单词转换成粗体
    - token>i 将前面的单词转换成斜体
    - token>bi 将前面的单词转换成粗斜体
    - token>d 将前面的单词转换成删除线格式
    - token>h 将前面的单词转换成高亮格式

    token就是单词，这并非英语单词，而是由空格分开的字符串。比如如下：
    I am a great guy
    会被分成5个单词，分割的依据是空格

列表相关：
    - number>ul 生成number个无序列表 如 5ul 生成5个无序列表
    - number>ol 生成number个有序列表 如 5ol 生成5个有序列表

表格相关：
    - m,n>lt 生成m*n的左对齐表格
    - m,n>ct 生成m*n的居中对齐表格
    - m,n>rt 生成m*n的右对齐表格
```
对于设计一款编程语言的自动完成提示来说，使用`.`作为触发提示的关键字是最明智的，之前本插件的自动完成也采用了`.`，但是后来发现在编写Markdown或做其他文字操作时，时常要在一行结束的最后一个位置加入`.`，也就是句号。但是这个时候，如果你输入`.`，智能提示就会弹出来，你需要按下esc让它取消才能换行。所以，对于本插件来说，使用`.`是不明智的，所以使用了位置和`.`相同的`>`，但是这也造成了问题，键盘上要同时按下`shift+.`才能触发`>`，操作成本可能有高。

对于中文输入，自动完成可能有如下问题：

1. 输入`>`符号需要切换到英文输入法
2. 中文单词中间不用空格分开，所以使用自动完成中的样式功能时需要在前面加空格并且手动删除

针对这些问题，插件做出了如下解决办法：

1. 输入`》`符号也会激活自动完成，也就是中文状态下的`>`
2. 提供一系列带`no-space`的提示，会自动删除前面的空格\(只有当前面有空格时会弹出\)


自动完成在有些时候还是不够好用，无论什么时候都要加`>`，好像OOP编程一样，对于简单的功能，比如修改前面单词的样式，如果不用自动完成，直接输入Markdown语法，操作成本几乎是一样的，这样一看，这个功能反倒有点弄巧成拙，所以提供Snippets：
```
样式相关：
    - b 插入粗体字
    - i 插入斜体字
    - bi 插入粗斜体字
    - d 插入删除线
    - h 插入高亮块

图片和链接：
    - img 插入一个空图片
    - a 插入一个空连接

块：
    - code 插入代码块
        * text/plain
    - java 插入java代码块
    - js 插入javascript代码块
    - ts 插入typescript代码块
    - c 插入c代码块
    - cp 插入c++代码块
    - py 插入python代码块
    - sql 插入sql代码块
    - php 插入php代码块
    - go 插入go代码块

Hexo头：
    - !h 插入hexo博文的头部信息
```

## 备份和上传
自动备份和上传功能还不完善，因为不想把这两个功能定在编辑器里，在Linux上通过了测试，Windows上还没有测试。而且没有做很严格的hexo项目判断，在很多情况下可能会误判。

在一个Markdown文件中右键会弹出两个选项，直接选择即可。

---
## 自动完成和Snippets不显示
加入如下设置
```json
"[markdown]":  {
    "editor.quickSuggestions": true
}
```

## 关于图片
上传图片时您可以选择压缩比，因为JPEG格式的图片压缩效果较好，所以所有的图片在压缩时都会转换为JPEG格式的图片。

只建议用图片上传工具传jpg或png的图片，其他格式请自行上传，并且图片本身就不大时无需压缩。

GIF图像或者压缩都无法拯救的大图建议丢到路过图床。

PS：由于JPEG图像不支持ALPHA通道，所以当PNG中有透明部分时会失效。

图片的备份是自动备份到本地文件夹中，然后可以自行上传到各大云平台上。

## 图片上传
插件提供UCloud图片上传服务，可以接入Ufile对象存储，您需要在设置中填写好桶名、域名、公钥和私钥即可使用。

## 关于高级样式
高级样式会生成很多代码，这些代码本可以也本想要在JavaScript动态生成的，但是我发现这个主题的JavaScript全局只执行一次，也就是说如果你是直接访问的文章页面，高级样式能动态生成并应用，而如果你是从别的页面跳转过来的就不行了，我不知道是因为什么，他用ejs写的东西我也看不懂。所以暂时先这样用着。

这个问题等待以后修复。

如果希望高级样式在VSCode里显示，请在设置文件里添加如下代码：
```json
"markdown.styles": [
    "https://nsimg.cn-bj.ufileos.com/style.css"
]
```
---

## 关于修改
因为这个插件完全没有经过个人使用测试，不知道有些设定是否符合使用习惯，不符合请联系修改。

该插件暂时不放到VSCode插件市场，但是会放到github上开源，所以可以在项目的issues上说明问题。

## 图标引用
* title.png https://www.iconfont.cn/user/detail?spm=a313x.7781069.0.d214f71f6&uid=125286
* 样式.png https://www.iconfont.cn/user/detail?spm=a313x.7781069.0.d214f71f6&uid=899371
* 列表.png https://www.iconfont.cn/user/detail?spm=a313x.7781069.0.d214f71f6&uid=497873
* 表格.png https://www.iconfont.cn/user/detail?spm=a313x.7781069.1998910419.d9bd4f23f&uid=97639
* quote.png https://www.iconfont.cn/user/detail?spm=a313x.7781069.0.d214f71f6&uid=258363
* imgs.png https://www.iconfont.cn/user/detail?spm=a313x.7781069.0.d214f71f6&uid=5659880

---

## 参考文档
* [vscode issues](https://github.com/Microsoft/vscode/issues/5886)