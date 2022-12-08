export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка',
            success: 'Дякуємо за заявку!',
            failure: 'Щось пішло не так...',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    initMask() {
        //установка курсора
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[name="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }
    
    init() {
        this.checkMailInputs();
        this.initMask();

        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                 `;
                 statusMessage.textContent = this.message.loading;

                if (!form.nextElementSibling) {
                    form.parentNode.appendChild(statusMessage);
                }
                // statusMessage.classList.add('status');               


                const formData = new FormData(form);

                this.postData(this.path, formData)
                .then(res => {
                    console.log(res);
                    
                    if (!form.nextElementSibling.classList.contains('status')) {
                        statusMessage.textContent = this.message.success;
                    }
                    statusMessage.classList.add('status');
                })
                .catch(() => {
                    statusMessage.textContent = this.message.failure;
                })
                .finally(() => {   
                    this.clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 6000);
                });
            });
        });
    }
}
