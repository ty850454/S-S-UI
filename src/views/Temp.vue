<template>
  <div class="home">
    
    <textarea v-model.lazy="temp"></textarea>
  </div>
</template>

<script>
export default {
  name: 'temp',
  data() {
    return {
      temp: '',
      websock: null
    }
  },
  watch: {
    temp(newQuestion, oldQuestion) {
      if (newQuestion !== this.getTemp) {
        this.websocketsend(newQuestion)
        this.getTemp = null;
      }
    }
  },
　created() {
    //页面刚进入时开启长连接
    this.initWebSocket()
  },
　destroyed() {
　  //页面销毁时关闭长连接
　　　this.websocketclose();
　},
  methods: { 
　　　　　　initWebSocket(){ //初始化weosocket 
　　　　　　　
　　　　　　　　const wsuri = "ws://xuyang520.cn/api/ws";//ws地址
　　　　　　　　this.websock = new WebSocket(wsuri); 


　　　　　　　　this.websock.onmessage = this.websocketonmessage; 
　　　　　　　　this.websock.onclose = this.websocketclose;
　　　　   }, 
　　　　　　websocketonopen() {
　　　　　　　　console.log("WebSocket连接成功");
　　　　　　},
　　　　　　websocketonerror(e) { //错误
 　　　　　　 console.log("WebSocket连接发生错误");
　　　　　　},
　　　　　　websocketonmessage(e){ //数据接收 
　　　　　　　　　//注意：长连接我们是后台直接1秒推送一条数据， 
          //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
　　　　　　　　console.log("接收", e.data); 
this.getTemp = e.data
              this.temp = e.data
　　　　　　}, 

　　　　　　websocketsend(agentData){//数据发送 
             console.log("发送：", agentData)
　　　　　　　　this.websock.send(agentData); 
　　　　　　}, 

　　　　　 websocketclose(e){ //关闭 
　　　　　　　　console.log("connection closed (" + e.code + ")"); 
　　　　　},
　　　}, 
}
</script>
