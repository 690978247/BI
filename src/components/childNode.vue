<template>
  <div class="commonModule" draggable="false" :style="styleObj" >
    <div class="moduleShape"
      @mouseout="handleOut()"
      @mousedown="handleDown(childItem, $event)"
    >
      {{childItem.text}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildNode',
  props: {
    type: {  
      type: String,
      default: ''
    },
    childItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    styleObj () {
      return {
        width: this.childItem.PropertyList.width + 'px',
        height: this.childItem.PropertyList.height + 'px',
        top: this.childItem.PropertyList.Top + 'px',
        left: this.childItem.PropertyList.Left + 'px',
        zIndex: this.childItem.PropertyList.zIndex,
      }
    },
  },
  data () {
    return {
    }
  },
  created () {
    console.log('child', this.childItem)
  },
  methods: {
    filterStyle () {
      return 
    },
    handleOut () {},
    //鼠标按下事件
    handleDown (childItem, e) {
      const { PropertyList: pos } = this.childItem
      let startY = e.clientY
      let startX = e.clientX
      let startTop = pos.Top
      let startLeft = pos.Left
      let firstTime = ''
      let lastTime = ''
      let move = moveEvent => {
        
        // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
        moveEvent.stopPropagation()
        moveEvent.preventDefault()

        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        pos.Top = currY - startY + startTop
        pos.Left = currX - startX + startLeft
        // this.styleObj.top = pos.Top + 'px'
        // this.styleObj.left = pos.Left + 'px'
        this.childItem.PropertyList.zIndex = 20
        this.childItem.PropertyList.top = pos.Top
        this.childItem.PropertyList.left = pos.Left
      }
      let up = () => {
        lastTime = new Date().getTime()
        if ((lastTime - firstTime) > 200) {
          this.childItem.PropertyList.zIndex = 10
          this.$emit('resize')
        }
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
      return true
    },
    // 获取point计算后样式
    // handleClick () {
    //   console.log(this.childItem.Name)
    // },
  }
}
</script>

<style lang="scss" scoped>
.commonModule {
  position: absolute;
  user-select: none; 
  border: 1px solid #000;
  &:hover {
    border: 1px dashed #1AB399;
  }
}
.moduleShape {
  width: 100%;
  height: 100%;
}
</style>