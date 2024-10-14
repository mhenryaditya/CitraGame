<template>
    <div class="result_box">
        <div class="icon">
            <i class="fas fa-crown"></i>
        </div>
        <div class="complete_text">You've completed the Quiz!</div>
        <div class="score_text">
            <!-- Here I've inserted Score Result from JavaScript -->
        </div>
        <div class="buttons">
            <button class="quit" @click="quit()">Quit Quiz</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, watch, type Ref } from 'vue';
import questions from '@/data/questions1';

const attemptTemp: Ref<number> = inject('attemptTemp')!
const userScoreTemp: Ref<number> = inject('userScoreTemp')!

watch(() => attemptTemp.value, (val) => {
    if (val > 0) {
        const result_box = document.querySelector(".result_box")!;
        result_box.classList.add("activeResult"); //show result box
        const scoreText = result_box.querySelector(".score_text")!;
        if (userScoreTemp.value > 3) { // if user scored more than 3
            //creating a new span tag and passing the user score number and total question number
            const scoreTag = '<span>and congrats! 🎉, You got <p>' + userScoreTemp.value + '</p> out of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        }
        else if (userScoreTemp.value > 1) { // if user scored more than 1
            const scoreTag = '<span>and nice 😎, You got <p>' + userScoreTemp.value + '</p> out of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        else { // if user scored less than 1
            const scoreTag = '<span>and sorry 😐, You got only <p>' + userScoreTemp.value + '</p> out of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
    }
})

// if quitQuiz button clicked
const quit = () => {
    window.location.reload()
}

</script>