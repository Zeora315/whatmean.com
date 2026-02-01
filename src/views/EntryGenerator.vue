<template>
  <div class="entry-generator-page">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="entry-form-card p-4 mb-4">
            <h1 class="display-4 text-primary text-center mb-4">词条生成器</h1>
            <p class="text-center mb-4 text-secondary">填写以下信息，生成符合格式的词条JSON文件</p>
            
            <form @submit.prevent="generateEntry">
              <!-- 词条名 -->
              <div class="mb-3">
                <label for="entryName" class="form-label fw-bold text-dark">词条名 *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="entryName"
                  v-model="entryData.词条名"
                  placeholder="例如：遥遥领先、躺平、内卷"
                  required
                >
              </div>
              
              <!-- 词条介绍 -->
              <div class="mb-3">
                <label for="entryIntro" class="form-label fw-bold text-dark">词条介绍 *</label>
                <textarea 
                  class="form-control" 
                  id="entryIntro"
                  rows="2"
                  v-model="entryData.词条介绍"
                  placeholder="简短描述词条的含义或背景"
                  required
                ></textarea>
              </div>
              
              <!-- 详细介绍 -->
              <div class="mb-3">
                <label for="entryDetail" class="form-label fw-bold text-dark">详细介绍 *</label>
                <textarea 
                  class="form-control" 
                  id="entryDetail"
                  rows="6"
                  v-model="entryData.详细介绍"
                  placeholder="详细解释词条的来源、用法、文化背景等信息"
                  required
                ></textarea>
              </div>
              
              <!-- 词条年份 -->
              <div class="mb-3">
                <label for="entryYear" class="form-label fw-bold text-dark">词条年份 *</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="entryYear"
                  v-model.number="entryData.词条年份"
                  placeholder="例如：2025"
                  min="2000"
                  max="2030"
                  required
                >
              </div>
              
              <!-- 标签 -->
              <div class="mb-3">
                <label for="entryTags" class="form-label fw-bold text-dark">标签 *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="entryTags"
                  v-model="entryData.标签"
                  placeholder="用逗号分隔，例如：网络用语,流行文化,反讽"
                  required
                >
              </div>
              
              <!-- 提交时间（自动生成） -->
              <div class="mb-3">
                <label class="form-label fw-bold text-dark">提交时间</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :value="currentDateTime"
                  readonly
                >
                <small class="form-text text-muted">提交时间将自动设置为当前时间</small>
              </div>
              
              <!-- 操作按钮 -->
              <div class="d-flex justify-content-between mt-4">
                <button type="button" class="btn btn-secondary" @click="resetForm">
                  重置表单
                </button>
                <button type="submit" class="btn btn-primary">
                  生成词条JSON
                </button>
              </div>
            </form>
          </div>
          
          <!-- 预览区域 -->
          <div v-if="generatedJson" class="json-preview-card p-4 mt-4">
            <h3 class="text-primary mb-3">生成的JSON预览</h3>
            <pre class="json-preview bg-white text-dark p-3 rounded border"><code>{{ generatedJson }}</code></pre>
            <div class="mt-3 d-flex justify-content-between align-items-center">
              <button class="btn btn-success" @click="copyToClipboard">
                复制到剪贴板
              </button>
              <a href="https://github.com/Nico6719/whatmean.com" target="_blank" class="btn btn-outline-primary">
                前去提交
              </a>
              <small class="text-muted" v-if="copied">已复制！</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntryGenerator',
  data() {
    return {
      entryData: {
        词条名: '',
        词条介绍: '',
        详细介绍: '',
        词条年份: new Date().getFullYear(),
        标签: ''
      },
      generatedJson: '',
      copied: false
    }
  },
  computed: {
    currentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  },
  methods: {
    generateEntry() {
      // 创建完整的词条对象
      const completeEntry = {
        ...this.entryData,
        "提交时间": this.currentDateTime
      };
      
      // 生成格式化的JSON
      this.generatedJson = JSON.stringify(completeEntry, null, 2);
      this.copied = false;
    },
    resetForm() {
      this.entryData = {
        词条名: '',
        词条介绍: '',
        详细介绍: '',
        词条年份: new Date().getFullYear(),
        标签: ''
      };
      this.generatedJson = '';
      this.copied = false;
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.generatedJson);
        this.copied = true;
        // 3秒后清除提示
        setTimeout(() => {
          this.copied = false;
        }, 3000);
      } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
      }
    }
  }
}
</script>

<style scoped>
.entry-generator-page {
  min-height: 100vh;
}

.entry-form-card {
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.json-preview-card {
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.json-preview {
  border: 1px solid #ced4da;
  background-color: white;
  color: #495057;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.4;
}

.form-label {
  color: #495057;
  font-weight: 600;
}

.text-primary {
  color: #0d6efd !important;
}

.text-secondary {
  color: #6c757d !important;
}

.text-dark {
  color: #212529 !important;
}

.text-muted {
  color: #6c757d !important;
}

.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
</style>