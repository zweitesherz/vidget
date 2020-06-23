
    new Vue({
        el: '#firepool',
        data: {
            comment:'',
            picked:'',
            question:   document.querySelector('.question').innerText,

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

