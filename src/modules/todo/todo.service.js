import { todomodel } from '../../models/todo.model.js';

export function createtodo(tododata){
    
    const newtodo = new todomodel(tododata);
    return newtodo.save();
}

export function updatetodoById(id,tododata){
    return todomodel.findByIdAndUpdate(id, tododata);
}

export function deletetodoById(id){
    return todomodel.findByIdAndDelete(id);
}  

export function findtodoById(id){
    return todomodel.findById(id);
}

export function findManytodo(query){
    let basequery = {};
    if (query.search) {
        basequery = {...basequery, title: {
            $regex: new RegExp(query.search, 'i')
        }}
    }
    if (query.status) {
        basequery = {...basequery, status: query.status}
    }
    if (query.assignee) {
        basequery = {...basequery ,assignee: query.assignee}
    }
    if (query.subscribercounter && query.condition === 'or') {
        basequery = { $or: [...basequery, {subscribercounter: query.subscribercounter}]
    }}
    if (query.subscribercounter && query.condition && query.condition !== 'or') {
        basequery = { $or: [...basequery, {subscribercounter: query.subscribercounter}]
    }}
    return todomodel.find(basequery);
    }  

