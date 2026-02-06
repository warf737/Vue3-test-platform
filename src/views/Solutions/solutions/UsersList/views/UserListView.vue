<template>
  <div class="home-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>Учетные записи</h3>
          <el-button :icon="Plus" @click="handleAddAccount" />
        </div>
      </template>
      <div class="content">
        <div class="form-header">
          <div class="header-cell">Метка</div>
          <div class="header-cell">Тип записи</div>
          <div class="header-cell">Логин</div>
          <div class="header-cell">Пароль</div>
          <div class="header-cell" />
        </div>

        <el-form
          v-for="account in currentAccounts"
          :key="account.id"
          :ref="(el: FormInstance | null) => setFormRef(account.id!, el)"
          :model="getAccountForm(account.id!)"
          :rules="getFormRules(account.id!)"
          inline
          class="account-form"
        >
          <el-form-item
            v-for="field in accountFields"
            :key="field.key"
            :prop="field.key"
            class="form-cell"
          >
            <el-input
              v-if="field.view_as === 'input'"
              v-model="getAccountForm(account.id!)[field.key]"
              size="small"
              :placeholder="field.label"
              :maxlength="field.maxLength"
              @blur="() => saveAccountToStore(account.id!)"
            />

            <el-input
              v-if="
                field.view_as === 'input-password' && getAccountForm(account.id!).type !== 'ldap'
              "
              v-model="getAccountForm(account.id!)[field.key]"
              type="password"
              size="small"
              :placeholder="field.label"
              :maxlength="field.maxLength"
              show-password
              @blur="() => saveAccountToStore(account.id!)"
            />

            <el-select
              v-if="field.view_as === 'select'"
              v-model="getAccountForm(account.id!)[field.key]"
              size="small"
              :placeholder="field.label"
              @change="(value: string) => handleTypeChange(account.id!, value)"
            >
              <el-option
                v-for="option in field.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item class="form-cell actions-cell">
            <el-button
              :icon="Delete"
              link
              type="danger"
              @click="handleRemoveAccount(account.id!)"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Plus, Delete } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { accountFields } from '../constants.ts'
import { useAccountsManagement } from '../composables/useAccountsManagement'

const {
  currentAccounts,
  accountForms,
  handleAddAccount,
  handleRemoveAccount,
  handleTypeChange,
  saveAccountToStore,
} = useAccountsManagement()

const { getAccountForm, getFormRules, setFormRef } = accountForms
</script>

<style scoped>
.home-view {
  width: 100%;
}

.header {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.content {
  padding: 20px;
}

.form-header {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  background-color: #f5f7fa;
  border-bottom: 2px solid #e4e7ed;
  font-weight: 600;
  color: #606266;
  font-size: 14px;
}

.header-cell {
  text-align: left;
}

.account-form {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid #e4e7ed;
  align-items: flex-start;
}

.account-form:hover {
  background-color: #fafafa;
}

.form-cell {
  margin-bottom: 0;
  width: 100%;
}

.actions-cell {
  display: flex;
  justify-content: center;
}

:deep(.el-form-item__error) {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.2;
}
</style>
