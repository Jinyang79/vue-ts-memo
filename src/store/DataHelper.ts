// DataHelper类 - 负责 localStorage 操作
class DataHelper {
  dataKey: string;
  primaryKey: string;

  // 一、构造函数 --作用：为对象 添加 各种属性--------------------------
  constructor(dataKey: string, primaryKey: string) {
    this.dataKey = dataKey;
    this.primaryKey = primaryKey;
  }

  // 1.读取全部数据，返回数组(如果没有读到数据 就返回 空数组)------------
  readData(): any {
    //1.读取 本地数据(根据dataKey读取)
    let strData: string | null = localStorage.getItem(this.dataKey);

    //2.将 读取的 json数组字符串 转成数组对象
    let arrData: any = [];
    if (strData != null) {
      arrData = JSON.parse(strData);
    }

    //3.返回 数组对象
    return arrData;
  }

  // 2.存入本地数据 -------------------------------------------------
  saveData(arrData: Array<Object>): void {
    //1.将数组 转成 json字符串
    let str: string = JSON.stringify(arrData);

    //2.将字符串 保存到 本地 localStorage 中
    localStorage.setItem(this.dataKey, str);
  }

  // 3.新增数据---------------------------
  addData(newDataObj: any): number {
    let dataArray = this.readData();
    if (dataArray == null) {
      dataArray = [];
    }

    // 自动生成 主键值 (id 值)
    //  如果 数组 长度 > 0，则 将 最后一个 元素的 id 值 取出 + 1 作为 新元素的 id值
    //               <= 0, 则 将 1 作为 新元素的 id 值
    let newId = dataArray.length > 0 ? dataArray[dataArray.length - 1][this.primaryKey] + 1 : 1;
    newDataObj[this.primaryKey] = newId;

    // 将添加了 主键值 的 对象 追加到数组
    dataArray.push(newDataObj);

    // 将数组 保存到 localStrorage 中
    this.saveData(dataArray);

    // 返回添加了 id 的数据对象
    return newId;
  }

  // 4.删除数据 ---------------------------
  removeDataById(id: string | number): boolean {
    // 读取本地数组
    let arr = this.readData();

    // 查找要删除 评论对象的 下标，并保存 到本地
    let index = arr.findIndex((ele: any) => {
      return ele[this.primaryKey] == id;
    });

    // 如果下标 大于-1，则删除数组中该下标元素对象，并返回true
    if (index > -1) {
      arr.splice(index, 1);
      // 保存到本地
      this.saveData(arr);
      return true;
    }

    return false; // 否则 返回 false
  }
}

export default DataHelper;