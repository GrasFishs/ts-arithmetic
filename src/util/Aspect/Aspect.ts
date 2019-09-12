export function Before(obj: any, method: string) {
  return function(_: any, __: any, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
      console.log(`${_.constructor.name}.${__}方法开始调用`);
      obj[method].call(obj, ...args);
      return oldValue.call(this);
    };
  };
}

export function After(obj: any, method: string) {
  return function(_: any, __: any, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const ret = oldValue.call(this, ...args);
      obj[method].call(obj);
      console.log(`${_.constructor.name}.${__}方法结束调用`);
      return ret;
    };
  };
}

type Method = {
  obj: any;
  method: string;
};

export function Around(before: Method, after: Method) {
  return function(_: any, __: any, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
      console.log(`${_.constructor.name}.${__}方法开始调用`);
      before.obj[before.method].call(before.obj);
      const ret = oldValue.call(this, ...args);
      after.obj[after.method].call(after.obj);
      console.log(`${_.constructor.name}.${__}方法结束调用`);
      return ret;
    };
  };
}
