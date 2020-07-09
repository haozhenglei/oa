import withAxios from "./withAxios";

export default{

    // 项目管理查询
    projectFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'projectManagement/list', params, success_callback, fail_callback);
    },
    // 项目管理新增
    projectAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'projectManagement/addUpdate', params, success_callback, fail_callback);
    },
    // 项目管理详情
    projectDetail(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'projectManagement/'+params, '', success_callback, fail_callback);
    },
    // 项目管理删除
    projectDel(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'projectManagement/delete/'+params, '', success_callback, fail_callback);
    },
    // 任务管理查询
    projectTaskFind(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'projectTask/list', params, success_callback, fail_callback);
    },
    // 任务管理新增
    projectTaskAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'projectTask/addUpdate', params, success_callback, fail_callback);
    },
    // 任务管理详情
    projectTaskDetail(params, success_callback, fail_callback) {
        withAxios.requestData('GET', 'base', 'projectTask/'+params, '', success_callback, fail_callback);
    },
    // 任务管理删除
    projectTaskDel(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'projectTask/delete/'+params, '', success_callback, fail_callback);
    },
    // 节点(开始、添加、完成)
    taskNodeAdd(params, success_callback, fail_callback) {
        withAxios.requestData('POST', 'base', 'taskNode/add', params, success_callback, fail_callback);
    },
}