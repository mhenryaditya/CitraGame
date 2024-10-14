<template>
    <div class="quiz_box mt-5 mb-5">
        <header>
            <div class="title">CitraGame</div>
            <div class="timer">
                <div class="time_left_txt">Time Left</div>
                <div class="timer_sec">15</div>
            </div>
            <div class="time_line" id="time_line"></div>
        </header>
        <section>
            <div class="que_text">
                <!-- Here I've inserted question from JavaScript -->
            </div>
            <div class="option_list">
                <!-- Here I've inserted options from JavaScript -->
            </div>
        </section>

        <!-- footer of Quiz Box -->
        <footer>
            <div class="total_que">
                <!-- Here I've inserted Question Count Number from JavaScript -->
            </div>
            <button class="next_btn" @click="nextQue((level == 1) ? questions1 : questions2)">Next Que</button>
        </footer>
    </div>
</template>
<script setup lang="ts">
import questions1 from '@/data/questions1';
import questions2 from '@/data/questions2';
import { inject, ref, watch, type Ref } from 'vue';

const level: Ref<number> = inject('level')!
const timeValue: Ref<number> = ref(15)
const widthValue: Ref<number> = inject('widthValue')!
const counter: Ref<number> = inject('counter')!
const que_count: Ref<number> = inject('que_count')!
const que_numb: Ref<number> = inject('que_numb')!
const counterLine: Ref<number> = inject('counterLine')!
const userScore: Ref<number> = inject('userScoreTemp')!
const isQuiz: Ref<boolean> = inject('isQuiz')!
const attempt: Ref<number> = inject('attempt')!
const attemptTemp: Ref<number> = inject('attemptTemp')!

watch(() => isQuiz.value, (val) => {
    if (val) {
        showQuetions(0, (level.value == 1) ? questions1 : questions2); //calling showQestions function
        queCounter(1, (level.value == 1) ? questions1 : questions2); //passing 1 parameter to queCounter
        startTimer(15, (level.value == 1) ? questions1 : questions2); //calling startTimer function
        startTimerLine(0); //calling startTimerLine function
    }
})

// getting questions and options from array
const showQuetions = (index: number, questions: any[]) => {
    const que_text = document.querySelector(".que_text")!;
    const option_list = document.querySelector(".option_list")!;

    //creating a new span and div tag for question and option and passing the value using array index
    // let image
    const que_tag = '<div class="d-flex flex-column gap-2"><span>' + questions[index].numb + ". " + questions[index].question + '</span><div class="align-self-center d-flex gap-2">' + questions[index].image1 + ' ' + questions[index].image2 + ' ' + (questions[index].image3 ?? '') + '</div></div>';
    const option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener('click', () => optionSelected(option[i], questions), { once: true })
    }
}

const queCounter = (index: number, questions: any[]) => {
    const bottom_ques_counter = document.querySelector("footer .total_que")!;
    //creating a new span tag and passing the question number and total question
    const totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

const startTimer = (time: number, questions: any[]) => {
    const timeCount = document.querySelector(".timer .timer_sec")!;
    const timeText = document.querySelector(".timer .time_left_txt")!;
    const option_list = document.querySelector(".option_list")!;
    const tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
    const next_btn = document.querySelector("footer .next_btn")!;

    counter.value = setInterval(() => timer, 1000);
    function timer() {
        timeCount.textContent = time + ''; //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            const addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter.value); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            const correcAns = questions[que_count.value].answer; //getting correct answer from array
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

const startTimerLine = (time: number) => {
    const time_line = document.getElementById("time_line")!;
    counterLine.value = setInterval(() => timer, 29);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 549) { //if time value is greater than 549
            clearInterval(counterLine.value); //clear counterLine
        }
    }
}

const nextQue = (questions: any[]) => {
    const timeText = document.querySelector(".timer .time_left_txt")!
    const next_btn = document.querySelector("footer .next_btn")!
    if (que_count.value < questions.length - 1) { //if question count is less than total question length
        que_count.value++; //increment the que_count value
        que_numb.value++; //increment the que_numb value
        showQuetions(que_count.value, questions); //calling showQestions function
        queCounter(que_numb.value, questions); //passing que_numb value to queCounter
        clearInterval(counter.value); //clear counter
        clearInterval(counterLine.value); //clear counterLine
        startTimer(timeValue.value, questions); //calling startTimer function
        startTimerLine(widthValue.value); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter.value); //clear counter
        clearInterval(counterLine.value); //clear counterLine
        showResult(); //calling showResult function
    }
}

//if user clicked on option
const optionSelected = (answer: any, questions: any[]) => {
    const option_list = document.querySelector(".option_list")!;
    const tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
    const crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
    const next_btn = document.querySelector("footer .next_btn")!

    clearInterval(counter.value); //clear counter
    clearInterval(counterLine.value); //clear counterLine
    const userAns = answer.textContent; //getting user selected option
    const correcAns = questions[que_count.value].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        userScore.value += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
    const info_box = document.querySelector(".info_box")!
    const quiz_box = document.querySelector(".quiz_box")!
    const result_box = document.querySelector(".result_box")!
    const next_btn = document.querySelector("footer .next_btn")!

    next_btn.classList.remove("show")
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    isQuiz.value = false
    attempt.value++
    attemptTemp.value++
    result_box.classList.add("activeResult"); //show result box


}

</script>