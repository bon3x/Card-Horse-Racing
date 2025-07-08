# 纸牌赛马游戏

一个基于HTML、CSS和JavaScript的纸牌赛马游戏，玩家通过抽取纸牌来控制不同花色的马匹前进，最先到达终点的花色获胜。

## 游戏规则
- 四种花色（红桃、方块、梅花、黑桃）各代表一匹马
- 赛道分为5级，每级有盖牌标识
- 所有马通过一级后翻开盖牌，同花色马后退一级
- 从牌库抽牌，抽到对应花色则该马前进一级
- 最先通过最后一级的花色胜出

## 如何运行
1. 克隆本仓库
2. 打开`html/index.html`文件或通过本地服务器运行

## 部署到Git步骤
1. 创建Git仓库: `git init`
2. 添加所有文件: `git add .`
3. 提交更改: `git commit -m "Initial commit"`
4. 添加远程仓库: `git remote add origin <你的远程仓库URL>`
5. 推送到远程: `git push -u origin main`

## 许可证
MIT