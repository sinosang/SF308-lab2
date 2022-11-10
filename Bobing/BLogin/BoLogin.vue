<template>
  <div class="B_Login">
    <div class="Login_title">博饼小游戏</div>
    <div
      :class="player == clickornot ? 'Login_button' : 'Login_button_hind'"
      @click="choose"
    >
      <img src="../../assets/img/moon.png" />
      开始游戏
    </div>

    <div class="Login_rule" @click="dialogpicVisible = true">
      <img src="../../assets/img/rule.png" />
      <div class="rule">规则</div>
    </div>
    <!-- login icon -->
    <div class="Login_bing">
      <img src="../../assets/img/bing.png" />
    </div>
    <div class="Login_yun">
      <img src="../../assets/img/yun.png" />
    </div>
    <!-- player button -->
    <div
      class="Login_player"
      @click="oneplay"
      :id="player == clickornot ? 'hind' : 'one'"
    >
      <img src="../../assets/img/jie.png" />
      单人游戏
    </div>
    <div
      class="Login_player"
      @click="dialogmoreVisible = true"
      :id="player == clickornot ? 'hind' : 'more'"
    >
      <img src="../../assets/img/fight.png" />
      多人游戏
    </div>
  </div>
  <!-- dialog1 -->
  <el-dialog v-model="dialogpicVisible" width="50%" :before-close="handleClose">
    <div class="Dialog_rule">
      <img src="../../assets/img/brule.jpg" />
    </div>
    <el-button
      style="position: relative; left: 90%"
      @click="dialogpicVisible = false"
      >明白了</el-button
    >
  </el-dialog>

  <!-- dialog2 -->
  <el-dialog
    v-model="dialogmoreVisible"
    width="50%"
    :before-close="handleClose"
    title="多人游戏 (最多支持10人同时游玩)"
  >
    <div class="dialog_more_choose">
      <div>加入房间:</div>
      <div style="margin-left: 15px">
        <el-input v-model="roomid" placeholder="请输入房间号" />
      </div>
      <el-button
        @click="moreplay(roomid)"
        style="margin-left: 10px; margin-top: 10px"
        >确定加入</el-button
      >
    </div>
    <div class="dialog_more_choose" style="margin-bottom: 15px">
      <div>创建房间:</div>
      <div style="margin-left: 15px">
        <el-input v-model="setroomid" placeholder="创建的房间号" />
      </div>
      <div style="margin-left: 20px; margin-top:2px;
      font-size: 15px">
        房间人数：
        <el-input-number
          v-model="playernum"
          :min="2"
          :max="10"
          @change="numChange"
        />
      </div>
      <el-button
        @click="creatSucceed"
        style="margin-left: 20px; margin-top: 10px"
        >确定创建</el-button >
    </div>
  </el-dialog>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onUpdated, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  setup() {
    const router = useRouter();
    const dialogpicVisible = ref(false);
    const dialogmoreVisible = ref(false);
    let clickornot = ref(0);
    let player = ref(0);
    let roomid = ref();
    let setroomid = ref();
    function choose() {
      clickornot.value = 1;
      player.value = clickornot;
      console.log(clickornot.value);
      console.log(player.value);
    }
    function creatSucceed() {
      dialogmoreVisible.value = false;
      let testdata = {
        id: setroomid.value,
      };
      axios({
        method: "post",
        url: "http://4934xk1141.imdo.co:27605/room/createroom",
        data: testdata,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (res) {
          console.log(res.data);
          console.log(res.data.code);
          if (res.data.code == 200) {
            ElMessage({
              message: "房间创建成功",
              type: "success",
            });
          }
          if (res.data.code == 409) {
            ElMessage({
              message: "房间已存在，不可再次创建",
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    let playernum = ref(1);
    function numChange() {}
    function oneplay() {
      router.push({
        path: "/oneplay",
      });
    }
    function moreplay(room) {
      if (room == 111) {
        ElMessage({
          message: "加入成功",
          type: "success",
        });
        router.push({
          path: "/moreplay",
        });
      } else {
        ElMessage({
          message: "该房间不存在",
          type: "warning",
        });
      }
    }

    return {
      player,
      playernum,
      roomid,
      setroomid,
      clickornot,
      dialogpicVisible,
      dialogmoreVisible,
      choose,
      numChange,
      oneplay,
      moreplay,
      creatSucceed,
    };
  },
};
</script>

<style>
div {
  font-family: "zhai";
}
/* background */
.B_Login {
  z-index: -100;
  background: url("../../assets/img/back3.png");
  width: 100%;
  height: 100vh;
  background-color: #0d0a2d;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-position-x: -35px;
}
.Login_title {
  z-index: 1;
  color: #e6c43a;
  font-weight: bold;
  font-size: 40px;
  font-style: unset;
  position: absolute;
  letter-spacing: 5px;
  top: 15px;
  left: 30px;
  cursor: default;
}
/* rule */
.Login_rule {
  display: flex;
  z-index: 1;
  top: 15px;
  position: absolute;
  right: 30px;
  height: 50px;
  width: 160px;
  cursor: pointer;
}
.Login_rule img {
  width: 30px;
  height: 30px;
  padding-top: 10px;
  padding-right: 15px;
}
.rule {
  z-index: 2;
  display: flex;
  height: 50px;
  width: 260px;
  color: transparent;
  position: relative;
  -webkit-text-stroke: 0.8px white;
  font-weight: bold;
  font-size: 30px;
  font-style: unset;
  letter-spacing: 5px;
  line-height: 50px;
  transition: 0.5s;
}
.Login_check {
  z-index: 0;
  color: transparent;
  position: absolute;
  right: 20px;
  height: 50px;
  width: 100px;
  -webkit-text-stroke: 0.8px white;
  font-weight: bold;
  font-size: 30px;
  font-style: unset;
  letter-spacing: 5px;
  line-height: 50px;
  transition: 0.5s;
  opacity: 0;
}
.Dialog_rule img {
  width: 100%;
}
/* player button */
.Login_player {
  display: flex;
  position: absolute;
  width: 250px;
  height: 100px;
  background-color: #ece8c7;
  font-size: 30px;
  line-height: 100px;
  letter-spacing: 5px;
  color: #1e1c4f;
  font-weight: bold;
  border-radius: 25px;
  box-shadow: 0px 0px 2px 3px #e0dcb2;
  transition: 0.5s;
}
.Login_player:hover {
  cursor: pointer;
  scale: 0.95;
  transition: 0.5s;
}
.Login_player img {
  padding-top: 10px;
  width: 80px;
  height: 80px;
}
#hind {
  top: -50px;
  transition: 1.5s;
  opacity: 0;
}
/* login button hind */
.Login_button_hind {
  color: gray;
  width: 180px;
  height: 40px;
  background-color: #ece8c7;
  border-radius: 15px;
  margin: 0 auto;
  line-height: 40px;
  position: relative;
  top: 90vh;
  opacity: 0.9;
  transition: 0.5s;
  display: flex;
  box-shadow: 0px 0px 1px 2px #e0dcb2;
  opacity: 0;
}
.Login_button_hind img {
  width: 40px;
  height: 40px;
  padding-left: 10px;
  padding-right: 15px;
}
.hind img {
  width: 40px;
  height: 40px;
  padding-left: 10px;
  padding-right: 15px;
}
#one {
  z-index: 0;
  position: absolute;
  top: 70vh;
  left: 100px;
  transition: 1.5s;
}
#more {
  z-index: 0;
  position: absolute;
  top: 70vh;
  right: 100px;
  transition: 1.5s;
}
/* icon */
.Login_yun {
  z-index: 0;
  position: absolute;
  width: 500px;
  left: 60%;
  height: 300px;
  top: -60px;
  opacity: 0.8;
}
.Login_bing {
  position: absolute;
  top: 35vh;
  left: 50px;
}
/* button */
.Login_button {
  color: gray;
  width: 180px;
  height: 40px;
  background-color: #ece8c7;
  border-radius: 15px;
  margin: 0 auto;
  line-height: 40px;
  position: relative;
  top: 90vh;
  opacity: 0.9;
  transition: 0.5s;
  display: flex;
  box-shadow: 0px 0px 1px 2px #e0dcb2;
}
.Login_button img {
  width: 40px;
  height: 40px;
  padding-left: 10px;
  padding-right: 15px;
}
.Login_button:hover {
  cursor: pointer;
  transition: 0.5s;
  scale: 1.05;
  box-shadow: 0px 0px 2px 3px #e0dcb2;
}

/* dialog */
.dialog_more_choose {
  height: 50px;
  font-size: 25px;
  line-height: 50px;
  position: relative;
  display: flex;
}
</style>