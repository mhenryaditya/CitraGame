<template>
    <!-- Info Box -->
    <div class="info_box" id="info_box">
        <div class="info-title"><span>Some Rules of this Quiz</span></div>
        <div class="info-list">
            <div class="info">1. You will have only <span>15 seconds</span> per each question.</div>
            <div class="info">2. Once you select your answer, it can't be undone.</div>
            <div class="info">3. You can't select any option once time goes off.</div>
            <div class="info">4. You can't exit from the Quiz while you're playing.</div>
            <div class="info">5. You'll get points on the basis of your correct answers.</div>
        </div>
        <div class="buttons">
            <button class="quit" @click="exit()">Exit Quiz</button>
            <button class="restart" @click="continueBtn()">Continue</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';

const isQuiz: Ref<boolean> = inject('isQuiz')!
// const exit_btn = info_box.querySelector(".buttons .quit");
// const continue_btn = info_box.querySelector(".buttons .restart");
// if startQuiz button clicked

// if exitQuiz button clicked
const exit = () => {
    const info_box = document.querySelector(".info_box")!;
    info_box?.classList.remove("activeInfo"); //hide info box
    const start_content = document.getElementById('start-content')!
    start_content.style.visibility = 'visible'
}

// if continueQuiz button clicked
const continueBtn = () => {
    isQuiz.value = true
    const info_box = document.querySelector(".info_box")!;
    const quiz_box = document.querySelector(".quiz_box")!;
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
}
</script>