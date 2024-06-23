<template>
  <div class="payment">
    <div class="email-input">
      <label for="email">電子信箱</label>
      <input type="email" v-model="email" @input="validateEmail" />
      <span v-if="error" class="error">{{ error }}</span>
    </div>
    <!-- 其他付款信息 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const error = ref('')

const validateEmail = () => {
  const emailPattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/
  if (!emailPattern.test(email.value)) {
    error.value = '請輸入有效的電子信箱地址'
  } else {
    error.value = ''
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>