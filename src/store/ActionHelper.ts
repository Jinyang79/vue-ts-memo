import DataHelper from './DataHelper'
import ItemData from '../model/ItemData'
import Category from '@/model/CateEnum';

class ActionHelper {
  // 1.负责数据处理
  dataHelper: DataHelper = new DataHelper('memoData', 'id');
  // 1.1笔记数组
  memoList!: Array<ItemData>;
  // 构造函数：读取本地数据，并设置给 成员变量 memoList
  constructor() {
    //读取本地数据，将 笔记数组 保存 到 this.memoList 变量中
    this.memoList = this.readData();
  }
  // 读取本地数据，并返回 ItemData类型数组
  readData(): Array<ItemData> {
    //1.读取 本地 的 Object数组 - dataHelper
    let arrObj = this.dataHelper.readData();
    //2.将 Object数组 转成 ItemData数组
    let arrItem = arrObj.map((ele: any) => {
      let item: ItemData = new ItemData();
      item.id = ele.id;
      item.categoryId = ele.categoryId;
      item.title = ele.title;
      item.content = ele.content;
      item.createTime = ele.createTime;

      return item;
    });

    //3.返回itemData数组
    return arrItem;
  }

  getCategoryName(cateId: Category): string {
    const arrName = ['工作', '生活', '学习']
    return arrName[cateId]
  }

  add(item: ItemData): number {
    item.id = this.dataHelper.addData(item);
    this.memoList.push(item);
    this.dataHelper.saveData(this.memoList);
    return item.id;

  }

  edit(item: ItemData): void {
    let editItem: ItemData | undefined = this.memoList.find(ele => {
      return ele.id == item.id
    });
    if (editItem) {
      editItem.categoryId = item.categoryId;
      editItem.title = item.title;
      editItem.content = item.content;

      //c.将更新后的 数组 重新保存到 本地localstorage
      this.dataHelper.saveData(this.memoList);
    }
  }

  remove(id: number): void {
    let index: number = this.memoList.findIndex(ele => {
      return ele.id === id;
    })
    if (index > -1) {
      this.memoList.splice(index, 1);
      this.dataHelper.saveData(this.memoList);
    }
  }
}

export default ActionHelper