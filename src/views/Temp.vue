<template>
  <div class="temp">
    <a-alert :message="connected ? '连接成功，当前连接数' + userNum : '连接失败'" :type="connected ? 'success' : 'error'" banner />
    <br>
    <div class="tools">
      <a-button type="primary" @click="jsonFormat">json格式化</a-button>
    </div>
    <a-textarea :autosize="{ minRows: 10}" placeholder="请输入内容" v-model.lazy="temp"/>
  </div>
</template>

<script>
export default {
  name: "temp",
  data() {
    return {
      temp: "",
      userNum: 0,
      connected: false,
      websock: null
    };
  },
  watch: {
    temp(newQuestion, oldQuestion) {
      if (newQuestion !== this.getTemp) {
        this.websocketsend(newQuestion);
        this.getTemp = null;
      }
    }
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
  destroyed() {
    //页面销毁时关闭长连接
    this.websock.close();
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      // const wsuri = "ws://xuyang520.cn/api/ws"; //ws地址
      const wsuri = "ws://127.0.0.1:8080/api/ws"; //ws地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      this.connected = true;
    },
    websocketonerror(e) {
      console.log(e)
      this.$message.error("连接错误");
      this.connected = false;
    },
    websocketonmessage(e) {
      //数据接收

      let json = JSON.parse(e.data);
      if (json.type === "msg") {
        this.getTemp = json.data;
        this.temp = json.data;
      } else if (json.type === "userNum") {
        this.userNum = json.data;
      }
    },
    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },
    websocketclose(e) {
      console.log(e.reason)
      this.connected = false;
    },
    jsonFormat() {
      let temp = this.temp;
      try {
        temp = JSON.parse(temp);
        temp = JSON.stringify(temp, null, 4);
        this.temp = temp;
      } catch {
        this.$message.error("json格式化失败");
      }
    }
  }
};
</script>
<style scoped>
.tools {
  margin: 5px 5px;
  text-align: left;
}
</style>