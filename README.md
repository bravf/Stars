import mode:
```
//script link
<script src="small-validator.js"></script>

//commonjs
var SmallValidator = require('small-validator.js')

//amd
define(['small-validator.js'], function (){
})
```

sometimes, we have a user form like this:
```
<form class="js-test-form">
    <input type="text" class="js-user"/>
    <input type="password" class="js-password">
    <button class="js-submit-btn">提交</button>
</form>
```

we can valid the form with ```small-validator```:
```
var SmallValidator = require('small-validator.js')

//create a form control
var formControl = new SmallValidator.control()

//create user control
var userControl = SmallValidator.control('.js-user')

// add user rules
var notEmptyRule = SmallValidator.required('username is required')
var lengthRule = SmallValidator.rule(/^*{5,8}$/, 'username length should in 5..8')
var userExistsRule  = SmallValidator.rule('userExists.php', function (control, data){
    if (data.exist){
        return false
    }
    else {
        return true
    }
}, 'user already exist')
userControl.add(notEmptyRule, lengthRule, userExistsRule)

//create password control
var passControl = SmallValidator.control('.js-password')

//add password rules
var notEmptyRule = SmallValidator.required('password is required')
var lengthRule = SmallValidator.rule(function (control){
    var value = control.val()
    return /^\d{5,8}$/.test(value)
}, 'password length should in 5..8 and all chars should be number')
passControl.add(notEmptyRule, lengthRule)

//add controls to form
formControl.add(userControl, passControl)

//bind event
$('.js-submit-btn').on('click', function (){
    formControl.check().done(function (){
        //when valid ok
    })
    .fail(function (){
        //when valid fail
    })
})
```
actually, a more simple method:
```
var formControl
with (SmallValidator){
    formControl = control().add(
        //user
        control('.js-user').add(
            required('user is required'),
            length([5, 8], 'username length should in 5..8'),
            rule('userExists.php', function (control, data){
                if (data.exist){
                    return false
                }
                else {
                    return true
                }
            }, 'user already exist')
        ),
        //password
        control('.js-password').add(
            required('password is required'),
            rule(/^\d{5,8}$/, 'password length should in 5..8 and all chars should be number')
        )
    )
}
```

read soure code and enjoy it!
