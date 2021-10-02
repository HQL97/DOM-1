window.dom={
    create(string){
        const container= document.createElement('template');/*template可以容纳任意标签*/
        container.innerHTML=string.trim();/*去掉字符串的头尾字符*/
      return container.content.firstChild;
    },
    after(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling);
    },
    before(node,node2){
        node.parentNode.insertBefore(node2,node);
    },
    append(parent,child){
        child.parentNode=parent;
    },
    wrap(node,parent){/*新增父结点*/
        dom.before(node,parent);
        dom.append(parent,node);
    },
    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node){
        const {childNodes} = node;/*等价const childNodes=node.childNodes*/
        const array=[];
        let x=node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild));
            x=node.firstChild;
        }
        return array;
    },
    attr(node,name,value){/*重载*/
        if(arguments.length===3){
            node.setAttribute(name,value);
        }
        else if(arguments.length===2){
            return node.getAttribute(name);
        }
    },
   text(node,value){
        if(arguments.length===2){if('innerText' in node){
            node.innerText=value;
        }else{
            node.textcontent=value;
        }
    }else if(arguments.length===1){
        if(arguments.length===2){if('innerText' in node){
            return node.innerText;
        }else{
            return node.textcontent;
        }
    } 
    }},
    html(node,value){
        if(arguments.length===2){
            node.innerHTML=value;
        }else if(arguments.length===1){
            return node.innerHTML;
        }
    },
   style(node,item,value){
        if(arguments.length===2){
            if(item instanceof Object){/*判断对象不适用typeof*/
                for(let key in item){
                    node.style[key] = item[key];
                }
            }else if(typeof item==='string'){
                return node.style[item];
            }
        }else if(arguments.length===3){
            node.style[item]=value;
        }
    },
    class:{
        add(node,value){
            if(value){
                node.classList.add(value);
            }
            
        },
        remove(node,value){
            node.classList.remove(value);
        },
        has(node,value){
            return node.classList.contains(value);
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn);
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn);
    },
    find(selector,scope){/*scope范围*/
        return (scope||document).querySelectorAll(selector);//如果有scope范围限制，就在范围中找，否则全局查找
    },
    parent(node){
        return node.parentNode;
    },
    children(node){
        return node.children;
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node);

    },
    next(node){
        let x=node.nextSibling;
        while(x && x.nodeType===3){//如果是文本，跳过
            x = x.nextSibling;
        }
        return x;
    },
    previous(node){
        let x=node.previousSibling;
        while(x && x.nodeType===3){
            x = x.previousSibling;
        }
        return x;
    },
    each(node,fn){
        for(let i=0;i<node.length;++i){
            fn.call(null,node[i]);
        }
    },
    index(node){
        const list=dom.children(node.parentNode);
        for(let i=0;i<list.length;++i){
            if(list[i]===node){
                return i;
            }
        }
        return null;
    }
}


