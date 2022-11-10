import { useRouter } from "vue-router";
import { ref } from "vue";
import playbutton1 from "../../assets/img/tou.png";
import playbutton2 from "../../assets/img/query.png";
import what from "../../assets/img/what.png";
import touzi1 from "../../assets/img/1.jpg";
import touzi2 from "../../assets/img/2.jpg";
import touzi3 from "../../assets/img/3.jpg";
import touzi4 from "../../assets/img/4.jpg";
import touzi5 from "../../assets/img/5.jpg";
import touzi6 from "../../assets/img/6.jpg";
export default {
  setup() {
    const router = useRouter();
    const dialogVisible = ref(false);
    //show in the score
    let touziresult = [];
    //store the touzi not change
    let touziImg = [
      { img: touzi1 },
      { img: touzi2 },
      { img: touzi3 },
      { img: touzi4 },
      { img: touzi5 },
      { img: touzi6 },
    ];
    //temp img  can change
    let touzitemp_img = [
      { img: touzi1 },
      { img: touzi2 },
      { img: touzi3 },
      { img: touzi4 },
      { img: touzi5 },
      { img: touzi6 },
    ];

    // 投出的结果(num)
    let touzitemp_num = [];
    // 转换为奖项
    let touzitemp_award = ref("快来试试手气");
    // 摇一摇按钮以及状态判断
    let flag = ref(0);
    let playButton = [
      { img: playbutton1, state: "摇一摇" },
      { img: playbutton2, state: "看手气" },
    ];

    function exit() {
      router.push({
        path: "/Bobing",
      });
    }
    //main function
    // choose state
    function change_flag(state) {
      if (state == 0) {
        //start
        console.log("start");
        touzitemp_award.value = "会是什么呢？";
        starttime();
        flag.value = 1;
      }
      if (state == 1) {
        //end
        console.log("stop");
        getRandom(state);
        flag.value = 0;
      }
    }
    //unknow img
    function starttime() {
      touzitemp_img[0].img = what;
      touzitemp_img[1].img = what;
      touzitemp_img[2].img = what;
      touzitemp_img[3].img = what;
      touzitemp_img[4].img = what;
      touzitemp_img[5].img = what;
    }

    // getrandomnumber
    function getRandom(state) {
      let randonNumber = 0;
      let touzi = 0;
      if (state == 1) {
        // 获得6随机数，赋值
        for (var i = 0; i < 6; i++) {
          randonNumber = Math.round(Math.random() * (5 - 0) + 0);
          touzi = randonNumber + 1;
          touzitemp_num.push(touzi);
          // console.log("output the touzi", touzi);
        }
        console.log("output the touzitemp_num", touzitemp_num);
        getAward(touzitemp_num);
        getImg(touzitemp_num);
        touzitemp_num.length = 0;
      }
    }
    // getaward 获得奖项
    function getAward(touzitemp_num) {
      //计数每个骰子有几次
      let count = [0, 0, 0, 0, 0, 0];
      // getcount
      for (var i = 0; i < touzitemp_num.length; i++) {
        if (touzitemp_num[i] == 1) {
          count[0]++;
        }
        if (touzitemp_num[i] == 2) {
          count[1]++;
        }
        if (touzitemp_num[i] == 3) {
          count[2]++;
        }
        if (touzitemp_num[i] == 4) {
          count[3]++;
        }
        if (touzitemp_num[i] == 5) {
          count[4]++;
        }
        if (touzitemp_num[i] == 6) {
          count[5]++;
        }
      }
      // get award
      let countall = 0;
      for (var j = 0; j < count.length; j++) {
        if (count[j] == 4 && j != 3) {
          touzitemp_award.value = "四进/进士";
        } else if (count[j] == 5 && j != 3) {
          touzitemp_award.value = "五子登科";
        } else if (count[j] == 6) {
          if (j != 3) touzitemp_award.value = "黑六勃";
          if (j == 0) touzitemp_award.value = "遍地锦";
        } else if (count[j] != 0) {
          countall++;
          if (countall == 6) touzitemp_award.value = "对堂/榜眼";
        } else if (count[3] == 1) {
          touzitemp_award.value = "一秀/秀才";
        } else if (count[3] == 2) {
          touzitemp_award.value = "二举/举人";
        } else if (count[3] == 3) {
          touzitemp_award.value = "三红/探花";
        } else if (count[3] == 4) {
          if (count[0] == 2) touzitemp_award.value = "状元插金花";
          else touzitemp_award.value = "状元";
        } else if (count[3] == 5) {
          touzitemp_award.value = "五红";
        } else if (count[3] == 6) {
          touzitemp_award.value = "六杯红";
        } else {
          touzitemp_award.value = "下次一定";
        }
      }
      touziresult.push(touzitemp_award.value);
      console.log("count", count);
    }
    //getImg 获得输出的骰子图片
    function getImg(touzitemp_num) {
      console.log("getImg", touzitemp_num);
      for (var i = 0; i < touzitemp_num.length; i++) {
        // console.log(touzitemp_num[i]);
        if (touzitemp_num[i] == 1) {
          touzitemp_img[i].img = touziImg[0].img;
        }
        if (touzitemp_num[i] == 2) {
          touzitemp_img[i].img = touziImg[1].img;
        }
        if (touzitemp_num[i] == 3) {
          touzitemp_img[i].img = touziImg[2].img;
        }
        if (touzitemp_num[i] == 4) {
          touzitemp_img[i].img = touziImg[3].img;
        }
        if (touzitemp_num[i] == 5) {
          touzitemp_img[i].img = touziImg[4].img;
        }
        if (touzitemp_num[i] == 6) {
          touzitemp_img[i].img = touziImg[5].img;
        }
      }
    }


    
    return {
      touziresult,
      touzitemp_img,
      touziImg,
      touzitemp_num,
      touzitemp_award,
      dialogVisible,
      playButton,
      flag,
      exit,
      starttime,
      change_flag,
      getRandom,
      getAward,
      getImg,
    };
  },
};