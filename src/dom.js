window.dom = {
  //创建节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  //新增弟弟
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //新增儿子
  append(parent, node) {
    parent.appendChild(node);
  },
  //新增爸爸
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
    //有疑问，删除了为什么还要return
    //删除了这个节点，可能已经把这个节点用了，这个月外面删的人，还可以保留这个节点的引用
  },
  //删除节点的所有儿子，让它不能出现在这个树中
  empty(node) {
    // node.innerHTML = "";

    // const childNodes = node.childNodes;
    // const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  //修改title
  attr(node, name, value) {
    //重载：根据参数不同的个数写不同的代码
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      //适配
      if ("innerText" in node) {
        node.innerText = string; //ie
      } else {
        node.textContent = string; //firefox   /   Chrome
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    //即可以读又可以写
    //重载
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //   style(node, object) {
  //     for (key in object) {
  //       //key:border / color
  //       //node.style.border....
  //       //node.style.color....
  //       //key是变量，所以要作为key的话
  //       //   所以需要把变量放在中括号里，不能直接.key  .key会变成字符串
  //       node.style[key] = object[key];
  //     }
  //   },
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
