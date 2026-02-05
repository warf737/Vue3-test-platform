<template>
  <div class="about-view">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>О проекте</h2>
        </div>
      </template>

      <div class="about-content">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="Название проекта">
            Vue 3 Test Project
          </el-descriptions-item>
          <el-descriptions-item label="Версия">
            1.0.0
          </el-descriptions-item>
          <el-descriptions-item label="Описание">
            <p>
              Это тестовый проект, созданный для демонстрации возможностей Vue 3
              в сочетании с современными инструментами разработки. Проект включает
              в себя примеры решений различных задач и набор заданий для практики.
            </p>
          </el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <div class="tech-stack">
          <h3>Технологический стек</h3>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8">
              <el-card shadow="never" class="tech-card">
                <h4>Frontend Framework</h4>
                <ul>
                  <li>Vue 3 (Composition API)</li>
                  <li>TypeScript</li>
                  <li>Vite</li>
                </ul>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <el-card shadow="never" class="tech-card">
                <h4>UI Library</h4>
                <ul>
                  <li>Element Plus</li>
                  <li>Vue Router</li>
                  <li>Pinia</li>
                </ul>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <el-card shadow="never" class="tech-card">
                <h4>Development Tools</h4>
                <ul>
                  <li>ESLint</li>
                  <li>Prettier</li>
                  <li>TypeScript</li>
                </ul>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <el-divider />

        <div class="features">
          <h3>Основные возможности</h3>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
              <ul class="features-list">
                <li>Горячее обновление (HMR)</li>
                <li>TypeScript поддержка</li>
                <li>Роутинг с Vue Router</li>
                <li>Управление состоянием с Pinia</li>
              </ul>
            </el-col>
            <el-col :xs="24" :sm="12">
              <ul class="features-list">
                <li>UI компоненты Element Plus</li>
                <li>Линтинг и форматирование кода</li>
                <li>Адаптивный дизайн</li>
                <li>Современная архитектура</li>
              </ul>
            </el-col>
          </el-row>
        </div>

        <el-divider />

        <div class="structure">
          <h3>Структура проекта</h3>
          <p>
            Проект организован по стандартной структуре Vue 3 приложения:
          </p>
          <ul class="structure-list">
            <li><strong>src/views</strong> - страницы приложения</li>
            <li><strong>src/components</strong> - переиспользуемые компоненты</li>
            <li><strong>src/stores</strong> - Pinia stores для управления состоянием</li>
            <li><strong>src/router</strong> - конфигурация маршрутизации</li>
            <li><strong>src/interfaces</strong> - TypeScript интерфейсы</li>
          </ul>
        </div>

        <el-divider />

        <div class="usage">
          <h3>Использование</h3>
          <el-steps :active="0" finish-status="success" direction="vertical">
            <el-step title="Установка зависимостей">
              <template #description>
                <code>npm install</code>
              </template>
            </el-step>
            <el-step title="Запуск dev сервера">
              <template #description>
                <code>npm run dev</code>
              </template>
            </el-step>
            <el-step title="Сборка для production">
              <template #description>
                <code>npm run build</code>
              </template>
            </el-step>
            <el-step title="Проверка типов">
              <template #description>
                <code>npm run type-check</code>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-view {
  max-width: 1000px;
  margin: 0 auto;
}

.card-header h2 {
  margin: 0;
  color: #303133;
}

.about-content {
  margin-top: 20px;
}

.about-content h3 {
  color: #303133;
  margin-top: 20px;
  margin-bottom: 15px;
}

.about-content p {
  color: #606266;
  line-height: 1.6;
  margin: 10px 0;
}

.tech-stack {
  margin-top: 30px;
}

.tech-card {
  height: 100%;
  background-color: #f5f7fa;
}

.tech-card h4 {
  color: #303133;
  margin-top: 0;
  margin-bottom: 15px;
}

.tech-card ul {
  margin: 0;
  padding-left: 20px;
}

.tech-card li {
  margin: 8px 0;
  color: #606266;
}

.features-list {
  margin: 10px 0;
  padding-left: 20px;
}

.features-list li {
  margin: 10px 0;
  color: #606266;
}

.structure-list {
  margin: 15px 0;
  padding-left: 20px;
}

.structure-list li {
  margin: 10px 0;
  color: #606266;
  line-height: 1.8;
}

.structure-list code {
  background-color: #f5f7fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.usage {
  margin-top: 30px;
}

.usage code {
  background-color: #f5f7fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #303133;
}
</style>
