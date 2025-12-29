<template>
  <div class="container-fluid px-4 px-md-5">
    <div class="row">
      <div class="col-12">
        <h2 class="my-4">友情链接</h2>
        <p>以下是我们推荐的一些优秀网站：</p>
        
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-12 mb-4" v-for="friend in friends" :key="friend.name">
            <div class="card h-100 friend-card">
              <div class="card-body">
                <h5 class="card-title">{{ friend.name }}</h5>
                <p class="card-text">{{ friend.description }}</p>
                <a :href="friend.url" target="_blank" class="btn btn-outline-primary">访问网站</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Friends',
  data() {
    return {
      friends: [
        {
          name: 'Vue.js 官网',
          description: '渐进式 JavaScript 框架',
          url: 'https://vuejs.org/'
        },
        {
          name: 'Vite 官网',
          description: '下一代前端构建工具',
          url: 'https://vitejs.dev/'
        },
        {
          name: 'GitHub',
          description: '全球最大的代码托管平台',
          url: 'https://github.com/'
        },
        {
          name: 'MDN Web 文档',
          description: '网络开发文档',
          url: 'https://developer.mozilla.org/'
        },
        {
          name: 'Bootstrap',
          description: '最受欢迎的前端框架',
          url: 'https://getbootstrap.com/'
        },
        {
          name: 'Stack Overflow',
          description: '程序员问答社区',
          url: 'https://stackoverflow.com/'
        }
      ]
    }
  }
}
</script>

<style scoped>
.friend-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.friend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
</style>