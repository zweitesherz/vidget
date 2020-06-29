Vue.component('question', {
    props: ['text'],
    template: '<div class="firepool_body-quest" ><p class="question">{{ text }}</p></div>'
});

Vue.component('response', {
    props: ['value','id','checked'],
    template:
        `<div class="form_radio">
 <input 

 @input="$emit('select')" 
 :checked="checked" 
 :id="id" 
 type="radio"
 name="radio" 
 :value="value"
 onchange="document.getElementById(\'submit\').disabled = !this.checked;">
 
   <label :for="id">{{ value }}</label>
   
   </div>`
});



Vue.component('response-comment', {
    props: ['value','id','checked','comment'],
    data () {
        return {
            commentId: '',
            commentMore:''
        }
    },

    methods: {
        login () {
            this.$emit('login', {
                commentId: this.id,
                commentMore:this.comment
            })
        }
    },

    template:
        `<div class="form_radio"> 
<input  
 @change='login'
 v-model='commentId'
 :id="id" type="radio" 
 @input="$emit('select')" 
 :checked="checked" 
 name="radio" 
 :value="value" 
 onchange="document.getElementById(\'submit\').disabled = !this.checked;">

<label :for="id">{{ value }}</label> 


<label 
 v-if="checked"
 :for="id"  
 class="comment" >
<p>Введите комментарий</p> 
<textarea 
@change='login'
class="form-control"
:value="comment"
@input="$emit('update:comment', $event.target.value)">

</textarea>
</label>

</div>`

});


new Vue({
    el: '#firepool',
    data: {
       idOfComment: '',
        comment: '',
        active: null,
        info: [],
    },

    mounted: function () {
        axios
        .get('api.json')
        .then (response => {
            this.info = response.data;
            console.log()

        })
    },

    methods: {

        onLogin (data) {
            console.log('child component said id ', data);
            this.idOfComment = data.commentId;
            this.comment = document.querySelector('.form-control').value;
        },

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
            console.log("Комментарий:" + this.comment + " ID ответа:" + this.idOfComment);
            document.getElementById('firepool').classList.add('firepool-down-final');
            document.getElementById('firepool').classList.remove('firepool-down');
        },

        onSubmit: function () {
            axios.post('https://reqres.in/api/register', {
                commentId: this.comment


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

