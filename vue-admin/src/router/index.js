import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/home";
import Login from "../views/login";

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
		path: '/',
		redirect: '/dashboard',
	},
  
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
    children: [
       // 面板
       {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/dashboard"),
      },
      // 个人信息
      {
        path: "/personal/information",
        name: "Information",
        component: () => import("../views/personal/information.vue"),
        meta: {
          Cname:'个人管理',
					cname: '个人信息'
				}
      },
      // 个人标签
      {
        path: "/personal/label",
        name: "Label",
        component: () => import("../views/personal/label.vue"),
        meta: {
          Cname:'个人管理',
					cname: '个人标签'
				}
      },
      // 个人经历
      {
        path: "/personal/experience",
        name: "Experience",
        component: () => import("../views/personal/experience.vue"),
        meta: {
          Cname:'个人管理',
					cname: '个人经历'
				}
      },
       
       // 公告发布
       {
        path: "/publish/notice",
        name: "Notice",
        component: () => import("../views/publish/notice.vue"),
        meta: {
          Cname:'公告管理',
					cname: '公告发布'
				}
        
      },
      // 博客介绍
      {
        path: "/introduce/blog",
        name: "Blog",
        component: () => import("../views/blog/aboutBlog.vue"),
        meta: {
          Cname:'博客管理',
					cname: '博客介绍'
				}
        
      },
       // 文章分类
       {
        path: "/article/type",
        name: "ArticleType",
        component: () => import("../views/article/articleType.vue"),
        meta: {
          Cname:'博文管理',
					cname: '文章分类',
         
				}
      },
      // 新建文章
      {
        path: "/article/create",
        name: "ArticleCreate",
        component: () => import("../views/article/articleCreate.vue"),
        meta: {
          Cname:'博文管理',
					cname: '新建文章'
				}
      },
      // 修改文章
      {
        path: "/article/edit/",
        name: "ArticleEdit",
        component: () => import("../views/article/articleEdit.vue"),
        meta: {
          Cname:'博文管理',
					cname: '修改文章'
				},
        props: true
      },
      // 文章列表
      {
        path: "/article/list",
        name: "ArticleList",
        component: () => import("../views/article/articleList.vue"),
        meta: {
          Cname:'博文管理',
					cname: '文章列表'
				}
        
      },

       // 新建项目
       {
        path: "/project/create",
        name: "ProjectCreate",
        component: () => import("../views/project/projectCreate.vue"),
        meta: {
          Cname:'项目管理',
					cname: '新建项目'
				}
      },
      // 修改项目
      {
        path: "/project/edit",
        name: "ProjectEdit",
        component: () => import("../views/project/projectEdit.vue"),
        meta: {
          Cname:'项目管理',
					cname: '修改项目'
				}
      },
      // 项目列表
      {
        path: "/project/list",
        name: "ProjectList",
        component: () => import("../views/project/projectList.vue"),
        meta: {
          Cname:'项目管理',
					cname: '项目列表'
				}
      },


      // 用户列表
      {
        path: "/user/list",
        name: "UserList",
        component: () => import("../views/user/userList.vue"),
        meta: {
          Cname:'用户管理',
					cname: '用户列表'
				}
      },
      // 用户留言
      {
        path: "/user/message",
        name: "UserMessage",
        component: () => import("../views/user/userMessage.vue"),
        meta: {
          Cname:'用户管理',
					cname: '用户留言'
				}
      },
      // 用户评论
      {
        path: "/user/comment",
        name: "UserComment",
        component: () => import("../views/user/userComment.vue"),
        meta: {
          Cname:'用户管理',
					cname: '用户评论'
				}
      },
      // 搜索历史
      {
        path: "/user/search",
        name: "SearchHistory",
        component: () => import("../views/user/searchHistory.vue"),
        meta: {
          Cname:'用户管理',
					cname: '搜索历史'
				}
      },

      // 友情链接
      {
        path: "/firend/link",
        name: "FriendLink",
        component: () => import("../views/link/friendLink.vue"),
      },

     
       // 密码修改
       {
        path: "/reset",
        name: "Reset",
        component: () => import("../views/system/reset.vue"),
      },
       // 管理员注册
       {
        path: "/register",
        name: "Register",
        component: () => import("../views/system/register.vue"),
      },


      // 用户统计
      {
        path: "/report/user",
        name: "UserReport",
        component: () => import("../views/report/user.vue"),
      },
       // 留言统计
       {
        path: "/report/message",
        name: "MessageReport",
        component: () => import("../views/report/message.vue"),
      },
      // 点赞统计
      {
        path: "/report/like",
        name: "LikeReport",
        component: () => import("../views/report/like.vue"),
      },
       // 评论统计
       {
        path: "/report/comment",
        name: "CommentReport",
        component: () => import("../views/report/comment.vue"),
      },
      // 浏览量统计
      {
        path: "/report/read",
        name: "ReadReport",
        component: () => import("../views/report/read.vue"),
      },


    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
