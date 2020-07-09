// 线上工会

export default [{
  // 医疗通道 - 订单列表
  path: '/medicalOrder',
  component: resolve => require(['@/components/online-labor-union/medical/order/order-index'], resolve)
}, {
  // 医疗通道 - 订单详情
  path: '/medical/detail',
  component: resolve => require(['@/components/online-labor-union/medical/order/order-detail'], resolve)
}, {
  // 医疗通道 - 病种库
  path: '/medicalDisease',
  component: resolve => require(['@/components/online-labor-union/medical/disease-library/disease-library'], resolve)
}, {
  // 医疗通道 - 免责申明
  path: '/medicalDisclaimer',
  component: resolve => require(['@/components/online-labor-union/medical/medical-disclaimer'], resolve)
}, {
  // 医疗通道 - 就诊卡需知
  path: '/medicalKnow',
  component: resolve => require(['@/components/online-labor-union/medical/medical-card-needknow'], resolve)
}, {
  // 医疗通道 - 服务介绍
  path: '/medicalIntroduction',
  component: resolve => require(['@/components/online-labor-union/medical/service-introduce'], resolve)
}, {
  // 医疗通道 - 协调入院需知
  path: '/medicalNotice',
  component: resolve => require(['@/components/online-labor-union/medical/hospitalized-needknow'], resolve)
}, {
  // 技能大赛 - 赛事管理
  path: '/skillMatch',
  component: resolve => require(['@/components/online-labor-union/skill/match-manage/match-manage-index/match-manage-index'], resolve)
}, {
  // 技能大赛 - 大赛详情 & 成绩列表
  path: '/skill/match-detail',
  component: resolve => require(['@/components/online-labor-union/skill/match-manage/match-manage-detail/match-manage-detail'], resolve)
}, {
  // 技能大赛 - 个人报名
  path: '/skill/match-repost',
  component: resolve => require(['@/components/online-labor-union/skill/match-manage/match-manage-repost/report-lndex'], resolve)
}, {
  // 技能大赛 - 个人详情
  path: '/skill/personal-detail',
  component: resolve => require(['@/components/online-labor-union/skill/match-manage/match-manage-repost/personal-detail'], resolve)
}, {
  // 技能大赛 - 工会与工种
  path: '/skillUnionType',
  component: resolve => require(['@/components/online-labor-union/skill/union-type-work/union-type-work-list'], resolve)
}, {
  // 技能大赛 - 赛事信息
  path: '/skillAdvisory',
  component: resolve => require(['@/components/online-labor-union/skill/match-info/match-info-list'], resolve)
}, {
  // 技能大赛 - 工种设置
  path: '/skillType',
  component: resolve => require(['@/components/online-labor-union/skill/work-type-settings/work-type-settings-list'], resolve)
}, {
  // 通用 - 新闻动态
  path: '/activetyNews',
  component: resolve => require(['@/components/online-labor-union/general-news/news-index'], resolve)
}, {
  // 通用 - 通用活动
  path: '/laborActivityManage',
  component: resolve => require(['@/components/online-labor-union/general-activity/activity-index'], resolve)
}, {
  // 通用 - 通用活动新增
  path: '/laborActivityManage/newActivity',
  component: resolve => require(['@/components/online-labor-union/general-activity/new-activity'], resolve)
}, {
  // 通用 - 通用报名
  path: '/laborActivityManage/laborSignUp',
  component: resolve => require(['@/components/online-labor-union/general-apply/apply-index'], resolve)
}, {
  // 通用 - 通用报名信息
  path: '/laborActivityManage/laborSignUpInfo',
  component: resolve => require(['@/components/online-labor-union/general-apply/apply-info'], resolve)
}, {
  // 通用 - 通用报名模板库
  name: 'applyTemplate',
  path: '/laborActivityManage/template',
  component: resolve => require(['@/components/online-labor-union/general-apply/apply-template-lib/apply-template-lib-index'], resolve)
}, {
  // 通用 - 通用投票
  path: '/activityVote',
  component: resolve => require(['@/components/online-labor-union/general-vote/vote-index'], resolve)
}, {
  // 通用 - 投票项目配置
  path: '/voteOption',
  component: resolve => require(['@/components/online-labor-union/general-vote/vote-option'], resolve)
}, {
  // 通用 - 通用问卷
  path: '/generalQuestionnaire',
  component: resolve => require(['@/components/online-labor-union/general-questionnaire/questionnaire-list'], resolve)
}, {
  // 通用 - 问卷数据记录
  path: '/questionnaireRecord',
  component: resolve => require(['@/components/online-labor-union/general-questionnaire/questionnaire-record'], resolve)
}, {
  // 通用 - 问卷数据统计
  path: '/questionnaireStatistics',
  component: resolve => require(['@/components/online-labor-union/general-questionnaire/questionnaire-statistics'], resolve)
}, {
  // 通用 - 问卷模板库
  path: '/questionnairelib',
  component: resolve => require(['@/components/online-labor-union/general-questionnaire/questionnaire-template-lib/questionnaire-template-lib-index'], resolve)
}]
