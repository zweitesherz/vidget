Vue.component('question', {
    props: ['text'],
    template: '<div class="firepool_body-quest"><p class="question">{{ text }}</p></div>'
});

Vue.component('response', {
    props: ['value','id','type'],
    template: '<div class="form_radio"> <input  :id="id" :type="type" name="radio" :value="value" onchange="document.getElementById(\'submit\').disabled = !this.checked;"><label :for="id">{{ value }}</label></div>'
});



Vue.component('response-comment', {
    props: ['value','id','type'],
    data() {
        return {
            picked : '',
            showComment: false
        }
    },
    watch: {
        picked (){
            this.showComment = (this.picked);
        }
    },
    template: `<div class="form_radio"> 
<input v-model="picked" :id="id" :type="type" name="radio" :value="value"  onchange="document.getElementById(\'submit\').disabled = !this.checked;">
<label :for="id">{{ value }}</label> 

<label :for="id"  class="comment" v-if="showComment">
<p>Введите комментарий</p> 
<textarea class="form-control"></textarea>
</label>
</div>`

});

new Vue({
    el: '#firepool',
    data: {
        comment:'',
        //question:   document.querySelector('.question').innerText,
        respQuestion:'Мне нравится этот сайт',
        id:'radio-1',
        typeRadio:'radio',
        questionText:'Как тебе наш сайт?',
        picked : '',




    },


    methods: {
        changeClass() {
            if(document.getElementById('firepool').classList.contains('firepool-down') === true) {
                document.getElementById('firepool').classList.remove('firepool-down');
                document.getElementById('firepool-icon').src = "svg/krest.svg"
            }
            else {
                document.getElementById('firepool').classList.add('firepool-down');
                document.getElementById('firepool-icon').src = "svg/razvernut.svg"
            }
        },
        btnDown () {


            document.getElementById('firepool').classList.add('firepool-down-final');
            document.getElementById('firepool').classList.remove('firepool-down');
        },


        // commentInput:function(){
        //     if (document.getElementById('radio-1').checked === "checked") {
        //      return   commentInput1 = true
        //     }
        // },

        onSubmit: function () {
            axios.post('https://reqres.in/api/register', {
                question: this.question,
                resp: this.picked

            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
});

