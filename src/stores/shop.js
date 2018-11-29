import { observable, action, computed, autorun } from 'mobx';
import { create, persist } from 'mobx-persist'

class Shop {
	@persist('list') @observable data = [];
    @observable action = null;
    //持久化测试
    @persist('object') @observable persistTestObj = null //对象这里不能写{} 要么就也写成初始值
    @persist('list') @observable persistTestArr = []
    @persist @observable persistTestNum = 0
    @persist @observable persistTestStr = ""

	//设置初始化数据
	@action
	changeInitialData = (data)=>{ 
		this.data = data
	}
    @computed get totalCount(){
        return this.data.reduce(function(prev,next){
            return prev + next.count 
        },0)
    }
    @computed get totalPrice(){
        return this.data.reduce(function(prev,next){
            return prev + next.count * next.price
        },0)
    }
    @action
    increase = (i)=>{
        this.action = 'increase'
        this.data.find(function(item,index){
            return index == i
        }).count += 1
    }
    @action
    setAction = (data)=>{
        this.action = data
    }
    @action
    decrease = (i)=>{
        this.action = 'decerase'
        this.data.find(function(item,index){
            return index == i
        }).count -= 1
    }
}

let _Shop = new Shop()

autorun(()=>{
    _Shop.action && console.log(_Shop.action == 'increase' ? '您点击了增加':"您点击了减少")
    _Shop.setAction(null)
},{
    delay:500 //加上delay 多次快速点击只会出现一次 console
})

const hydrate = create({
    storage: localStorage,   // or AsyncStorage in react-native.
                            // default: localStorage
    jsonify: true  // if you use AsyncStorage, here shoud be true
                    // default: true
})

hydrate('shop', _Shop,{
    persistTestObj:{
        "a":10,"b":2
    },
    persistTestArr:[1,3,20],
    persistTestNum:1,
    persistTestStr:'2'
}).then(() => console.log('_Shop has been hydrated'))

export default _Shop