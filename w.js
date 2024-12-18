class TreasureMap {
  static assets = {};

  static async loadGameData() {
    const response = await fetch('game-assets.txt');
    const text = await response.text();
    const lines = text.split('\n');
    lines.forEach(line => {
      const [key, value] = line.split(': ');
      TreasureMap.assets[key] = value;
    });
  }
  
  static savePlayerInfo(playerId, nickname, history) {
    const playerInfo = { playerId, nickname, history };
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
  }
  
  static getPlayerInfo() {
    const playerInfo = localStorage.getItem('playerInfo');
    return playerInfo ? JSON.parse(playerInfo) : null;
  }

  static saveGameState(playerId, nickname, history, gameState) {
    const playerInfo = { playerId, nickname, history, gameState };
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
  }
  
  static getGameState() {
    const playerInfo = localStorage.getItem('playerInfo');
    return playerInfo ? JSON.parse(playerInfo) : null;
  }
  
  
  // 使用 TreasureMap.assets 来获取文本内容
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.library);
      }, 1000);
    });
  }
  
  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject(TreasureMap.assets.no_clue);
        }
        resolve(TreasureMap.assets.temple);
      }, 1500);
    });
  }
  
  static searchTemple(location) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.guard);
      }, 1000);
    });
  }
  
  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.treasure);
      }, 1000);
    });
  }
  
  static askForWaterK() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.kitchen);
      }, 1000);
    });
  }
  
  static askForWaterW() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.bathroom);
      }, 1000);
    });
  }
  
  static changeBackground(imagePath) {
    document.getElementById('game-background').style.backgroundImage = `url('${imagePath}')`;
  }
  
  static goToKitchen() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.kitchen);
      }, 1000);
    });
  }
  
  static goToBathroom() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.bathroom);
      }, 1000);
    });
  }
  
  static askForDirections(location) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.directions);
      }, 1000);
    });
  }
  
  static restForAWhile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.rest);
      }, 1000);
    });
  }
  
  static equipAdventureGear() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TreasureMap.assets.gear);
      }, 1000);
    });
  }
  
  static avoidGuard() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.7) {
          resolve(TreasureMap.assets.avoid_guard_success);
        } else {
          reject(TreasureMap.assets.avoid_guard_fail);
        }
      }, 1000);
    });
  }
}

async function waitForClick() {
  return new Promise((resolve) => {
    document.body.addEventListener('click', resolve, { once: true });
  });
}

async function findTreasure() {
  try {
    await TreasureMap.loadGameData();

    // 添加背景音乐
    await waitForClick();
    const backgroundMusic = new Audio('background-music.mp3');
    backgroundMusic.play();
    backgroundMusic.loop = true;

    // 恢复玩家信息
    const playerInfo = TreasureMap.getPlayerInfo();
     if (playerInfo) {
    // 显示玩家信息，根据需要恢复游戏状态
    document.getElementById('game-status').textContent = `欢迎回来，${playerInfo.nickname}！`;
    } else {
     // 新玩家，初始化信息
    const playerId = 'player123'; // 示例玩家ID
    const nickname = '勇敢的探险家'; // 示例昵称
    TreasureMap.savePlayerInfo(playerId, nickname, '开始游戏');
    }

    // 游戏流程
    TreasureMap.changeBackground('library-background.jpg');
    document.getElementById('game-status').textContent = "当前位置: 古老的图书馆";
    await waitForClick();

        // ...其余游戏流程
        const initialClue = await TreasureMap.getInitialClue();
        document.getElementById('game-status').textContent = initialClue;
        await waitForClick(); // 等待用户点击
    
        TreasureMap.changeBackground('script-background.jpg');
        document.getElementById('game-status').textContent = "当前位置: 解码线索";
        const ancientScript = await TreasureMap.decodeAncientScript(initialClue);
        document.getElementById('game-status').textContent = ancientScript;
        await waitForClick(); // 等待用户点击
    
        TreasureMap.changeBackground('water-background.jpg');
        document.getElementById('game-status').textContent = "当前位置: 寻找水源";
        await waitForClick(); // 等待用户点击
    
        // 显示按钮供用户选择
        document.getElementById('kitchen-btn').style.display = 'inline';
        document.getElementById('bathroom-btn').style.display = 'inline';
    
        // 等待用户选择
        const waterDecision = await new Promise((resolve) => {
            document.getElementById('kitchen-btn').addEventListener('click', () => {
                document.getElementById('kitchen-btn').style.display = 'none';
                document.getElementById('bathroom-btn').style.display = 'none';
                resolve('kitchen');
            });
    
            document.getElementById('bathroom-btn').addEventListener('click', () => {
                document.getElementById('kitchen-btn').style.display = 'none';
                document.getElementById('bathroom-btn').style.display = 'none';
                resolve('bathroom');
            });
        });
    
        // 根据用户选择执行相应的方法
        if (waterDecision === 'kitchen') {
            TreasureMap.changeBackground('Kitchen.jpg');
            document.getElementById('game-status').textContent = "当前位置: 厨房";
            const kitchenWater = await TreasureMap.askForWaterK();
            document.getElementById('game-status').textContent = kitchenWater;
        } else {
            TreasureMap.changeBackground('wash.jpg');
            document.getElementById('game-status').textContent = "当前位置: 洗手间";
            const bathroomWater = await TreasureMap.askForWaterW();
            document.getElementById('game-status').textContent = bathroomWater;
        }
        await waitForClick(); // 等待用户点击
    
        const directions = await TreasureMap.askForDirections();
        document.getElementById('game-status').textContent = "询问前往神庙的方向...";
        document.getElementById('game-status').textContent = directions;
        TreasureMap.changeBackground('directions-background.jpg');
        await waitForClick(); // 等待用户点击
    
        // 休息一会儿
        const rest = await TreasureMap.restForAWhile();
        document.getElementById('game-status').textContent = "在大树下休息...";
        TreasureMap.changeBackground('rest-background.jpg');
        document.getElementById('game-status').textContent = rest;
        await waitForClick(); // 等待用户点击
    
        // 装备探险装备
        const gear = await TreasureMap.equipAdventureGear();
        document.getElementById('game-status').textContent = "装备探险装备...";
        TreasureMap.changeBackground('gear-background.jpg');
        document.getElementById('game-status').textContent = gear;
        await waitForClick(); // 等待用户点击
    
        // 寻找宝藏的流程
        document.getElementById('game-status').textContent = "当前位置: 古老的神庙";
        TreasureMap.changeBackground('temple-background.jpg');
        await waitForClick(); // 等待用户点击
    
        // 尝试避开守卫
        const avoidGuardResult = await TreasureMap.avoidGuard();
        document.getElementById('game-status').textContent = "尝试避开守卫...";
        TreasureMap.changeBackground('avoid.jpg');
        document.getElementById('game-status').textContent = avoidGuardResult;
        await waitForClick(); // 等待用户点击
    
        // 打开宝箱
        TreasureMap.changeBackground('treasure-background.jpg');
        document.getElementById('game-status').textContent = "当前位置: 打开宝箱";
        const treasure = await TreasureMap.openTreasureBox();
        document.getElementById('game-progress').textContent = treasure;
        TreasureMap.changeBackground('baozang.jpg');
        await waitForClick(); // 等待用户点击
    
      } catch (error) {
        document.getElementById('game-progress').textContent = `任务失败: ${error}`;
      }
    }
    
    document.getElementById('start-btn').addEventListener('click', findTreasure);
    document.getElementById('exit-btn').addEventListener('click', () => {
      const playerInfo = TreasureMap.getPlayerInfo();
      if (playerInfo) {
        TreasureMap.saveGameState(playerInfo.playerId, playerInfo.nickname, playerInfo.history, {
          assets: TreasureMap.assets,
          status: document.getElementById('game-status').textContent,
          backgroundImage: document.getElementById('game-background').style.backgroundImage
        });
      }
      document.getElementById('game-status').textContent = "Game exited";
      document.getElementById('game-progress').textContent = "";
      TreasureMap.changeBackground('end.jpg');
    });

    // 页面加载时尝试恢复游戏
    window.onload = findTreasure;