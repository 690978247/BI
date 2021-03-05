<template>
  <div class="page" >
    <div class="page-tools">1</div>
    <div class="page-wrap">
      <div class="btn-groups" id="btnGroups" >
        <div class="l-title" >组件箱</div>
        <div class="l-title l-subtitle">标准组件</div>
        <div v-for="(item, key) in btns" :key="key" class="btn" draggable @dragstart="handleStart($event, item)" @drag="handleDrag($event, item)" >{{item.name}}</div>
      </div>
      <div class="canvas" id="wrap">
        <div class="wrap-tab" >112312</div>
        <div class="canvas-wrap" 
          @dragover.prevent
          @dragenter="dragenter"
          @dragleave="dragleave"
          @dragover="dragovers"
          @drop="drops"
          ref="wrap"
        >
      <div class="wrap" >
      <!-- <canvas id="canvas" ref="canvas" :width="width" :height="height" class="canvas">
        Your browser does not support the canvas element.
      </canvas> -->
        <child-node
          v-for="(item, index) in childNodes"
          :key="index"
          :child-item="{ ...item, index }"
          @resize="handleElementResize">
          </child-node>
      </div> 
    
    
        </div>
      </div>
      <div class="details">
        <!-- 属性栏固定组 -->
        <div class="common-group">
          <div class="r-item" >检视: 名称</div>
          <input type="text" class="r-input" />
          <div class="r-btns">
            <div :class="{ active: !isActive }" @click="isActive = true" >属 性</div>
            <div :class="{ active: isActive }" @click="isActive = false">事 件</div>
          </div>
        </div>
        <!-- 属性栏变化组 -->
        <div class="change-group">
          <div class="pos-group" >
            <div class="r-pos">位置，<span>尺寸</span> </div>
            <div class="r-pos r-pos-detail">
              <div><span>W：</span><input class="r-pos-input" type="text">
              </div>
              <div><span> H：</span><input class="r-pos-input" type="text"></div>
            </div>
            <div class="r-pos r-pos-detail">
              <div><span>X：</span><input class="r-pos-input" type="text"></div>
              <div><span>Y：</span><input class="r-pos-input" type="text"></div>
            </div>
          </div>
        </div  >
      </div>
    </div>
  </div>
</template>

<script>
import childNode from '../components/childNode'

export default {
  name: 'Home',
  components: {
    childNode
  },
  data () {
    return {
      width: 1200,
      height: 900,
      isActive: true,
      btns: [
        {
          icon: '',
          name: '直线',
          type: 'line',
          width: 200,
          height: 40,
          zIndex: 10,
        },
        {
          icon: '',
          name: '椭圆',
          type: 'ellipse',
          width: 200,
          height: 60,
          zIndex: 10,
        },
        {
          icon: '',
          name: '矩形',
          type: 'rectangle',
          width: 200,
          height: 140,
          zIndex: 10,
        },
        {
          icon: '',
          name: '按钮',
          type: 'btn',
          width: 200,
          height: 40,
          zIndex: 10,
        }
      ],
      childNodes: []
    }
  },
  created () {
    // this.$nextTick(() => {
    //   // let ax,ay,x,y;
    //   // var c = document.getElementById("canvas")
    //   // var cxt = c.getContext("2d")
    //   // cxt.fillStyle="#FF0000"
    //   // cxt.beginPath()
    //   // cxt.arc(70,18,15,0,Math.PI*2,true)
    //   // cxt.closePath()
    //   // cxt.fill()
    // })
  },
  methods: {
    // 移动改变元素大小定位
    handleElementResize (pos, index) {
      // if (this.childNodes[index]) {
      //   this.childNodes[index].commonStyle = pos
      //   console.log(this.childNodes[index].commonStyle)
      // }
    },

    handleStart (e, item) {
      console.log(e.target)
      // if (e.target)
      e.dataTransfer.setData("data", JSON.stringify(item));
      e.dataTransfer.effectAllowed = 'copyMove'
    },
    handleDrag (e, data) {
      e.preventDefault()
    },
    drops (event) {
      console.log('drops')
      let fatherY = this.$refs.wrap.offsetTop
      let fatherX = this.$refs.wrap.offsetLeft
    
      let targetX =  event.clientX
      let targetY =  event.clientY
       // 获取dragstart事件传递的参数
      let data = JSON.parse(event.dataTransfer.getData('data'))
      // 清除dragstart事件传递的参数
      event.dataTransfer.clearData()
      console.log(event)
      
      this.childNodes.push({
        name: data.name,
        type: data.type,
        commonStyle: {
          x: targetX - fatherX,
          y: targetY - fatherY,
          width: data.width,
          height: data.height,
          zIndex: data.zIndex
        },
        pointList: ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'],
      })
    },
    dragenter (event) {
      console.log('enter')
    },
    dragleave () {},
    dragovers (event) {
      console.log(event.target)
       if (event.target.classList.contains('allowed')) {
         event.dataTransfer.dropEffect = 'move'
       } else {
         event.dataTransfer.dropEffect = 'copy'
       }
       event.preventDefault()
    },
  }
}
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  background: #383838;
  color: #ccc;
}

.canvas-page {
  width: 100%;
  height: 100%;
  background: #383838;
  display: flex;
}

/* 顶部样式 */
.page-tools {
  width: 100%;
  height: 85px;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
}

.page-wrap {
  width: 100%;
  height: calc( 100% -  90px);
  display: flex;
}
/* 导航栏样式 */
.btn-groups {
  width: 180px;
  min-width: 180px;
  height: 100%;
  background: #3d3d3d;
  text-align: center;
  user-select: none;
}
.l-title {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding-left: 20px;
}
.l-subtitle {
  background: #555555;
}
.btn-groups .btn {
  color: #ccc;
  padding: 8px;
  cursor: pointer;
  // border-bottom: 1px solid #404040;
  border: 1px solid #404040;
  transition: All 0.3s ease-in-out;
}

.btn-groups .btn:hover {
  background: #fff;
  border: 1px solid #1ab399;
  color: #1ab399;
}
/* 中间画布样式 */
.canvas {
  width: 100%;
  height: 100%;
}
.wrap-tab {
  height: 30px;
  font-size: 12px;
  padding-left: 3px;
  line-height: 30px;
}
.canvas-wrap {
  height: calc(100% - 30px - 2px);  //画布高度需要减去顶部wrap-tabs高度减去上边框线的高度
  overflow: auto;
  color: #000;
  background: #fff;
  text-align: center;
  position: relative;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  border-right: 2px solid #000;
  .wrap {
    width: 100%;
    height: 100%;
  }
}
/* 右侧属性样式 */
.details {
  font-size: 13px;
  width: 200px;
  min-width: 200px;
  line-height: 40px;
  background: #545454;
}
.active {
  background: #464646;
}
.r-item {
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  background: #464646;
  border-bottom: 1px solid #404040;
}
.r-input {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  outline: none;
  box-sizing: border-box;
}
.r-btns {
  height: 40px;
  display: flex;
  font-size: 15px;
  div {
    flex: 1;
    text-align: center;
    margin-left: -1px;
    cursor: pointer;
    border: 1px solid #404040;
  }
}
.pos-group {
  border-bottom: 1px solid #404040;
}
.r-pos {
  padding: 0 10px;
}
.r-pos-input {
  width: 48px;
  height: 28px;
  background: #434343;
  box-sizing: border-box;
  outline: none;
  color: #fff;
  padding: 0 5px;
  border: none;
}
.r-pos-detail {
  display: flex;
  span {
    display: inline-block;
    width: 25px;
  }
  div:first-child {
    flex: 1
  }
  div:last-child {
    flex: 0.8
  }
}
</style>
