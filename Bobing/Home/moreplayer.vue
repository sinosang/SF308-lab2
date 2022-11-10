<template>
  <div class="one_background">
    <div class="one_exit" @click="exit">退出</div>
    <!-- title -->
    <div class="one_title1">博</div>
    <div class="one_title2">饼</div>
    <!-- rule -->
    <div @click="dialogVisible = true" class="Login_rule">
      <img src="../../assets/img/rule.png" />
        <div class="rule">规则</div>
    </div>
       <div class="nowplay">当前玩家：{{playerNow}}</div>
    <!-- user -->
    <div v-for="(item, index) in allPlayer" :key="index">
      <div class="all_user" :id="'user' + index">
        <img :src="item.pic" />
        <p :class="index==changeplayer ? 'colornow':'colorbefore'">{{ item.name }}</p>
      </div>
    </div>
    <!-- score -->
    <div class="one_score">
      <div class="one_score_title">计分板</div>
      <div class="one_score_yours">大家的手气:</div>
      <div class="score_all">
        <div v-for="(item, index) in touziresult" :key="index">
          <div class="score_item">1P:{{ item }}</div>
        </div>
      </div>
      <div class="score_all">
        <div v-for="(item, index) in touziresult2" :key="index">
          <div class="score_item">2P:{{ item }}</div>
        </div>
      </div>
    </div>
    <!-- diaotu -->
    <div :class="flag == 1 ? 'touzigif_show' : 'touzigif_hind'"></div>
    <div :class="flag == 1 ? 'xiang_show' : 'celebrate_hind'"></div>
    <!-- play -->
    <div class="playbutton" @click="change_flag(flag)">
      <img :src="playButton[flag].img" />
      {{ playButton[flag].state }}
    </div>

    <div class="playbutton2" @click="nextone(changeplayer)">
      <img src="../../assets/img/next.png" />
      下一位
    </div>
    <div class="one_award">
      {{ touzitemp_award }}
    </div>
    <!-- touzi -->
    <div
      v-for="(item, index) in touzitemp_img"
      :key="index"
      class="touzi"
      :id="'touzi' + index"
    >
      <img :src="item.img" />
    </div>
  </div>
  <!-- dialog -->
  <el-dialog v-model="dialogVisible" width="50%" :before-close="handleClose">
    <div class="Dialog_rule">
      <img src="../../assets/img/brule.jpg" />
    </div>
    <el-button
      style="position: relative; left: 90%"
      @click="dialogVisible = false"
      >明白了</el-button
    >
  </el-dialog>
</template>

<script>
import moreplayer from "./moreplayer";
export default moreplayer;
</script>

<style src="./more.css" scoped>
</style>
