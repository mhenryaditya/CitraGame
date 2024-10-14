<!-- eslint-disable prefer-const -->
<script setup lang="ts">
import { inject, onMounted, provide, ref, watch, type Ref } from 'vue';
import InfoBox from './InfoBox.vue';
import Quiz from './Quiz.vue';
import Result from './Result.vue';

//selecting all required elements
let data: string = inject('storage')!
let name: Ref<string> = ref('')
let level: Ref<number> = ref(0)
let saveClicked: Ref<boolean> = ref(false)
const userScore: Ref<number> = ref(0)
const userScoreTemp: Ref<number> = ref(0)
const que_count: Ref<number> = ref(0)
const que_numb: Ref<number> = ref(1)
const counter: Ref<number> = ref(0)
const counterLine: Ref<number> = ref(0)
const widthValue: Ref<number> = ref(0)
const isQuiz: Ref<boolean> = ref(false)
const attempt: Ref<number> = ref(0)
const attemptTemp: Ref<number> = ref(0)

onMounted(() => {
  saveData()
})

watch(() => data, () => {
  saveData()
})

let save = (variable: number = 0) => {
  if (variable === 0) {
    localStorage.setItem('player', JSON.stringify({
      name: name.value,
      level: level.value,
      score: userScore.value,
      attempt: attempt.value
    }))
    saveClicked.value = true
  } else {
    saveClicked.value = false
  }
}

let saveData = () => {
  if (data !== '') {
    let dataParse = JSON.parse(data as string)
    name.value = dataParse.name
    level.value = dataParse.level
    userScore.value = dataParse.score
    attempt.value = dataParse.attempt
    saveClicked.value = true
  } else {
    saveClicked.value = false
  }
}

let start = () => {
  let info_box1 = document.querySelector('.info_box')!
  let start_content = document.getElementById('start-content')!
  start_content.style.visibility = 'hidden'
  info_box1.classList.add("activeInfo");
}

provide('level', level)
provide('que_count', que_count)
provide('userScore', userScore)
provide('userScoreTemp', userScoreTemp)
provide('que_numb', que_numb)
provide('counter', counter)
provide('counterLine', counterLine)
provide('widthValue', widthValue)
provide('isQuiz', isQuiz)
provide('attempt', attempt)
provide('attemptTemp', attemptTemp)

watch(() => isQuiz.value, (val) => {
  if (!val && attemptTemp.value > 0) {
    localStorage.setItem('player', JSON.stringify({
      name: name.value,
      level: level.value,
      score: (userScore.value + userScoreTemp.value),
      attempt: attempt.value
    }))
  }
})

</script>

<template>
  <!-- start Quiz button -->
  <div class="w-75 p-4 pb-2 bg-body text-bg-body align-self-center d-flex flex-column gap-3 rounded-3 shadow"
    id="start-content">
    <p class="fs-1 m-0 align-self-center"><i class="bi bi-controller"></i> CitraGame</p>
    <form>
      <div class="alert alert-info mb-3" role="alert"><i class="bi bi-info-circle-fill"></i> <strong>Note!</strong>
        You can play this game after you fill out these sections.</div>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Input your name" v-model="name"
          :disabled="saveClicked">
      </div>
      <div class="mb-3">
        <label for="level" class="form-label">Level</label>
        <select class="form-select mb-3" id="level" aria-label="select option" v-model="level" :disabled="saveClicked">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      </div>
      <div v-if="saveClicked" class="mb-3 d-flex gap-3">
        <div class="">
          <label for="bestScore" class="form-label">Best Score</label>
          <input type="text" class="form-control" id="bestScore" v-model="userScore" disabled>
        </div>
        <div class="">
          <label for="attemp" class="form-label">Attempt</label>
          <input type="text" class="form-control" id="attemp" v-model="attempt" disabled>
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-center gap-3">
      <button v-if="!saveClicked" class="btn btn-outline-info flex-grow-1" @click="save()"
        :disabled="name === '' || level == 0"><i class="bi bi-people-fill"></i> Simpan</button>
      <button v-else class="btn btn-outline-info flex-grow-1" @click="save(1)"><i class="bi bi-people-fill"></i>
        Edit</button>
      <div v-if="saveClicked" class="start_btn flex-grow-1 d-flex" @click="start()"><button
          class="btn btn-outline-success flex-grow-1"><i class="bi bi-pencil-square"></i> Start Quiz</button></div>
    </div>
    <div class="border-top bg-tertiary p-3 text-bg-tertiary text-center fw-lighter" style="font-size: 9pt;">&copy;
      2024 - Muhammad Henry Aditya & Maulana Ansari - Supported by Ali Aslan</div>
  </div>

  <!-- Info Box -->
  <InfoBox></InfoBox>

  <!-- Quiz Box -->
  <Quiz></Quiz>

  <!-- Result Box -->
  <Result></Result>

</template>